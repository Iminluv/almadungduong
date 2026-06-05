/**
 * Notification helper for payment alerts and system logging.
 * Prepped for Telegram or other notification channels.
 */

interface SimpleOrder {
  id: string;
  transferCode: string;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
}

export function notifyNewPayment(order: SimpleOrder) {
  console.log(`[PAYMENT SUCCESS] Order ID: ${order.id} | Code: ${order.transferCode} | Amount: ${order.totalAmount} VND | Customer: ${order.shippingName} (${order.shippingPhone})`);
}

export function notifyUnmatchedWebhook(payload: any) {
  console.warn(`[PAYMENT WARNING] Unmatched SePay Webhook! Payload description: "${payload?.description}" | Amount: ${payload?.transferAmount} | Code found: ${payload?.code || 'None'}`);
}

export function notifyAmountMismatch(order: SimpleOrder, payload: any) {
  console.warn(`[PAYMENT WARNING] Amount mismatch! Order: ${order.id} expects ${order.totalAmount} VND. SePay received ${payload?.transferAmount} VND. Code: ${order.transferCode}`);
}

export function notifyManualClaim(order: SimpleOrder) {
  console.log(`[PAYMENT MANUAL CLAIM] User claimed payment. Order ID: ${order.id} | Code: ${order.transferCode} | Customer: ${order.shippingName} (${order.shippingPhone})`);
}
