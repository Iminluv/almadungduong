import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { fetchBankAccount, generateTransferCode, buildQrUrl } from '@/lib/sepay';
import { getImageUrl } from '@/lib/utils';
import { sendOrderPendingEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized. Vui lòng đăng nhập.' }, { status: 401 });
    }

    const body = await request.json();
    const { items, shippingInfo, shippingFee = 0 } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Giỏ hàng trống.' }, { status: 400 });
    }

    if (!shippingInfo || !shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.email || !shippingInfo.street || !shippingInfo.city) {
      return NextResponse.json({ error: 'Thiếu thông tin giao hàng.' }, { status: 400 });
    }

    // 1. Idempotency Check: Return existing pending order if not expired
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId,
        status: 'pending',
        expiresAt: { gt: new Date() },
      },
      include: {
        items: true,
      },
    });

    if (existingOrder) {
      return NextResponse.json({
        id: existingOrder.id,
        transferCode: existingOrder.transferCode,
        amount: existingOrder.amount,
        shippingFee: existingOrder.shippingFee,
        totalAmount: existingOrder.totalAmount,
        bankAccount: existingOrder.bankAccount,
        bankName: existingOrder.bankName,
        accountName: existingOrder.accountName,
        qrUrl: existingOrder.qrUrl,
        expiresAt: existingOrder.expiresAt,
      });
    }

    // 2. Fetch fresh bank credentials from SePay
    const bankInfo = await fetchBankAccount();

    // 3. Verify prices against Database to prevent tampering
    const productIds = items.map((item: any) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(dbProducts.map(p => [p.id, p]));

    let calculatedAmount = 0;
    const resolvedItems = items.map((item: any) => {
      const dbProduct = productMap.get(item.productId);
      const unitPrice = dbProduct ? dbProduct.price : item.price;
      calculatedAmount += unitPrice * item.quantity;
      return {
        productId: item.productId,
        title: dbProduct ? dbProduct.title : item.title,
        price: unitPrice,
        quantity: item.quantity,
        variant: item.variant || null,
        image: dbProduct ? getImageUrl(dbProduct.image) : item.image || '',
      };
    });

    const totalAmount = calculatedAmount + shippingFee;
    const transferCode = generateTransferCode();
    const qrUrl = buildQrUrl(bankInfo.account_number, bankInfo.bank_short_name, totalAmount, transferCode);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    const shippingAddress = `${shippingInfo.street}, ${shippingInfo.district || ''}, ${shippingInfo.city}`;

    // 4. Create Order & OrderItems in a transaction
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          transferCode,
          amount: calculatedAmount,
          shippingFee,
          totalAmount,
          status: 'pending',
          shippingName: shippingInfo.fullName,
          shippingPhone: shippingInfo.phone,
          shippingEmail: shippingInfo.email,
          shippingAddress,
          bankAccount: bankInfo.account_number,
          bankName: bankInfo.bank_short_name,
          accountName: bankInfo.account_holder_name,
          qrUrl,
          expiresAt,
        },
      });

      await tx.orderItem.createMany({
        data: resolvedItems.map(item => ({
          orderId: order.id,
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
          image: item.image,
        })),
      });

      return order;
    });

    // Send order pending email asynchronously
    sendOrderPendingEmail(shippingInfo.email, {
      transferCode: newOrder.transferCode,
      totalAmount: newOrder.totalAmount,
      bankName: newOrder.bankName,
      bankAccount: newOrder.bankAccount,
      accountName: newOrder.accountName,
      expiresAt: newOrder.expiresAt,
      shippingName: newOrder.shippingName,
      items: resolvedItems,
    }).catch((err) => {
      console.error("Failed to send order pending email asynchronously:", err);
    });

    return NextResponse.json({
      id: newOrder.id,
      transferCode: newOrder.transferCode,
      amount: newOrder.amount,
      shippingFee: newOrder.shippingFee,
      totalAmount: newOrder.totalAmount,
      bankAccount: newOrder.bankAccount,
      bankName: newOrder.bankName,
      accountName: newOrder.accountName,
      qrUrl: newOrder.qrUrl,
      expiresAt: newOrder.expiresAt,
    });

  } catch (error) {
    console.error('Error in checkout API:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi khi tạo đơn hàng.' }, { status: 500 });
  }
}
