import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendEmailVerificationEmail } from '@/lib/email';
import { cleanupExpiredTokens } from '@/lib/token-cleanup';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Thiếu email.' }, { status: 400 });
    }

    // Run cleanup of expired tokens
    await cleanupExpiredTokens().catch((err) => {
      console.error('Error during token cleanup:', err);
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user not found or already verified, return success-like message to prevent user enumeration
    if (!user || user.emailVerified) {
      return NextResponse.json({
        message: 'Nếu email tồn tại và chưa xác thực, hướng dẫn xác thực đã được gửi.',
      });
    }

    // Delete any existing verification tokens for this email
    await prisma.emailVerificationToken.deleteMany({
      where: { email },
    });

    // Generate verification token (expires in 1 hour as requested)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.emailVerificationToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Build verification URL
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const origin = `${protocol}://${host}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

    // Send email (awaited to prevent Vercel Serverless Function premature cancellation)
    await sendEmailVerificationEmail(email, verifyUrl).catch((err) => {
      console.error('Failed to send email verification email:', err);
    });

    return NextResponse.json({
      message: 'Email xác thực đã được gửi thành công. Vui lòng kiểm tra hộp thư của bạn.',
    });
  } catch (error) {
    console.error('Error in send-verification API:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống.' }, { status: 500 });
  }
}
