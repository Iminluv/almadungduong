import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { cleanupExpiredTokens } from '@/lib/token-cleanup';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const count = await cleanupExpiredTokens();

    return NextResponse.json({
      success: true,
      deleted: count,
      message: `Đã dọn dẹp ${count} mã xác nhận hết hạn thành công.`,
    });
  } catch (error) {
    console.error('Error in cleanup-tokens API:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống.' }, { status: 500 });
  }
}
