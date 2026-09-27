import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

export interface AdminOrderAlertData {
  id: string;
  transferCode: string;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
  claimedAt?: Date | string | null;
}

/**
 * Builds HTML & text for Admin Payment Alert Email.
 */
export function renderAdminPaymentAlertEmail(order: AdminOrderAlertData): { html: string; text: string } {
  const formattedTotal = order.totalAmount.toLocaleString('vi-VN');
  const nowFormatted = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const content = `
    <div style="background-color: ${emailTokens.colors.accentLight}; padding: 18px 20px; border-radius: 8px; border: 1px solid #D4E2DA; margin-bottom: 20px;">
      <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 18px; font-weight: 700; color: ${emailTokens.colors.accent}; margin: 0 0 4px 0;">
        ⚡ [ADMIN ALERT] ĐƠN HÀNG MỚI ĐÃ THANH TOÁN
      </h1>
      <p style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; margin: 0;">
        Hệ thống tự động ghi nhận thanh toán SePay thành công
      </p>
    </div>

    <div style="background-color: #FFFFFF; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0; width: 140px;">Mã chuyển khoản:</td>
          <td style="font-family: ${emailTokens.fonts.mono}; font-size: 15px; font-weight: 700; color: ${emailTokens.colors.accent}; padding: 6px 0;">#${order.transferCode}</td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">Số tiền thanh toán:</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 16px; font-weight: 700; color: ${emailTokens.colors.text}; padding: 6px 0;">${formattedTotal}đ</td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">Khách hàng:</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; font-weight: 600; color: ${emailTokens.colors.text}; padding: 6px 0;">${order.shippingName} (${order.shippingPhone})</td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">Thời gian:</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">${nowFormatted}</td>
        </tr>
      </table>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <a href="https://almadungduong.vn/admin/orders" target="_blank" style="${commonStyles.buttonPrimary}">
            Mở Trang Quản Lý Đơn Hàng →
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderEmailLayout({
    title: `[Alma Admin] Thanh toán đơn hàng #${order.transferCode} thành công`,
    previewText: `Đơn hàng #${order.transferCode} (${formattedTotal}đ) từ khách hàng ${order.shippingName} đã thanh toán thành công.`,
    content,
  });

  const text = `
[ADMIN ALERT] THANH TOÁN MỚI THÀNH CÔNG

- Đơn hàng ID: ${order.id}
- Mã chuyển khoản: ${order.transferCode}
- Khách hàng: ${order.shippingName} (${order.shippingPhone})
- Số tiền: ${formattedTotal}đ
- Thời gian: ${nowFormatted}

Truy cập quản lý: https://almadungduong.vn/admin/orders
  `.trim();

  return { html, text };
}

/**
 * Builds HTML & text for Admin Manual Claim Alert Email.
 */
export function renderAdminClaimAlertEmail(order: AdminOrderAlertData): { html: string; text: string } {
  const formattedTotal = order.totalAmount.toLocaleString('vi-VN');
  const formattedClaimedAt = order.claimedAt
    ? new Date(order.claimedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    : new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const content = `
    <div style="background-color: ${emailTokens.colors.statusPendingBg}; padding: 18px 20px; border-radius: 8px; border: 1px solid #FCD34D; margin-bottom: 20px;">
      <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 18px; font-weight: 700; color: #92400E; margin: 0 0 4px 0;">
        ⚠️ [ADMIN ALERT] YÊU CẦU XÁC MINH GIAO DỊCH THỦ CÔNG
      </h1>
      <p style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: #B45309; margin: 0;">
        Khách hàng gửi yêu cầu đối soát thanh toán chuyển khoản
      </p>
    </div>

    <div style="background-color: #FFFFFF; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0; width: 140px;">Mã chuyển khoản:</td>
          <td style="font-family: ${emailTokens.fonts.mono}; font-size: 15px; font-weight: 700; color: ${emailTokens.colors.accent}; padding: 6px 0;">#${order.transferCode}</td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">Số tiền đơn:</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 16px; font-weight: 700; color: ${emailTokens.colors.text}; padding: 6px 0;">${formattedTotal}đ</td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">Khách hàng:</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; font-weight: 600; color: ${emailTokens.colors.text}; padding: 6px 0;">${order.shippingName} (${order.shippingPhone})</td>
        </tr>
        <tr>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">Thời gian gửi:</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; padding: 6px 0;">${formattedClaimedAt}</td>
        </tr>
      </table>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <a href="https://almadungduong.vn/admin/orders" target="_blank" style="${commonStyles.buttonPrimary}">
            Kiểm Tra & Đối Soát Đơn Hàng →
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderEmailLayout({
    title: `[Alma Admin] Yêu cầu xác minh thủ công #${order.transferCode}`,
    previewText: `Yêu cầu xác minh giao dịch #${order.transferCode} (${formattedTotal}đ) từ ${order.shippingName}.`,
    content,
  });

  const text = `
[ADMIN ALERT] YÊU CẦU XÁC MINH GIAO DỊCH THỦ CÔNG

- Đơn hàng ID: ${order.id}
- Mã chuyển khoản: ${order.transferCode}
- Khách hàng: ${order.shippingName} (${order.shippingPhone})
- Số tiền: ${formattedTotal}đ
- Thời gian yêu cầu: ${formattedClaimedAt}

Truy cập quản lý: https://almadungduong.vn/admin/orders
  `.trim();

  return { html, text };
}
