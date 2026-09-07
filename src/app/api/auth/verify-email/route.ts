import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  const origin = `${protocol}://${host}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/tai-khoan?verified=false`);
    }

    // Find verification token
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`${baseUrl}/tai-khoan?verified=false`);
    }

    // Check if token has expired or already been used
    if (verificationToken.usedAt || verificationToken.expiresAt < new Date()) {
      return NextResponse.redirect(`${baseUrl}/tai-khoan?verified=false`);
    }

    // Mark token as used and verify the user's email
    await prisma.$transaction([
      prisma.emailVerificationToken.update({
        where: { token },
        data: { usedAt: new Date() },
      }),
      prisma.user.updateMany({
        where: { email: verificationToken.email },
        data: { emailVerified: new Date() },
      }),
    ]);

    return NextResponse.redirect(`${baseUrl}/tai-khoan?verified=true`);
  } catch (error) {
    console.error('Error in verify-email API:', error);
    return NextResponse.redirect(`${baseUrl}/tai-khoan?verified=false`);
  }
}
