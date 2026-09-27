import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

export interface OrderConfirmationItem {
  title: string;
  price: number;
  quantity: number;
  variant?: string | null;
}

export interface OrderConfirmationData {
  transferCode: string;
  totalAmount: number;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  items: OrderConfirmationItem[];
}

/**
 * Builds HTML for the Order Confirmation Email.
 */
export function renderOrderConfirmationEmail(order: OrderConfirmationData): { html: string; text: string } {
  const formattedTotal = order.totalAmount.toLocaleString('vi-VN');

  const itemsRows = order.items
    .map((item, index) => {
      const isLast = index === order.items.length - 1;
      const borderBottom = isLast ? 'none' : `1px solid ${emailTokens.colors.borderLight}`;
      const itemSubtotal = (item.price * item.quantity).toLocaleString('vi-VN');

      return `
      <tr>
        <td style="padding: 14px 0; border-bottom: ${borderBottom}; vertical-align: top;">
          <div style="font-family: ${emailTokens.fonts.sans}; font-weight: 600; font-size: 14px; color: ${emailTokens.colors.text}; line-height: 1.4;">
            ${item.title}
          </div>
          ${
            item.variant
              ? `<div style="font-family: ${emailTokens.fonts.sans}; font-size: 12px; color: ${emailTokens.colors.textMuted}; margin-top: 3px;">
                  Phân loại: <span style="color: ${emailTokens.colors.text}; font-weight: 500;">${item.variant}</span>
                </div>`
              : ''
          }
          <div style="font-family: ${emailTokens.fonts.sans}; font-size: 12px; color: ${emailTokens.colors.textMuted}; margin-top: 2px;">
            ${item.price.toLocaleString('vi-VN')}đ × ${item.quantity}
          </div>
        </td>
        <td align="right" style="padding: 14px 0; border-bottom: ${borderBottom}; vertical-align: top; font-family: ${emailTokens.fonts.sans}; font-weight: 600; font-size: 14px; color: ${emailTokens.colors.text}; white-space: nowrap;">
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
        <td align="center" style="background-color: ${emailTokens.colors.accentLight}; padding: 24px 20px; border-radius: 8px; border: 1px solid #D4E2DA;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <!-- Checkmark Icon badge -->
                <div style="width: 44px; height: 44px; line-height: 44px; background-color: ${emailTokens.colors.accent}; border-radius: 50%; color: #FFFFFF; font-size: 20px; font-weight: bold; margin-bottom: 12px; text-align: center;">
                  ✓
                </div>
                <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 22px; font-weight: 600; color: ${emailTokens.colors.accent}; margin: 0 0 6px 0; letter-spacing: -0.01em;">
                  Xác Nhận Đơn Hàng Thành Công
                </h1>
                <p style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.textMuted}; margin: 0;">
                  Mã đơn hàng: <strong style="color: ${emailTokens.colors.text}; font-family: ${emailTokens.fonts.mono}; font-size: 15px;">#${order.transferCode}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Greeting & Intro -->
    <p style="${commonStyles.paragraph}">
      Chào <strong>${order.shippingName}</strong>,
    </p>
    <p style="${commonStyles.paragraph}; color: ${emailTokens.colors.textMuted};">
      Cảm ơn bạn đã tin tưởng lựa chọn <strong style="color: ${emailTokens.colors.accent};">Alma Dungduong</strong>! Đơn hàng của bạn đã được thanh toán thành công và chúng tôi đang tiến hành đóng gói để giao đến bạn sớm nhất.
    </p>

    <!-- Order Items Card -->
    <div style="margin-top: 24px; margin-bottom: 24px; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 20px 24px; background-color: #FFFFFF;">
      <h2 style="font-family: ${emailTokens.fonts.serif}; font-size: 16px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 12px 0; border-bottom: 1px solid ${emailTokens.colors.borderLight}; padding-bottom: 10px;">
        Chi tiết sản phẩm
      </h2>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${itemsRows}
      </table>

      <!-- Order Total Summary -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px; border-top: 1px dashed ${emailTokens.colors.border}; padding-top: 14px;">
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.textMuted}; padding: 4px 0;">
            Phí vận chuyển:
          </td>
          <td align="right" style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.accent}; font-weight: 500; padding: 4px 0;">
            Miễn phí (Free Ship)
          </td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 15px; font-weight: 600; color: ${emailTokens.colors.text}; padding: 8px 0 0 0;">
            Tổng tiền thanh toán:
          </td>
          <td align="right" style="font-family: ${emailTokens.fonts.sans}; font-size: 18px; font-weight: 700; color: ${emailTokens.colors.accent}; padding: 8px 0 0 0;">
            ${formattedTotal}đ
          </td>
        </tr>
      </table>
    </div>

    <!-- Shipping Info Card -->
    <div style="background-color: ${emailTokens.colors.surface}; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px;">
      <h3 style="font-family: ${emailTokens.fonts.serif}; font-size: 15px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 10px 0;">
        📍 Địa chỉ nhận hàng
      </h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; line-height: 1.6; color: ${emailTokens.colors.text};">
            <strong>Người nhận:</strong> ${order.shippingName}<br />
            <strong>Số điện thoại:</strong> ${order.shippingPhone}<br />
            <strong>Địa chỉ:</strong> ${order.shippingAddress}
          </td>
        </tr>
      </table>
    </div>

    <!-- Action Callout & Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 12px 0;">
      <tr>
        <td align="center">
          <a href="https://almadungduong.vn/tai-khoan" target="_blank" style="${commonStyles.buttonPrimary}">
            Xem đơn hàng tại Tài khoản →
          </a>
          <p style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; margin: 12px 0 0 0;">
            Đội ngũ chuyên viên sẽ liên hệ với bạn trong trường hợp cần hỗ trợ thêm thông tin.
          </p>
        </td>
      </tr>
    </table>
  `;

  const html = renderEmailLayout({
    title: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} thành công`,
    previewText: `Đơn hàng #${order.transferCode} của bạn đã được thanh toán thành công với tổng số tiền ${formattedTotal}đ.`,
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

Đơn hàng #${order.transferCode} của bạn tại Alma Dungduong đã được thanh toán thành công và đang được xử lý!

CHI TIẾT ĐƠN HÀNG:
${textItems}

Tổng thanh toán: ${formattedTotal}đ

ĐỊA CHỈ NHẬN HÀNG:
Người nhận: ${order.shippingName}
Số điện thoại: ${order.shippingPhone}
Địa chỉ: ${order.shippingAddress}

Bạn có thể theo dõi đơn hàng tại: https://almadungduong.vn/tai-khoan

Cảm ơn bạn đã lựa chọn Alma Dungduong - Mỹ phẩm Vi sinh Hoa Ngân!
Hotline/Email hỗ trợ: cskh@almadungduong.com
  `.trim();

  return { html, text };
}
