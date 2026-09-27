import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

export interface OrderPendingItem {
  title: string;
  price: number;
  quantity: number;
  variant?: string | null;
}

export interface OrderPendingData {
  transferCode: string;
  totalAmount: number;
  bankName: string;
  bankAccount: string;
  accountName: string;
  expiresAt: Date | string;
  shippingName: string;
  items: OrderPendingItem[];
}

/**
 * Builds HTML & text for the Order Pending Payment Email.
 */
export function renderOrderPendingEmail(order: OrderPendingData): { html: string; text: string } {
  const formattedTotal = order.totalAmount.toLocaleString('vi-VN');
  const formattedExpiry = new Date(order.expiresAt).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const itemsRows = order.items
    .map((item, index) => {
      const isLast = index === order.items.length - 1;
      const borderBottom = isLast ? 'none' : `1px solid ${emailTokens.colors.borderLight}`;
      const itemSubtotal = (item.price * item.quantity).toLocaleString('vi-VN');

      return `
      <tr>
        <td style="padding: 12px 0; border-bottom: ${borderBottom}; vertical-align: top;">
          <div style="font-family: ${emailTokens.fonts.sans}; font-weight: 600; font-size: 14px; color: ${emailTokens.colors.text};">
            ${item.title}
          </div>
          ${
            item.variant
              ? `<div style="font-family: ${emailTokens.fonts.sans}; font-size: 12px; color: ${emailTokens.colors.textMuted}; margin-top: 2px;">
                  Phân loại: <span style="color: ${emailTokens.colors.text}; font-weight: 500;">${item.variant}</span>
                </div>`
              : ''
          }
          <div style="font-family: ${emailTokens.fonts.sans}; font-size: 12px; color: ${emailTokens.colors.textMuted}; margin-top: 2px;">
            ${item.price.toLocaleString('vi-VN')}đ × ${item.quantity}
          </div>
        </td>
        <td align="right" style="padding: 12px 0; border-bottom: ${borderBottom}; vertical-align: top; font-family: ${emailTokens.fonts.sans}; font-weight: 600; font-size: 14px; color: ${emailTokens.colors.text}; white-space: nowrap;">
          ${itemSubtotal}đ
        </td>
      </tr>
    `;
    })
    .join('');

  const content = `
    <!-- Status Hero Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center" style="background-color: ${emailTokens.colors.statusPendingBg}; padding: 22px 20px; border-radius: 8px; border: 1px solid #FCD34D;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <!-- Clock Icon badge -->
                <div style="width: 40px; height: 40px; line-height: 40px; background-color: ${emailTokens.colors.statusPending}; border-radius: 50%; color: #FFFFFF; font-size: 18px; font-weight: bold; margin-bottom: 10px; text-align: center;">
                  ⏳
                </div>
                <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 20px; font-weight: 600; color: #92400E; margin: 0 0 6px 0;">
                  Đơn Hàng Đang Chờ Thanh Toán
                </h1>
                <p style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: #B45309; margin: 0;">
                  Mã đơn hàng: <strong style="color: #78350F; font-family: ${emailTokens.fonts.mono}; font-size: 14px;">#${order.transferCode}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="${commonStyles.paragraph}">
      Chào <strong>${order.shippingName}</strong>,
    </p>
    <p style="${commonStyles.paragraph}; color: ${emailTokens.colors.textMuted};">
      Đơn hàng của bạn đã được khởi tạo thành công. Vui lòng hoàn tất chuyển khoản theo thông tin dưới đây để đơn hàng được xử lý và giao sớm nhất.
    </p>

    <!-- Bank Transfer Instructions Box -->
    <div style="background-color: ${emailTokens.colors.surface}; border: 2px solid ${emailTokens.colors.accent}; border-radius: 8px; padding: 22px 24px; margin: 24px 0;">
      <h2 style="font-family: ${emailTokens.fonts.serif}; font-size: 16px; font-weight: 700; color: ${emailTokens.colors.accent}; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.04em;">
        💳 Thông Tin Chuyển Khoản Ngân Hàng
      </h2>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0; width: 130px;">
            Ngân hàng:
          </td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; font-weight: 700; color: ${emailTokens.colors.text}; padding: 6px 0;">
            ${order.bankName}
          </td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">
            Số tài khoản:
          </td>
          <td style="font-family: ${emailTokens.fonts.mono}; font-size: 16px; font-weight: 700; color: ${emailTokens.colors.accent}; padding: 6px 0; letter-spacing: 0.05em;">
            ${order.bankAccount}
          </td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">
            Chủ tài khoản:
          </td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; font-weight: 700; color: ${emailTokens.colors.text}; padding: 6px 0; text-transform: uppercase;">
            ${order.accountName}
          </td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">
            Số tiền:
          </td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 17px; font-weight: 700; color: #DC2626; padding: 6px 0;">
            ${formattedTotal}đ
          </td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">
            Nội dung CK:
          </td>
          <td style="font-family: ${emailTokens.fonts.mono}; font-size: 15px; font-weight: 700; color: ${emailTokens.colors.accent}; padding: 6px 0; background-color: #FFFFFF; display: inline-block; padding: 4px 10px; border-radius: 4px; border: 1px dashed ${emailTokens.colors.accent};">
            ${order.transferCode}
          </td>
        </tr>
      </table>

      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid ${emailTokens.colors.border}; font-family: ${emailTokens.fonts.sans}; font-size: 12px; color: #92400E; line-height: 1.5;">
        ⚠️ <strong>Lưu ý quan trọng:</strong> Vui lòng nhập chính xác <strong>Số tiền</strong> và <strong>Nội dung chuyển khoản</strong> để hệ thống tự động kích hoạt đơn hàng trong 1-3 phút.
        <br />Hạn thanh toán: <strong>${formattedExpiry}</strong>.
      </div>
    </div>

    <!-- Product Summary Card -->
    <div style="border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; background-color: #FFFFFF;">
      <h3 style="font-family: ${emailTokens.fonts.serif}; font-size: 15px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 10px 0; border-bottom: 1px solid ${emailTokens.colors.borderLight}; padding-bottom: 8px;">
        Sản phẩm đặt mua
      </h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${itemsRows}
      </table>
    </div>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0 12px 0;">
      <tr>
        <td align="center">
          <a href="https://almadungduong.vn/thanh-toan" target="_blank" style="${commonStyles.buttonPrimary}">
            Quét mã QR Thanh toán Ngay →
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderEmailLayout({
    title: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} đang chờ thanh toán`,
    previewText: `Đơn hàng #${order.transferCode} đang chờ chuyển khoản số tiền ${formattedTotal}đ. Hạn thanh toán đến ${formattedExpiry}.`,
    content,
  });

  const textItems = order.items
    .map(
      (item) =>
        `- ${item.title}${item.variant ? ` (${item.variant})` : ''} x${item.quantity} = ${(
          item.price * item.quantity
        ).toLocaleString('vi-VN')}đ`
    )
    .join('\n');

  const text = `
Chào ${order.shippingName},

Đơn hàng #${order.transferCode} của bạn tại Alma Dungduong đã được khởi tạo và đang chờ thanh toán.

THÔNG TIN CHUYỂN KHOẢN:
- Ngân hàng: ${order.bankName}
- Số tài khoản: ${order.bankAccount}
- Chủ tài khoản: ${order.accountName}
- Số tiền: ${formattedTotal}đ
- Nội dung chuyển khoản: ${order.transferCode}
- Hạn thanh toán: ${formattedExpiry}

DANH SÁCH SẢN PHẨM:
${textItems}

Tổng thanh toán: ${formattedTotal}đ

Vui lòng chuyển khoản chính xác số tiền và nội dung chuyển khoản để hệ thống tự động duyệt đơn.
Bạn cũng có thể mở trang thanh toán để quét mã QR: https://almadungduong.vn/thanh-toan

Cảm ơn bạn đã lựa chọn Alma Dungduong!
  `.trim();

  return { html, text };
}
