import { describe, it, expect, vi, beforeEach } from 'vitest';

const {
  mockPrismaUser,
  mockPrismaLoyaltyTier,
  mockPrismaEmailToken,
  mockSendVerificationEmail,
} = vi.hoisted(() => ({
  mockPrismaUser: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  mockPrismaLoyaltyTier: {
    findFirst: vi.fn(),
  },
  mockPrismaEmailToken: {
    create: vi.fn(),
  },
  mockSendVerificationEmail: vi.fn().mockResolvedValue(true),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    user: mockPrismaUser,
    loyaltyTier: mockPrismaLoyaltyTier,
    emailVerificationToken: mockPrismaEmailToken,
  },
}));

vi.mock('@/lib/email', () => ({
  sendEmailVerificationEmail: (...args: any[]) => mockSendVerificationEmail(...args),
}));

import { POST as registerHandler } from '@/app/api/auth/register/route';

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when email or password is missing', async () => {
    const req = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test User' }),
    });

    const res = await registerHandler(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain('email và mật khẩu');
  });

  it('returns 400 when email already exists', async () => {
    mockPrismaUser.findUnique.mockResolvedValueOnce({ id: 'user_1', email: 'existing@example.com' });

    const req = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test User', email: 'existing@example.com', password: 'password123' }),
    });

    const res = await registerHandler(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain('Email này đã được sử dụng');
  });

  it('successfully registers user with phone set to null without requiring phone field', async () => {
    mockPrismaUser.findUnique.mockResolvedValueOnce(null);
    mockPrismaLoyaltyTier.findFirst.mockResolvedValueOnce({ id: 'tier_default' });
    mockPrismaUser.create.mockResolvedValueOnce({
      id: 'new_user_1',
      name: 'Nguyen Van A',
      email: 'newuser@example.com',
      phone: null,
    });
    mockPrismaEmailToken.create.mockResolvedValueOnce({ id: 'token_1' });

    const req = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Nguyen Van A',
        email: 'newuser@example.com',
        password: 'password123',
      }),
    });

    const res = await registerHandler(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.requiresVerification).toBe(true);
    expect(mockPrismaUser.create).toHaveBeenCalledWith({
      data: {
        name: 'Nguyen Van A',
        email: 'newuser@example.com',
        phone: null,
        hashedPassword: expect.any(String),
        loyaltyTierId: 'tier_default',
      },
    });
    expect(mockSendVerificationEmail).toHaveBeenCalled();
  });
});
