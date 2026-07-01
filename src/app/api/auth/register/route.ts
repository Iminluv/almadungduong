import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";

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

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        hashedPassword,
        loyaltyTierId: defaultTier?.id || null,
      },
    });

    // Send welcome email asynchronously
    sendWelcomeEmail(user.email, user.name || "").catch((err) => {
      console.error("Failed to send welcome email asynchronously:", err);
    });

    return NextResponse.json(
      {
        message: "Đăng ký tài khoản thành công.",
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
