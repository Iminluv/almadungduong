/**
 * Dual-Provider SMS Service for Alma Dungduong
 * - Default: Bird (MessageBird) using free tier
 * - Automatic Fallback: eSMS.vn when Bird runs out of free quota or encounters error
 */

export interface SmsSendResult {
  success: boolean;
  provider: 'bird' | 'esms' | 'mock';
  messageId?: string;
  error?: string;
  fallbackUsed?: boolean;
}

export interface SmsProvider {
  name: 'bird' | 'esms' | 'mock';
  sendOtp(
    phone: string,
    otp: string
  ): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
    isQuotaExceeded?: boolean;
  }>;
}

/**
 * Normalizes a Vietnamese phone number to E.164 format (+84...)
 * Accepts formats:
 * - 0912345678
 * - +84912345678
 * - 84912345678
 * - (091) 234-5678
 */
export function normalizeVietnamPhone(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;

  // Remove whitespace, dashes, periods, parentheses
  let cleaned = raw.replace(/[\s\-\.\(\)]/g, '').trim();

  if (cleaned.startsWith('+84')) {
    cleaned = cleaned.substring(1); // 84xxxxxxxxx
  } else if (cleaned.startsWith('0')) {
    cleaned = '84' + cleaned.substring(1); // 84xxxxxxxxx
  }

  // Vietnamese phone numbers: 84 + 9 digits starting with 3, 5, 7, 8, or 9
  const vnPhoneRegex = /^84(3|5|7|8|9)[0-9]{8}$/;
  if (!vnPhoneRegex.test(cleaned)) {
    return null;
  }

  return `+${cleaned}`;
}

/**
 * Validates whether a phone number is a valid Vietnam mobile phone number
 */
export function isValidVietnamPhone(phone: string): boolean {
  return normalizeVietnamPhone(phone) !== null;
}

/**
 * Converts E.164 (+84912345678) to Vietnamese national format (0912345678)
 */
export function toNationalPhone(e164: string): string {
  if (e164.startsWith('+84')) {
    return '0' + e164.substring(3);
  }
  if (e164.startsWith('84')) {
    return '0' + e164.substring(2);
  }
  return e164;
}

/**
 * Provider 1: Bird (MessageBird) Implementation
 */
export class BirdSmsProvider implements SmsProvider {
  name = 'bird' as const;

  async sendOtp(phone: string, otp: string) {
    const apiKey = process.env.BIRD_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'BIRD_API_KEY is not configured',
        isQuotaExceeded: true,
      };
    }

    const originator = (process.env.BIRD_ORIGINATOR || 'Alma').slice(0, 11);
    const msisdn = phone.replace('+', ''); // MessageBird accepts MSISDN 84912345678
    const body = `[Alma Dungduong] Ma OTP cua ban la: ${otp}. Ma co hieu luc trong 10 phut.`;

    try {
      const response = await fetch('https://rest.messagebird.com/messages', {
        method: 'POST',
        headers: {
          Authorization: `AccessKey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originator,
          recipients: [msisdn],
          body,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Detect quota/balance errors: 402 Payment Required, 429 Too Many Requests, or specific MessageBird error codes
        const isQuotaExceeded =
          response.status === 402 ||
          response.status === 429 ||
          JSON.stringify(data).toLowerCase().includes('balance') ||
          JSON.stringify(data).toLowerCase().includes('credit') ||
          JSON.stringify(data).toLowerCase().includes('limit');

        const errorMsg =
          data?.errors?.[0]?.description ||
          `Bird API error: HTTP ${response.status} ${response.statusText}`;

        return {
          success: false,
          error: errorMsg,
          isQuotaExceeded,
        };
      }

      return {
        success: true,
        messageId: data.id || 'bird-' + Date.now(),
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error connecting to Bird API',
        isQuotaExceeded: false,
      };
    }
  }
}

/**
 * Provider 2: eSMS.vn Implementation
 */
export class EsmsSmsProvider implements SmsProvider {
  name = 'esms' as const;

  async sendOtp(phone: string, otp: string) {
    const apiKey = process.env.ESMS_API_KEY;
    const secretKey = process.env.ESMS_SECRET_KEY;
    const isSandbox = process.env.ESMS_SANDBOX === 'true';

    // Mock/Sandbox mode for local testing without draining real credits
    if (isSandbox) {
      console.info(`[SMS MOCK - eSMS Sandbox] Sending OTP [${otp}] to [${phone}]`);
      return {
        success: true,
        messageId: `esms-sandbox-${Date.now()}`,
      };
    }

    if (!apiKey || !secretKey) {
      return {
        success: false,
        error: 'ESMS_API_KEY or ESMS_SECRET_KEY is not configured',
      };
    }

    const nationalPhone = toNationalPhone(phone);
    const content = `[Alma Dungduong] Ma OTP cua ban la ${otp}. Ma co hieu luc trong 10 phut.`;
    const brandname = process.env.ESMS_BRANDNAME?.trim() || '';

    // eSMS V4 API:
    // SmsType '2' = Brandname CSKH/OTP (requires registered Brandname)
    // SmsType '8' = Generic fixed number (đầu số cố định 10 số, không cần Brandname)
    // If configured type is '4' (invalid in eSMS API V4) or missing, auto-select based on brandname
    let configuredType = process.env.ESMS_SMS_TYPE?.trim();
    if (configuredType === '4' || !configuredType) {
      configuredType = brandname ? '2' : '8';
    }
    const smsType = configuredType;

    try {
      const response = await fetch(
        'https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ApiKey: apiKey,
            SecretKey: secretKey,
            Content: content,
            Phone: nationalPhone,
            SmsType: smsType,
            Brandname: brandname,
            IsUnicode: '0',
            Sandbox: '0',
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      // eSMS returns CodeResult: "100" on success
      if (data?.CodeResult === '100' || data?.CodeResult === 100) {
        return {
          success: true,
          messageId: data?.SMSID || `esms-${Date.now()}`,
        };
      }

      return {
        success: false,
        error: data?.ErrorMessage || `eSMS returned CodeResult: ${data?.CodeResult}`,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error connecting to eSMS API',
      };
    }
  }
}

/**
 * Composite Orchestrator: ChainedSmsProvider
 * Tries Bird first; falls back to eSMS on quota exhaustion or delivery error
 */
export class ChainedSmsProvider {
  constructor(
    private primary: SmsProvider = new BirdSmsProvider(),
    private fallback: SmsProvider = new EsmsSmsProvider()
  ) {}

  async sendOtp(phone: string, otp: string): Promise<SmsSendResult> {
    const normalized = normalizeVietnamPhone(phone);
    if (!normalized) {
      return {
        success: false,
        provider: 'mock',
        error: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ (ví dụ: 0912345678).',
      };
    }

    // 1. Try Primary Provider (Bird)
    try {
      const primaryResult = await this.primary.sendOtp(normalized, otp);
      if (primaryResult.success) {
        return {
          success: true,
          provider: this.primary.name,
          messageId: primaryResult.messageId,
          fallbackUsed: false,
        };
      }

      console.warn(
        `[SMS Orchestrator] Primary provider (${this.primary.name}) failed (quotaExceeded=${primaryResult.isQuotaExceeded}):`,
        primaryResult.error
      );
    } catch (err: any) {
      console.error(`[SMS Orchestrator] Exception in primary provider (${this.primary.name}):`, err);
    }

    // 2. Automatic Rollback / Fallback to Secondary Provider (eSMS)
    console.info(`[SMS Orchestrator] Cascading to fallback provider (${this.fallback.name})...`);
    try {
      const fallbackResult = await this.fallback.sendOtp(normalized, otp);
      if (fallbackResult.success) {
        return {
          success: true,
          provider: this.fallback.name,
          messageId: fallbackResult.messageId,
          fallbackUsed: true,
        };
      }

      return {
        success: false,
        provider: this.fallback.name,
        error: `Gửi tin nhắn thất bại: ${fallbackResult.error || 'Lỗi không xác định'}`,
        fallbackUsed: true,
      };
    } catch (err: any) {
      return {
        success: false,
        provider: this.fallback.name,
        error: `Lỗi kết nối tới nhà cung cấp dự phòng: ${err?.message || 'Không thể gửi tin nhắn'}`,
        fallbackUsed: true,
      };
    }
  }
}

// Singleton instance
export const smsService = new ChainedSmsProvider();
