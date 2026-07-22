import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ error: 'Phương thức không được hỗ trợ. Vui lòng sử dụng POST.' }, { status: 405 });
}

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin yêu cầu.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 8 ký tự.' }, { status: 400 });
    }

    // Find the token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.usedAt) {
      return NextResponse.json({ error: 'Mã xác nhận không hợp lệ hoặc đã được sử dụng.' }, { status: 400 });
    }

    if (new Date() > new Date(resetToken.expiresAt)) {
      return NextResponse.json({ error: 'Mã xác nhận đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.' }, { status: 400 });
    }

    // Find the user to verify they exist
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy người dùng phù hợp.' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update user password and mark the token as used in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json({
      message: 'Đặt lại mật khẩu thành công.',
    });
  } catch (error) {
    console.error('Error in reset-password API:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống.' }, { status: 500 });
  }
}
