import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  normalizeVietnamPhone,
  isValidVietnamPhone,
  toNationalPhone,
  ChainedSmsProvider,
  SmsProvider,
} from '@/lib/sms';

// Hoist mocks for API handler testing
const {
  mockAuth,
  mockPrismaUser,
  mockPrismaPhoneOtpToken,
  mockPrismaTransaction,
  mockSendOtp,
} = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockPrismaUser: {
    findFirst: vi.fn(),
    update: vi.fn(),
  },
  mockPrismaPhoneOtpToken: {
    count: vi.fn(),
    updateMany: vi.fn(),
    create: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
  },
  mockPrismaTransaction: vi.fn(),
  mockSendOtp: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  auth: () => mockAuth(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    user: mockPrismaUser,
    phoneOtpToken: mockPrismaPhoneOtpToken,
    $transaction: (args: any) => mockPrismaTransaction(args),
  },
}));

vi.mock('@/lib/sms', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    smsService: {
      sendOtp: (...args: any[]) => mockSendOtp(...args),
    },
  };
});

// Import route handlers
import { POST as sendOtpHandler } from '@/app/api/phone-verification/send-otp/route';
import { POST as verifyOtpHandler } from '@/app/api/phone-verification/verify-otp/route';

describe('Phone Verification Feature E2E Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. Phone Number Normalization & Carrier Validation', () => {
    it('accurately parses valid Vietnamese mobile numbers', () => {
      expect(normalizeVietnamPhone('0901234567')).toBe('+84901234567');
      expect(normalizeVietnamPhone('+84988776655')).toBe('+84988776655');
      expect(normalizeVietnamPhone('84334455667')).toBe('+84334455667');
      expect(normalizeVietnamPhone(' 089 123 4567 ')).toBe('+84891234567');
    });

    it('rejects foreign, landline, or invalid formatted inputs', () => {
      expect(isValidVietnamPhone('02438889999')).toBe(false); // Hanoi landline
      expect(isValidVietnamPhone('+14155552671')).toBe(false); // US phone
      expect(isValidVietnamPhone('091234')).toBe(false); // Short code
      expect(isValidVietnamPhone('')).toBe(false);
    });

    it('converts to domestic 10-digit format for Vietnam telco routing', () => {
      expect(toNationalPhone('+84901234567')).toBe('0901234567');
    });
  });

  describe('2. Dual-Provider Cascade Engine (Bird -> eSMS)', () => {
    it('uses primary Bird provider on free tier', async () => {
      const mockBird: SmsProvider = {
        name: 'bird',
        sendOtp: vi.fn().mockResolvedValue({ success: true, messageId: 'bird-msg-1' }),
      };
      const mockEsms: SmsProvider = {
        name: 'esms',
        sendOtp: vi.fn(),
      };

      const orchestrator = new ChainedSmsProvider(mockBird, mockEsms);
      const res = await orchestrator.sendOtp('0912345678', '654321');

      expect(res.success).toBe(true);
      expect(res.provider).toBe('bird');
      expect(res.fallbackUsed).toBe(false);
      expect(mockEsms.sendOtp).not.toHaveBeenCalled();
    });

    it('automatically cascades to eSMS when Bird free tier is exhausted (402/429/balance)', async () => {
      const mockBird: SmsProvider = {
        name: 'bird',
        sendOtp: vi.fn().mockResolvedValue({
          success: false,
          isQuotaExceeded: true,
          error: 'HTTP 402: Insufficient credit balance on free tier',
        }),
      };
      const mockEsms: SmsProvider = {
        name: 'esms',
        sendOtp: vi.fn().mockResolvedValue({ success: true, messageId: 'esms-fallback-1' }),
      };

      const orchestrator = new ChainedSmsProvider(mockBird, mockEsms);
      const res = await orchestrator.sendOtp('0912345678', '654321');

      expect(res.success).toBe(true);
      expect(res.provider).toBe('esms');
      expect(res.fallbackUsed).toBe(true);
      expect(mockEsms.sendOtp).toHaveBeenCalledWith('+84912345678', '654321');
    });
  });

  describe('3. Rate Limiting & Abuse Prevention', () => {
    it('blocks request with 429 when phone requested 3 OTPs within 10 minutes', async () => {
      mockAuth.mockResolvedValueOnce({ user: { id: 'user-abc', email: 'user@example.com' } });
      mockPrismaUser.findFirst.mockResolvedValueOnce(null);
      mockPrismaPhoneOtpToken.count.mockResolvedValueOnce(3); // Rate limit reached

      const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: '0912345678' }),
      });

      const res = await sendOtpHandler(req);
      expect(res.status).toBe(429);
      const data = await res.json();
      expect(data.error).toContain('quá số lần cho phép');
      expect(mockSendOtp).not.toHaveBeenCalled();
    });

    it('prevents multiple accounts from claiming the same phone number (409 Conflict)', async () => {
      mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'account1@example.com' } });
      mockPrismaUser.findFirst.mockResolvedValueOnce({ id: 'user-2' }); // Already claimed by user-2

      const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: '0912345678' }),
      });

      const res = await sendOtpHandler(req);
      expect(res.status).toBe(409);
      const data = await res.json();
      expect(data.error).toContain('đã được xác thực bởi một tài khoản khác');
    });
  });

  describe('4. Token Security & Verification Transaction', () => {
    it('hashes OTP with bcrypt at rest when sending', async () => {
      mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
      mockPrismaUser.findFirst.mockResolvedValueOnce(null);
      mockPrismaPhoneOtpToken.count.mockResolvedValueOnce(0);
      mockPrismaPhoneOtpToken.updateMany.mockResolvedValueOnce({ count: 0 });
      mockSendOtp.mockResolvedValueOnce({ success: true, provider: 'bird' });
      mockPrismaPhoneOtpToken.create.mockResolvedValueOnce({ id: 'token-created' });

      const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: '0912345678' }),
      });

      const res = await sendOtpHandler(req);
      expect(res.status).toBe(200);

      // Verify bcrypt hash is stored, NOT plaintext
      const createArgs = mockPrismaPhoneOtpToken.create.mock.calls[0][0];
      const savedHashedOtp = createArgs.data.otp;
      expect(savedHashedOtp).not.toMatch(/^[0-9]{6}$/); // Not raw 6 digits
      expect(savedHashedOtp.startsWith('$2')).toBe(true); // Valid bcrypt hash prefix
    });

    it('rejects tampered or invalid OTP code', async () => {
      mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
      const validHash = bcrypt.hashSync('888888', 10);
      mockPrismaPhoneOtpToken.findFirst.mockResolvedValueOnce({
        id: 'tok-1',
        otp: validHash,
        phone: '+84912345678',
      });

      const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: '0912345678', otp: '123456' }), // Wrong OTP
      });

      const res = await verifyOtpHandler(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Mã OTP không chính xác');
    });

    it('rejects replayed / consumed OTP code', async () => {
      mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
      mockPrismaPhoneOtpToken.findFirst.mockResolvedValueOnce(null); // Already used (usedAt != null) or expired

      const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: '0912345678', otp: '888888' }),
      });

      const res = await verifyOtpHandler(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('không tồn tại hoặc đã hết hiệu lực');
    });

    it('executes atomic transaction marking token consumed and user verified', async () => {
      mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
      const validHash = bcrypt.hashSync('999999', 10);
      mockPrismaPhoneOtpToken.findFirst.mockResolvedValueOnce({
        id: 'tok-99',
        otp: validHash,
        phone: '+84912345678',
      });
      mockPrismaUser.findFirst.mockResolvedValueOnce(null);
      mockPrismaTransaction.mockResolvedValueOnce([{}, {}]);

      const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: '0912345678', otp: '999999' }),
      });

      const res = await verifyOtpHandler(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.phone).toBe('+84912345678');
      expect(mockPrismaTransaction).toHaveBeenCalled();
    });
  });
});
