import crypto from 'crypto';

interface BankAccountInfo {
  account_number: string;
  bank_short_name: string;
  account_holder_name: string;
}

let cachedBankInfo: BankAccountInfo | null = null;
let cacheExpiry = 0;

/**
 * Fetch bank account details from SePay API.
 * Uses local caching for 5 minutes and falls back to environment variables/constants on failure.
 * If SEPAY_BANK_ACCOUNT_ID is not configured, it dynamically fetches the active account list and selects the first active one.
 */
export async function fetchBankAccount(): Promise<BankAccountInfo> {
  const token = process.env.SEPAY_API_TOKEN;
  const accountId = process.env.SEPAY_BANK_ACCOUNT_ID;

  const now = Date.now();
  if (cachedBankInfo && now < cacheExpiry) {
    return cachedBankInfo;
  }

  // Fallback values if API is not configured or fails
  const fallback: BankAccountInfo = {
    account_number: process.env.SEPAY_BANK_ACCOUNT_NUMBER || "1017588888",
    bank_short_name: process.env.SEPAY_BANK_NAME || "Vietcombank",
    account_holder_name: process.env.SEPAY_BANK_ACCOUNT_NAME || "CÔNG TY TNHH ALMA",
  };

  if (!token) {
    console.warn("SePay API Token is missing. Using fallback bank credentials.");
    return fallback;
  }

  const isTestMode = process.env.SEPAY_TEST_MODE === 'true' || token.startsWith('KJQ');

  try {
    const baseUrl = isTestMode ? "https://userapi-sandbox.sepay.vn" : "https://userapi.sepay.vn";
    const url = accountId ? `${baseUrl}/v2/bank-accounts/${accountId}` : `${baseUrl}/v2/bank-accounts`;

    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // NextJS fetch cache 5 minutes
    });

    if (!res.ok) {
      throw new Error(`SePay API returned status ${res.status}`);
    }

    const data = await res.json();
    let account: any = null;

    if (accountId) {
      account = data.data || data;
    } else {
      const list = data.data || [];
      if (Array.isArray(list) && list.length > 0) {
        account = list.find((a: any) => String(a.active) === "1" || a.active === true || String(a.status) === "active") || list[0];
      }
    }

    if (account && (account.account_number || account.accountNumber)) {
      cachedBankInfo = {
        account_number: account.account_number || account.accountNumber,
        bank_short_name: account.bank_short_name || account.bankShortName || account.bank_name || "Vietcombank",
        account_holder_name: account.account_holder_name || account.accountHolderName || account.accountName || "CÔNG TY TNHH ALMA",
      };
      cacheExpiry = now + 5 * 60 * 1000; // 5 mins cache
      return cachedBankInfo!;
    }

    return fallback;
  } catch (err: any) {
    if (err instanceof Error && (err.message.includes("status 401") || err.message.includes("status 403"))) {
      console.warn(`SePay API Token is unauthorized or invalid (401/403) for ${isTestMode ? 'Sandbox' : 'Production'} endpoint. Using fallback bank credentials from .env.`);
    } else {
      console.error("Failed to fetch bank account from SePay API:", err);
    }
    return fallback;
  }
}

/**
 * Generate cryptographically secure transfer code with ALMA prefix and 8-char random alphanumeric string.
 */
export function generateTransferCode(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 8;
  let code = '';

  const bytes = crypto.randomBytes(codeLength);
  for (let i = 0; i < codeLength; i++) {
    const index = bytes[i] % alphabet.length;
    code += alphabet[index];
  }

  return `ALMA${code}`;
}

/**
 * Construct QR code image URL using SePay's free QR service.
 */
export function buildQrUrl(acc: string, bank: string, amount: number, transferCode: string): string {
  return `https://qr.sepay.vn/img?acc=${encodeURIComponent(acc)}&bank=${encodeURIComponent(bank)}&amount=${amount}&des=${encodeURIComponent(transferCode)}`;
}

/**
 * Parse the transfer code (e.g. ALMAXXXXXXXX) from transaction content/description.
 */
export function extractTransferCode(content: string): string | null {
  if (!content) return null;
  const match = content.toUpperCase().match(/ALMA([A-Z0-9]{8})/);
  return match ? match[0] : null;
}
