import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { notifyManualClaim } from '@/lib/notifications';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized. Vui lòng đăng nhập.' }, { status: 401 });
    }

    const { transferCode } = await request.json();

    if (!transferCode) {
      return NextResponse.json({ error: 'Thiếu mã chuyển khoản' }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        transferCode,
        userId,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }

    if (order.status === 'completed') {
      return NextResponse.json({ message: 'Đơn hàng này đã được xác nhận thanh toán trước đó.' });
    }

    // Update manual claim flag
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        userClaimed: true,
        claimedAt: new Date(),
      },
    });

    notifyManualClaim(updatedOrder);

    return NextResponse.json({
      success: true,
      message: 'Chúng tôi đã ghi nhận yêu cầu và sẽ xác minh trong vòng 1 giờ. Cảm ơn bạn!',
    });

  } catch (error) {
    console.error('Error claiming manual transfer:', error);
    return NextResponse.json({ error: 'Không thể gửi yêu cầu xác minh thủ công.' }, { status: 500 });
  }
}
