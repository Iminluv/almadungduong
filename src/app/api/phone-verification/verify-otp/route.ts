import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { normalizeVietnamPhone } from "@/lib/sms";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để xác thực số điện thoại." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp đầy đủ số điện thoại và mã OTP." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizeVietnamPhone(phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { error: "Số điện thoại không hợp lệ." },
        { status: 400 }
      );
    }

    const cleanOtp = String(otp).trim();
    if (!/^[0-9]{6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { error: "Mã OTP phải gồm 6 chữ số." },
        { status: 400 }
      );
    }

    // 1. Locate the latest active, non-expired, and unused OTP token for this user
    const token = await prisma.phoneOtpToken.findFirst({
      where: {
        userId: session.user.id,
        phone: normalizedPhone,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!token) {
      return NextResponse.json(
        {
          error:
            "Mã OTP không tồn tại hoặc đã hết hiệu lực (10 phút). Vui lòng yêu cầu gửi lại mã mới.",
        },
        { status: 400 }
      );
    }

    // 2. Verify hashed OTP with constant-time bcrypt compare
    const isMatch = bcrypt.compareSync(cleanOtp, token.otp);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Mã OTP không chính xác. Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }

    // 3. Double-check global uniqueness right before committing
    const alreadyClaimed = await prisma.user.findFirst({
      where: {
        phone: normalizedPhone,
        phoneVerified: { not: null },
        id: { not: session.user.id },
      },
      select: { id: true },
    });

    if (alreadyClaimed) {
      return NextResponse.json(
        {
          error:
            "Số điện thoại này đã được xác thực bởi một tài khoản khác trên hệ thống.",
        },
        { status: 409 }
      );
    }

    // 4. Atomic transaction: mark token as consumed and update User phone & phoneVerified
    await prisma.$transaction([
      prisma.phoneOtpToken.update({
        where: { id: token.id },
        data: { usedAt: new Date() },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          phone: normalizedPhone,
          phoneVerified: new Date(),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Xác thực số điện thoại thành công!",
      phone: normalizedPhone,
    });
  } catch (error: any) {
    console.error("verify-otp error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra trong quá trình xác thực mã OTP." },
      { status: 500 }
    );
  }
}
