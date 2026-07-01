import { prisma } from '@/lib/db';

/**
 * Deletes all expired password reset tokens from the database.
 * Returns the count of deleted tokens.
 */
export async function cleanupExpiredTokens(): Promise<number> {
  try {
    const result = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    return result.count;
  } catch (error) {
    console.error("Error cleaning up expired password reset tokens:", error);
    return 0;
  }
}
