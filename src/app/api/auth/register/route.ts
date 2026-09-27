import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendEmailVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ email và mật khẩu." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email này đã được sử dụng." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Find default loyalty tier (first tier by sortOrder)
    const defaultTier = await prisma.loyaltyTier.findFirst({
      orderBy: { sortOrder: "asc" },
    });

    // Create user with emailVerified: null
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        hashedPassword,
        loyaltyTierId: defaultTier?.id || null,
      },
    });

    // Generate verification token (expires in 1 hour)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.emailVerificationToken.create({
      data: {
        email: user.email,
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

    // Send email verification link
    await sendEmailVerificationEmail(user.email, verifyUrl).catch((err) => {
      console.error("Failed to send email verification email:", err);
    });

    return NextResponse.json(
      {
        message: "Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
        requiresVerification: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi trong quá trình đăng ký." },
      { status: 500 }
    );
  }
}
