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

  if (!token || !accountId) {
    console.warn("SePay API Token or Bank Account ID is missing. Using fallback bank credentials.");
    return fallback;
  }

  try {
    const res = await fetch(`https://my.sepay.vn/userapi/bankaccounts/details/${accountId}`, {
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
    // SePay API structure can be nested under bankAccount, bankaccount, or data
    const account = data.bankAccount || data.bankaccount || data.data || data;

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
  } catch (err) {
    console.error("Failed to fetch bank account from SePay API:", err);
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
