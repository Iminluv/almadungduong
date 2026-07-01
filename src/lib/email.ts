import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

const fromAddress = process.env.RESEND_FROM_EMAIL || 'Alma Dungduong <onboarding@resend.dev>';
const adminAddress = process.env.ADMIN_EMAIL;

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

interface OrderPendingEmailData {
  transferCode: string;
  totalAmount: number;
  bankName: string;
  bankAccount: string;
  accountName: string;
  expiresAt: Date | string;
  shippingName: string;
  items: Array<{
    title: string;
    price: number;
    quantity: number;
    variant?: string | null;
  }>;
}

interface AdminOrderAlertData {
  id: string;
  transferCode: string;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
  claimedAt?: Date | string | null;
}

/**
 * Shared helper to send email via Resend
 */
async function sendEmail(opts: { to: string; subject: string; text?: string; html?: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set. Skipping email sending.");
    return null;
  }
  try {
    const data = await resend.emails.send({
      from: fromAddress,
      ...opts,
    } as any);
    return data;
  } catch (error) {
    console.error(`Error sending email to ${opts.to}:`, error);
    return null;
  }
}

/**
 * Sends a welcome email to a newly registered user (Plain Text)
 */
export async function sendWelcomeEmail(toEmail: string, name: string) {
  const text = `Chào ${name || 'bạn'},

Chào mừng bạn đã đăng ký tài khoản thành công tại Alma Dungduong!
Từ nay bạn có thể dễ dàng quản lý thông tin tài khoản, lưu các sản phẩm yêu thích và tích điểm thành viên khi mua sắm.

Cảm ơn bạn đã đồng hành cùng Alma Dungduong!`;

  return sendEmail({
    to: toEmail,
    subject: '[Alma Dungduong] Đăng ký tài khoản thành công',
    text,
  });
}

/**
 * Sends an email when order is created and waiting for bank transfer (Plain Text)
 */
export async function sendOrderPendingEmail(toEmail: string, order: OrderPendingEmailData) {
  const itemsText = order.items
    .map(
      (item) =>
        `- ${item.title}${item.variant ? ` (${item.variant})` : ''} x${item.quantity} - ${(
          item.price * item.quantity
        ).toLocaleString('vi-VN')}đ`
    )
    .join('\n');

  const formattedExpiry = new Date(order.expiresAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  const text = `Chào ${order.shippingName},

Đơn hàng #${order.transferCode} của bạn đã được khởi tạo thành công và đang chờ thanh toán.

Thông tin thanh toán chuyển khoản ngân hàng:
- Ngân hàng: ${order.bankName}
- Số tài khoản: ${order.bankAccount}
- Chủ tài khoản: ${order.accountName}
- Số tiền: ${order.totalAmount.toLocaleString('vi-VN')}đ
- Nội dung chuyển khoản: ${order.transferCode}

* Vui lòng chuyển khoản chính xác số tiền và nội dung ở trên. Bạn có thể quét mã QR hiển thị tại trang thanh toán để thực hiện nhanh chóng.
* Mã thanh toán này sẽ hết hạn vào lúc: ${formattedExpiry}

Danh sách sản phẩm:
${itemsText}

Tổng tiền thanh toán: ${order.totalAmount.toLocaleString('vi-VN')}đ

Cảm ơn bạn đã mua sắm tại Alma Dungduong!`;

  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} đang chờ thanh toán`,
    text,
  });
}

/**
 * Sends a stylized HTML email to verify successful transaction processing.
 */
export async function sendOrderConfirmation(order: OrderEmailData, toEmail: string) {
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

  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} thành công`,
    html,
  });
}

/**
 * Sends email when customer claims transfer verifying manually (Plain Text)
 */
export async function sendClaimReceivedEmail(toEmail: string, transferCode: string) {
  const text = `Xin chào,

Chúng tôi đã nhận được yêu cầu xác minh thanh toán thủ công của bạn cho đơn hàng #${transferCode}.
Đội ngũ hỗ trợ của Alma Dungduong sẽ tiến hành đối soát và xử lý trong vòng 1 giờ làm việc. Bạn sẽ nhận được email xác nhận ngay khi đơn hàng được duyệt hoàn tất.

Cảm ơn sự kiên nhẫn của bạn!`;

  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Nhận yêu cầu xác minh giao dịch thủ công #${transferCode}`,
    text,
  });
}

/**
 * Sends a password reset request email (Plain Text)
 */
export async function sendPasswordResetEmail(toEmail: string, resetUrl: string) {
  const text = `Xin chào,

Bạn nhận được email này vì có yêu cầu đặt lại mật khẩu cho tài khoản tại Alma Dungduong.
Vui lòng nhấn vào liên kết dưới đây để tiến hành đặt lại mật khẩu mới cho tài khoản của bạn:

${resetUrl}

Liên kết này chỉ có hiệu lực trong vòng 1 giờ kể từ thời điểm yêu cầu được gửi. Nếu bạn không yêu cầu đặt lại mật khẩu này, bạn có thể an tâm bỏ qua email này.

Alma Dungduong Support Team`;

  return sendEmail({
    to: toEmail,
    subject: '[Alma Dungduong] Yêu cầu đặt lại mật khẩu tài khoản',
    text,
  });
}

/**
 * Sends email when user is upgraded to a higher loyalty tier (Plain Text)
 */
export async function sendLoyaltyTierUpgradeEmail(toEmail: string, name: string, tierName: string) {
  const text = `Chúc mừng ${name || 'bạn'},

Alma Dungduong xin thông báo tài khoản của bạn đã được nâng cấp lên hạng thành viên mới: ${tierName}!
Cảm ơn bạn đã luôn tin tưởng và đồng hành cùng Alma Dungduong trong hành trình dung dưỡng làn da khỏe đẹp. Bạn có thể kiểm tra các quyền lợi và ưu đãi mới của mình ngay tại trang cá nhân.

Trân trọng,
Đội ngũ Alma Dungduong`;

  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Nâng cấp hạng thành viên thành công: ${tierName}`,
    text,
  });
}

/**
 * Send payment notification to Admin email if configured (Plain Text)
 */
export async function sendAdminPaymentAlert(order: AdminOrderAlertData) {
  if (!adminAddress) return null;

  const text = `[ADMIN ALERT] THANH TOÁN MỚI THÀNH CÔNG

- Đơn hàng ID: ${order.id}
- Mã chuyển khoản: ${order.transferCode}
- Khách hàng: ${order.shippingName} (${order.shippingPhone})
- Số tiền: ${order.totalAmount.toLocaleString('vi-VN')}đ
- Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`;

  return sendEmail({
    to: adminAddress,
    subject: `[Alma Admin] Thanh toán đơn hàng #${order.transferCode} thành công`,
    text,
  });
}

/**
 * Send manual claim notification to Admin email if configured (Plain Text)
 */
export async function sendAdminClaimAlert(order: AdminOrderAlertData) {
  if (!adminAddress) return null;

  const formattedClaimedAt = order.claimedAt
    ? new Date(order.claimedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    : 'N/A';

  const text = `[ADMIN ALERT] YÊU CẦU XÁC MINH GIAO DỊCH THỦ CÔNG

- Đơn hàng ID: ${order.id}
- Mã chuyển khoản: ${order.transferCode}
- Khách hàng: ${order.shippingName} (${order.shippingPhone})
- Số tiền: ${order.totalAmount.toLocaleString('vi-VN')}đ
- Thời gian yêu cầu: ${formattedClaimedAt}`;

  return sendEmail({
    to: adminAddress,
    subject: `[Alma Admin] Yêu cầu xác minh thủ công #${order.transferCode}`,
    text,
  });
}
