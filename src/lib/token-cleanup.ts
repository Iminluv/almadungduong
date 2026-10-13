import { prisma } from '@/lib/db';

/**
 * Deletes all expired password reset tokens from the database.
 * Returns the count of deleted tokens.
 */
export async function cleanupExpiredTokens(): Promise<number> {
  try {
    const [passwordTokens, emailTokens, phoneTokens] = await Promise.all([
      prisma.passwordResetToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      }),
      prisma.emailVerificationToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      }),
      prisma.phoneOtpToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      }),
    ]);
    return passwordTokens.count + emailTokens.count + phoneTokens.count;
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
    return 0;
  }
}
