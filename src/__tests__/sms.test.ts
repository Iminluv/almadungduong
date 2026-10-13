import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  normalizeVietnamPhone,
  isValidVietnamPhone,
  toNationalPhone,
  BirdSmsProvider,
  EsmsSmsProvider,
  ChainedSmsProvider,
  SmsProvider,
} from '@/lib/sms';

describe('Vietnam Phone Normalization & Validation', () => {
  it('normalizes standard 10-digit Vietnamese phone numbers starting with 0', () => {
    expect(normalizeVietnamPhone('0912345678')).toBe('+84912345678');
    expect(normalizeVietnamPhone('0328999888')).toBe('+84328999888');
    expect(normalizeVietnamPhone('0701234567')).toBe('+84701234567');
    expect(normalizeVietnamPhone('0868888999')).toBe('+84868888999');
    expect(normalizeVietnamPhone('0568888999')).toBe('+84568888999');
  });

  it('normalizes phone numbers with country code (+84 or 84)', () => {
    expect(normalizeVietnamPhone('+84912345678')).toBe('+84912345678');
    expect(normalizeVietnamPhone('84912345678')).toBe('+84912345678');
  });

  it('cleans up spaces, dashes, dots, and brackets', () => {
    expect(normalizeVietnamPhone('(091) 234-5678')).toBe('+84912345678');
    expect(normalizeVietnamPhone('091.234.5678')).toBe('+84912345678');
    expect(normalizeVietnamPhone('+84 912 345 678')).toBe('+84912345678');
  });

  it('rejects invalid or non-Vietnamese numbers', () => {
    expect(normalizeVietnamPhone('123456')).toBeNull(); // too short
    expect(normalizeVietnamPhone('012345678901')).toBeNull(); // too long
    expect(normalizeVietnamPhone('0212345678')).toBeNull(); // landline prefix 02
    expect(normalizeVietnamPhone('abc0912345678')).toBeNull();
    expect(normalizeVietnamPhone('')).toBeNull();
    expect(normalizeVietnamPhone(null as any)).toBeNull();
  });

  it('validates Vietnamese phone numbers correctly with isValidVietnamPhone', () => {
    expect(isValidVietnamPhone('0987654321')).toBe(true);
    expect(isValidVietnamPhone('+84987654321')).toBe(true);
    expect(isValidVietnamPhone('012345')).toBe(false);
  });

  it('converts E.164 to national phone format', () => {
    expect(toNationalPhone('+84912345678')).toBe('0912345678');
    expect(toNationalPhone('84912345678')).toBe('0912345678');
    expect(toNationalPhone('0912345678')).toBe('0912345678');
  });
});

describe('ChainedSmsProvider Dual-Provider Orchestrator', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('uses Bird as primary provider when successful', async () => {
    const mockBird: SmsProvider = {
      name: 'bird',
      sendOtp: vi.fn().mockResolvedValue({
        success: true,
        messageId: 'bird-123',
      }),
    };

    const mockEsms: SmsProvider = {
      name: 'esms',
      sendOtp: vi.fn().mockResolvedValue({
        success: true,
        messageId: 'esms-123',
      }),
    };

    const orchestrator = new ChainedSmsProvider(mockBird, mockEsms);
    const result = await orchestrator.sendOtp('0912345678', '123456');

    expect(result.success).toBe(true);
    expect(result.provider).toBe('bird');
    expect(result.fallbackUsed).toBe(false);
    expect(result.messageId).toBe('bird-123');
    expect(mockBird.sendOtp).toHaveBeenCalledWith('+84912345678', '123456');
    expect(mockEsms.sendOtp).not.toHaveBeenCalled();
  });

  it('automatically falls back to eSMS when Bird fails or runs out of quota', async () => {
    const mockBird: SmsProvider = {
      name: 'bird',
      sendOtp: vi.fn().mockResolvedValue({
        success: false,
        error: 'Payment required: out of credit balance',
        isQuotaExceeded: true,
      }),
    };

    const mockEsms: SmsProvider = {
      name: 'esms',
      sendOtp: vi.fn().mockResolvedValue({
        success: true,
        messageId: 'esms-456',
      }),
    };

    const orchestrator = new ChainedSmsProvider(mockBird, mockEsms);
    const result = await orchestrator.sendOtp('0912345678', '654321');

    expect(result.success).toBe(true);
    expect(result.provider).toBe('esms');
    expect(result.fallbackUsed).toBe(true);
    expect(result.messageId).toBe('esms-456');
    expect(mockBird.sendOtp).toHaveBeenCalled();
    expect(mockEsms.sendOtp).toHaveBeenCalledWith('+84912345678', '654321');
  });

  it('returns failure when both primary and fallback providers fail', async () => {
    const mockBird: SmsProvider = {
      name: 'bird',
      sendOtp: vi.fn().mockResolvedValue({
        success: false,
        error: 'Bird down',
      }),
    };

    const mockEsms: SmsProvider = {
      name: 'esms',
      sendOtp: vi.fn().mockResolvedValue({
        success: false,
        error: 'eSMS balance zero',
      }),
    };

    const orchestrator = new ChainedSmsProvider(mockBird, mockEsms);
    const result = await orchestrator.sendOtp('0912345678', '111222');

    expect(result.success).toBe(false);
    expect(result.fallbackUsed).toBe(true);
    expect(result.error).toContain('eSMS balance zero');
  });

  it('rejects invalid phone numbers before calling any provider', async () => {
    const mockBird: SmsProvider = {
      name: 'bird',
      sendOtp: vi.fn(),
    };
    const mockEsms: SmsProvider = {
      name: 'esms',
      sendOtp: vi.fn(),
    };

    const orchestrator = new ChainedSmsProvider(mockBird, mockEsms);
    const result = await orchestrator.sendOtp('invalid-phone', '123456');

    expect(result.success).toBe(false);
    expect(result.error).toContain('Số điện thoại không hợp lệ');
    expect(mockBird.sendOtp).not.toHaveBeenCalled();
    expect(mockEsms.sendOtp).not.toHaveBeenCalled();
  });
});

describe('Provider Sandbox & Error Handling', () => {
  it('eSMS provider returns mock success in sandbox mode without hitting network', async () => {
    const originalEnv = process.env.ESMS_SANDBOX;
    process.env.ESMS_SANDBOX = 'true';

    const esmsProvider = new EsmsSmsProvider();
    const result = await esmsProvider.sendOtp('+84912345678', '888888');

    expect(result.success).toBe(true);
    expect(result.messageId).toContain('esms-sandbox-');

    process.env.ESMS_SANDBOX = originalEnv;
  });

  it('Bird provider marks quota exceeded on 402 and 429 status', async () => {
    const originalKey = process.env.BIRD_API_KEY;
    process.env.BIRD_API_KEY = 'test-key';

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 402,
      statusText: 'Payment Required',
      json: async () => ({ errors: [{ description: 'Not enough balance' }] }),
    }) as any;

    const birdProvider = new BirdSmsProvider();
    const result = await birdProvider.sendOtp('+84912345678', '999999');

    expect(result.success).toBe(false);
    expect(result.isQuotaExceeded).toBe(true);
    expect(result.error).toContain('Not enough balance');

    process.env.BIRD_API_KEY = originalKey;
  });

  it('eSMS auto-resolves SmsType to 8 when type is invalid or brandname is empty', async () => {
    const originalSandbox = process.env.ESMS_SANDBOX;
    const originalApiKey = process.env.ESMS_API_KEY;
    const originalSecret = process.env.ESMS_SECRET_KEY;
    const originalType = process.env.ESMS_SMS_TYPE;
    const originalBrand = process.env.ESMS_BRANDNAME;

    process.env.ESMS_SANDBOX = 'false';
    process.env.ESMS_API_KEY = 'test-api-key';
    process.env.ESMS_SECRET_KEY = 'test-secret';
    process.env.ESMS_SMS_TYPE = '4'; // Deprecated/invalid type 4
    process.env.ESMS_BRANDNAME = '';

    let capturedPayload: any = null;
    let capturedUrl: string = '';

    global.fetch = vi.fn().mockImplementation((url, options) => {
      capturedUrl = url;
      capturedPayload = JSON.parse(options.body);
      return Promise.resolve({
        json: async () => ({ CodeResult: '100', SMSID: 'test-sms-123' }),
      });
    }) as any;

    const esmsProvider = new EsmsSmsProvider();
    const result = await esmsProvider.sendOtp('+84912345678', '123456');

    expect(result.success).toBe(true);
    expect(capturedUrl).toBe('https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json');
    expect(capturedPayload.SmsType).toBe('8'); // Auto-corrected from 4 to 8

    process.env.ESMS_SANDBOX = originalSandbox;
    process.env.ESMS_API_KEY = originalApiKey;
    process.env.ESMS_SECRET_KEY = originalSecret;
    process.env.ESMS_SMS_TYPE = originalType;
    process.env.ESMS_BRANDNAME = originalBrand;
  });

  it('eSMS auto-resolves SmsType to 2 when Brandname is configured', async () => {
    const originalSandbox = process.env.ESMS_SANDBOX;
    const originalApiKey = process.env.ESMS_API_KEY;
    const originalSecret = process.env.ESMS_SECRET_KEY;
    const originalType = process.env.ESMS_SMS_TYPE;
    const originalBrand = process.env.ESMS_BRANDNAME;

    process.env.ESMS_SANDBOX = 'false';
    process.env.ESMS_API_KEY = 'test-api-key';
    process.env.ESMS_SECRET_KEY = 'test-secret';
    delete process.env.ESMS_SMS_TYPE;
    process.env.ESMS_BRANDNAME = 'ALMADUNGDUONG';

    let capturedPayload: any = null;

    global.fetch = vi.fn().mockImplementation((_url, options) => {
      capturedPayload = JSON.parse(options.body);
      return Promise.resolve({
        json: async () => ({ CodeResult: '100', SMSID: 'test-sms-456' }),
      });
    }) as any;

    const esmsProvider = new EsmsSmsProvider();
    const result = await esmsProvider.sendOtp('+84912345678', '654321');

    expect(result.success).toBe(true);
    expect(capturedPayload.SmsType).toBe('2'); // Resolved to 2 for brandname
    expect(capturedPayload.Brandname).toBe('ALMADUNGDUONG');

    process.env.ESMS_SANDBOX = originalSandbox;
    process.env.ESMS_API_KEY = originalApiKey;
    process.env.ESMS_SECRET_KEY = originalSecret;
    process.env.ESMS_SMS_TYPE = originalType;
    process.env.ESMS_BRANDNAME = originalBrand;
  });
});
