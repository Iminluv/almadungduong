import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';
import { cleanupExpiredTokens } from '@/lib/token-cleanup';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Thiếu email.' }, { status: 400 });
    }

    // Run lazy cleanup of expired tokens (non-blocking)
    cleanupExpiredTokens().catch((err) => {
      console.error('Error during lazy token cleanup:', err);
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // To prevent user enumeration attacks, return success even if user not found
    if (!user) {
      return NextResponse.json({
        message: 'Nếu email tồn tại trên hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.',
      });
    }

    // Delete any existing tokens for this email to prevent reuse/spamming
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    // Generate token (expires in 24 hours)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Build reset URL
    const host = request.headers.get('host') || 'localhost:4000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const origin = `${protocol}://${host}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
    const resetUrl = `${baseUrl}/tai-khoan/reset-password?token=${token}`;

    // Send email asynchronously (non-blocking)
    sendPasswordResetEmail(email, resetUrl).catch((err) => {
      console.error('Failed to send password reset email:', err);
    });

    return NextResponse.json({
      message: 'Nếu email tồn tại trên hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.',
    });
  } catch (error) {
    console.error('Error in forgot-password API:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống.' }, { status: 500 });
  }
}
