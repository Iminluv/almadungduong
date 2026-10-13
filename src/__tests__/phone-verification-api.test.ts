import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

// Hoist mocks properly using vi.hoisted
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

// Import route handlers after mocks
import { POST as sendOtpHandler } from '@/app/api/phone-verification/send-otp/route';
import { POST as verifyOtpHandler } from '@/app/api/phone-verification/verify-otp/route';

describe('POST /api/phone-verification/send-otp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 when user is not logged in', async () => {
    mockAuth.mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678' }),
    });

    const res = await sendOtpHandler(req);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain('Vui lòng đăng nhập');
  });

  it('returns 400 when phone number is missing or invalid', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });

    const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '123' }),
    });

    const res = await sendOtpHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Số điện thoại không hợp lệ');
  });

  it('returns 409 when phone number is already verified by another user', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
    mockPrismaUser.findFirst.mockResolvedValueOnce({ id: 'user-2' }); // Another user

    const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678' }),
    });

    const res = await sendOtpHandler(req);
    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.error).toContain('đã được xác thực bởi một tài khoản khác');
  });

  it('returns 429 when rate limit of 3 OTPs / 10 minutes is exceeded', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
    mockPrismaUser.findFirst.mockResolvedValueOnce(null);
    mockPrismaPhoneOtpToken.count.mockResolvedValueOnce(3); // 3 OTPs already sent

    const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678' }),
    });

    const res = await sendOtpHandler(req);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain('quá số lần cho phép');
  });

  it('generates OTP, hashes it, calls smsService, and returns 200 on success', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
    mockPrismaUser.findFirst.mockResolvedValueOnce(null);
    mockPrismaPhoneOtpToken.count.mockResolvedValueOnce(0);
    mockPrismaPhoneOtpToken.updateMany.mockResolvedValueOnce({ count: 0 });
    mockSendOtp.mockResolvedValueOnce({
      success: true,
      provider: 'bird',
      fallbackUsed: false,
    });
    mockPrismaPhoneOtpToken.create.mockResolvedValueOnce({ id: 'token-1' });

    const req = new NextRequest('http://localhost:4000/api/phone-verification/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678' }),
    });

    const res = await sendOtpHandler(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.provider).toBe('bird');
    expect(mockSendOtp).toHaveBeenCalledWith('+84912345678', expect.any(String));
    expect(mockPrismaPhoneOtpToken.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          phone: '+84912345678',
          userId: 'user-1',
          providerUsed: 'bird',
        }),
      })
    );
  });
});

describe('POST /api/phone-verification/verify-otp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 when user is not logged in', async () => {
    mockAuth.mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678', otp: '123456' }),
    });

    const res = await verifyOtpHandler(req);
    expect(res.status).toBe(401);
  });

  it('returns 400 when OTP token is expired or not found', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
    mockPrismaPhoneOtpToken.findFirst.mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678', otp: '123456' }),
    });

    const res = await verifyOtpHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('không tồn tại hoặc đã hết hiệu lực');
  });

  it('returns 400 when entered OTP is incorrect', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
    const correctHashed = bcrypt.hashSync('654321', 10);
    mockPrismaPhoneOtpToken.findFirst.mockResolvedValueOnce({
      id: 'token-1',
      otp: correctHashed,
      phone: '+84912345678',
    });

    const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678', otp: '000000' }), // wrong otp
    });

    const res = await verifyOtpHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Mã OTP không chính xác');
  });

  it('updates token and user atomically on valid OTP and returns 200', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'test@example.com' } });
    const hashedOtp = bcrypt.hashSync('123456', 10);
    mockPrismaPhoneOtpToken.findFirst.mockResolvedValueOnce({
      id: 'token-123',
      otp: hashedOtp,
      phone: '+84912345678',
    });
    mockPrismaUser.findFirst.mockResolvedValueOnce(null); // not claimed by others
    mockPrismaTransaction.mockResolvedValueOnce([{}, {}]);

    const req = new NextRequest('http://localhost:4000/api/phone-verification/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone: '0912345678', otp: '123456' }),
    });

    const res = await verifyOtpHandler(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.phone).toBe('+84912345678');
    expect(mockPrismaTransaction).toHaveBeenCalled();
  });
});
