import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockPasswordDelete, mockEmailDelete, mockPhoneDelete } = vi.hoisted(() => ({
  mockPasswordDelete: vi.fn(),
  mockEmailDelete: vi.fn(),
  mockPhoneDelete: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  prisma: {
    passwordResetToken: {
      deleteMany: mockPasswordDelete,
    },
    emailVerificationToken: {
      deleteMany: mockEmailDelete,
    },
    phoneOtpToken: {
      deleteMany: mockPhoneDelete,
    },
  },
}));

import { cleanupExpiredTokens } from '@/lib/token-cleanup';

describe('cleanupExpiredTokens', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deletes expired tokens across password, email, and phone OTP models', async () => {
    mockPasswordDelete.mockResolvedValueOnce({ count: 2 });
    mockEmailDelete.mockResolvedValueOnce({ count: 5 });
    mockPhoneDelete.mockResolvedValueOnce({ count: 8 });

    const totalDeleted = await cleanupExpiredTokens();

    expect(totalDeleted).toBe(15);
    expect(mockPasswordDelete).toHaveBeenCalledWith({
      where: { expiresAt: { lt: expect.any(Date) } },
    });
    expect(mockEmailDelete).toHaveBeenCalledWith({
      where: { expiresAt: { lt: expect.any(Date) } },
    });
    expect(mockPhoneDelete).toHaveBeenCalledWith({
      where: { expiresAt: { lt: expect.any(Date) } },
    });
  });

  it('handles database exceptions gracefully and returns 0', async () => {
    mockPasswordDelete.mockRejectedValueOnce(new Error('DB failure'));

    const totalDeleted = await cleanupExpiredTokens();
    expect(totalDeleted).toBe(0);
  });
});
