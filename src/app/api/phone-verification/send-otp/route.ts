import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { normalizeVietnamPhone, smsService } from "@/lib/sms";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để thực hiện xác thực số điện thoại." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp số điện thoại." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizeVietnamPhone(phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        {
          error:
            "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại di động Việt Nam (ví dụ: 0912345678).",
        },
        { status: 400 }
      );
    }

    // 1. Global uniqueness check: Ensure no other user has verified this phone number
    const existingVerifiedUser = await prisma.user.findFirst({
      where: {
        phone: normalizedPhone,
        phoneVerified: { not: null },
        id: { not: session.user.id },
      },
      select: { id: true },
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          error:
            "Số điện thoại này đã được xác thực bởi một tài khoản khác trên hệ thống.",
        },
        { status: 409 }
      );
    }

    // 2. Rate limiting check: Max 3 OTP requests per phone number within 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentOtpCount = await prisma.phoneOtpToken.count({
      where: {
        phone: normalizedPhone,
        createdAt: { gte: tenMinutesAgo },
      },
    });

    if (recentOtpCount >= 3) {
      return NextResponse.json(
        {
          error:
            "Bạn đã yêu cầu gửi mã OTP quá số lần cho phép (tối đa 3 lần / 10 phút). Vui lòng thử lại sau.",
        },
        { status: 429 }
      );
    }

    // 3. Invalidate previous pending tokens for this user & phone
    await prisma.phoneOtpToken.updateMany({
      where: {
        userId: session.user.id,
        phone: normalizedPhone,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    // 4. Generate secure 6-digit OTP code & bcrypt hash
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = bcrypt.hashSync(rawOtp, 10);

    // 5. Send OTP via Dual-Provider SMS Service (Bird default -> eSMS fallback)
    const sendResult = await smsService.sendOtp(normalizedPhone, rawOtp);
    if (!sendResult.success) {
      return NextResponse.json(
        {
          error:
            sendResult.error ||
            "Không thể gửi tin nhắn xác thực qua SMS. Vui lòng thử lại sau.",
        },
        { status: 502 }
      );
    }

    // 6. Record token in database (10 minutes expiry)
    await prisma.phoneOtpToken.create({
      data: {
        phone: normalizedPhone,
        otp: hashedOtp,
        userId: session.user.id,
        providerUsed: sendResult.provider,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Mã xác thực OTP đã được gửi đến số điện thoại của bạn.",
      provider: sendResult.provider,
      fallbackUsed: sendResult.fallbackUsed || false,
    });
  } catch (error: any) {
    console.error("send-otp error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra trong quá trình gửi mã OTP. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
