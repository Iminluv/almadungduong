import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

interface OrderEmailData {
  transferCode: string;
  totalAmount: number;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  items: Array<{
    title: string;
    price: number;
    quantity: number;
    variant?: string | null;
  }>;
}

/**
 * Sends a stylized HTML email to verify successful transaction processing.
 */
export async function sendOrderConfirmation(order: OrderEmailData, toEmail: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email confirmation.");
    return null;
  }

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
          <div style="font-weight: 600; color: #333;">${item.title}</div>
          ${item.variant ? `<div style="font-size: 12px; color: #666;">Phân loại: ${item.variant}</div>` : ''}
        </td>
        <td style="padding: 12px 0; text-align: center; border-bottom: 1px solid #eee; color: #666;">
          x${item.quantity}
        </td>
        <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">
          ${(item.price * item.quantity).toLocaleString('vi-VN')}đ
        </td>
      </tr>
    `
    )
    .join('');

  const html = `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #1a1a1a; margin-bottom: 24px; border-bottom: 2px solid #eaeaea; padding-bottom: 12px;">Cảm ơn bạn đã mua sắm tại Alma Dungduong!</h2>
      <p style="font-size: 16px; color: #333;">Đơn hàng <strong>#${order.transferCode}</strong> đã được thanh toán thành công và đang được xử lý.</p>
      
      <h3 style="color: #4a4a4a; margin-top: 24px;">Thông tin đơn hàng</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #eaeaea;">
            <th style="text-align: left; padding-bottom: 8px; color: #666;">Sản phẩm</th>
            <th style="text-align: center; padding-bottom: 8px; color: #666;">Số lượng</th>
            <th style="text-align: right; padding-bottom: 8px; color: #666;">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <div style="margin-top: 20px; text-align: right;">
        <span style="font-size: 16px; color: #666;">Tổng cộng:</span>
        <span style="font-size: 20px; font-weight: 700; color: #000; margin-left: 12px;">${order.totalAmount.toLocaleString('vi-VN')}đ</span>
      </div>

      <div style="margin-top: 32px; padding: 16px; background-color: #f9f9f9; border-radius: 6px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">Địa chỉ giao hàng</h4>
        <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">
          <strong>Người nhận:</strong> ${order.shippingName}<br />
          <strong>Số điện thoại:</strong> ${order.shippingPhone}<br />
          <strong>Địa chỉ:</strong> ${order.shippingAddress}
        </p>
      </div>

      <p style="margin-top: 32px; font-size: 12px; color: #999; text-align: center;">
        Đây là email tự động. Vui lòng không phản hồi email này. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ khách hàng.
      </p>
    </div>
  `;

  try {
    // Note: By default, Resend onboarding API key only sends to the email used to sign up (or verified domain).
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Alma Dungduong <onboarding@resend.dev>';
    const data = await resend.emails.send({
      from: fromAddress,
      to: toEmail,
      subject: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} thành công`,
      html: html,
    });
    return data;
  } catch (error) {
    console.error("Error sending order confirmation email via Resend:", error);
    return null;
  }
}
