import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { extractTransferCode } from '@/lib/sepay';
import { notifyNewPayment, notifyUnmatchedWebhook, notifyAmountMismatch } from '@/lib/notifications';
import { sendOrderConfirmation } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 1. Read request body as raw text to verify the signature
    const rawBody = await request.text();
    const signatureHeader = request.headers.get('x-sepay-signature');
    const timestampHeader = request.headers.get('x-sepay-timestamp');

    let isAuthorized = false;

    if (signatureHeader && timestampHeader) {
      // HMAC-SHA256 Webhook Verification
      const secretKey = process.env.SEPAY_WEBHOOK_SECRET_KEY;
      if (!secretKey) {
        console.error('SEPAY_WEBHOOK_SECRET_KEY is not configured in .env');
        return NextResponse.json({ error: 'Webhook secret key missing' }, { status: 500 });
      }

      // Check timestamp drift to prevent replay attacks (allow up to 5 minutes drift)
      const timestamp = Number(timestampHeader);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (isNaN(timestamp) || Math.abs(currentTimestamp - timestamp) > 300) {
        console.warn(`Webhook signature rejected: timestamp drift too large. Header: ${timestampHeader}, Server: ${currentTimestamp}`);
        return NextResponse.json({ error: 'Unauthorized: timestamp drift' }, { status: 401 });
      }

      // Extract the signature hex
      const signature = signatureHeader.startsWith('sha256=') ? signatureHeader.substring(7) : signatureHeader;
      const message = `${timestampHeader}.${rawBody}`;
      const computedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(message)
        .digest('hex');

      try {
        const bufSignature = Buffer.from(signature, 'hex');
        const bufComputed = Buffer.from(computedSignature, 'hex');
        if (bufSignature.length === bufComputed.length && crypto.timingSafeEqual(bufSignature, bufComputed)) {
          isAuthorized = true;
        }
      } catch (err) {
        console.error('Signature decoding/matching error:', err);
      }
    } else {
      // Fallback: Verify API Key authorization header
      const authHeader = request.headers.get('Authorization');
      const expectedApiKey = process.env.SEPAY_WEBHOOK_API_KEY;

      if (!expectedApiKey) {
        console.error('SEPAY_WEBHOOK_API_KEY is not configured in .env');
        return NextResponse.json({ error: 'Webhook key missing' }, { status: 500 });
      }

      if (authHeader === `Apikey ${expectedApiKey}`) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      console.warn('Unauthorized webhook access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse payload from rawBody since stream has been consumed
    const payload = JSON.parse(rawBody);
    const { id: sepayId, transferType, content, transferAmount } = payload;

    if (!sepayId) {
      return NextResponse.json({ error: 'Invalid payload: missing id' }, { status: 400 });
    }

    // 2. Webhook Dedup: Unique constraint on WebhookLog.sepayId
    let logRecord;
    try {
      logRecord = await prisma.webhookLog.create({
        data: {
          sepayId: Number(sepayId),
          payload: payload,
          status: 'received',
        },
      });
    } catch (error: any) {
      // Prisma Unique Constraint violation error code
      if (error.code === 'P2002') {
        console.log(`Duplicate webhook received for SePay transaction ID: ${sepayId}. Skipping.`);
        return NextResponse.json({ success: true });
      }
      throw error;
    }

    // 3. Filter incoming transfers only
    if (transferType !== 'in') {
      await prisma.webhookLog.update({
        where: { id: logRecord.id },
        data: { status: 'processed' }, // Non-incoming transactions are skipped
      });
      return NextResponse.json({ success: true });
    }

    // 4. Extract transfer code from transaction description/content
    const transferCode = extractTransferCode(content);
    if (!transferCode) {
      await prisma.webhookLog.update({
        where: { id: logRecord.id },
        data: { status: 'unmatched' },
      });
      notifyUnmatchedWebhook(payload);
      return NextResponse.json({ success: true });
    }

    // 5. Match Order
    const order = await prisma.order.findUnique({
      where: { transferCode },
      include: {
        user: true,
        items: true,
      },
    });

    if (!order) {
      await prisma.webhookLog.update({
        where: { id: logRecord.id },
        data: { status: 'unmatched' },
      });
      notifyUnmatchedWebhook(payload);
      return NextResponse.json({ success: true });
    }

    // Idempotency: If already completed
    if (order.status === 'completed') {
      await prisma.webhookLog.update({
        where: { id: logRecord.id },
        data: { status: 'processed', matchedOrderId: order.id },
      });
      return NextResponse.json({ success: true });
    }

    // 6. Verify Amount
    const amountPaid = Number(transferAmount);
    if (amountPaid < order.totalAmount) {
      await prisma.webhookLog.update({
        where: { id: logRecord.id },
        data: { status: 'amount_mismatch', matchedOrderId: order.id },
      });
      notifyAmountMismatch(order, payload);
      return NextResponse.json({ success: true });
    }

    // 7. Successful payment: Update Order, User's totalSpent, and WebhookLog in transaction
    await prisma.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
        },
      });

      // Update user total spent (accumulated for loyalty tiers)
      await tx.user.update({
        where: { id: order.userId },
        data: {
          totalSpent: {
            increment: order.totalAmount,
          },
        },
      });

      // Update webhook log status
      await tx.webhookLog.update({
        where: { id: logRecord.id },
        data: {
          status: 'processed',
          matchedOrderId: order.id,
          processedAt: new Date(),
        },
      });
    });

    // 8. Notifications & Email send (non-blocking)
    notifyNewPayment(order);

    if (order.shippingEmail) {
      sendOrderConfirmation({
        transferCode: order.transferCode,
        totalAmount: order.totalAmount,
        shippingName: order.shippingName,
        shippingAddress: order.shippingAddress,
        shippingPhone: order.shippingPhone,
        items: order.items,
      }, order.shippingEmail).catch(err => {
        console.error('Failed to send order confirmation email asynchronously:', err);
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error handling SePay webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
