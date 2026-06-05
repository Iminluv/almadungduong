import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ transferCode: string }> }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transferCode } = await params;

    const order = await prisma.order.findFirst({
      where: {
        transferCode,
        userId,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }

    // Check expiration if still pending
    if (order.status === 'pending' && new Date() > order.expiresAt) {
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: { status: 'expired' },
      });
      return NextResponse.json({ status: updatedOrder.status });
    }

    return NextResponse.json({ status: order.status });
  } catch (error) {
    console.error('Error polling payment status:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi khi kiểm tra thanh toán' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ transferCode: string }> }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transferCode } = await params;

    const order = await prisma.order.findFirst({
      where: {
        transferCode,
        userId,
        status: 'pending',
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Không tìm thấy đơn hàng pending' }, { status: 404 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status: 'expired' },
    });

    return NextResponse.json({ status: updatedOrder.status });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi khi hủy thanh toán' }, { status: 500 });
  }
}
