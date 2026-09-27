import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

/**
 * Builds HTML & text for the Manual Payment Claim Received Email.
 */
export function renderClaimReceivedEmail(transferCode: string): { html: string; text: string } {
  const content = `
    <!-- Header Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center" style="background-color: ${emailTokens.colors.surface}; padding: 24px 20px; border-radius: 8px; border: 1px solid ${emailTokens.colors.border};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <div style="font-size: 32px; margin-bottom: 8px;">📩</div>
                <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 20px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 4px 0;">
                  Đã Tiếp Nhận Yêu Cầu Xác Minh
                </h1>
                <p style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; margin: 0;">
                  Mã đơn hàng: <strong style="color: ${emailTokens.colors.text}; font-family: ${emailTokens.fonts.mono};">#${transferCode}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="${commonStyles.paragraph}">
      Xin chào,
    </p>
    <p style="${commonStyles.paragraph}">
      Chúng tôi đã nhận được thông tin xác nhận thanh toán chuyển khoản thủ công của bạn cho đơn hàng <strong style="font-family: ${emailTokens.fonts.mono}; color: ${emailTokens.colors.accent};">#${transferCode}</strong>.
    </p>

    <!-- Processing Commitment Box -->
    <div style="background-color: #FFFFFF; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 20px 24px; margin: 20px 0;">
      <h3 style="font-family: ${emailTokens.fonts.serif}; font-size: 15px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 8px 0;">
        ⏱️ Quy trình đối soát:
      </h3>
      <p style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; line-height: 1.6; color: ${emailTokens.colors.textMuted}; margin: 0;">
        Đội ngũ chăm sóc khách hàng của Alma Dungduong sẽ tiến hành kiểm tra giao dịch tài khoản trong vòng <strong>1 giờ làm việc</strong>. Ngay khi giao dịch được khớp lệnh, hệ thống sẽ tự động gửi email xác nhận và kích hoạt đơn hàng.
      </p>
    </div>

    <!-- Contact note -->
    <p style="${commonStyles.paragraphMuted}; font-size: 13px;">
      Nếu bạn cần hỗ trợ khẩn cấp, đừng ngần ngại liên hệ với chúng tôi qua hotline hoặc email <a href="mailto:cskh@almadungduong.com" style="color: ${emailTokens.colors.accent}; text-decoration: underline;">cskh@almadungduong.com</a>.
    </p>
  `;

  const html = renderEmailLayout({
    title: `[Alma Dungduong] Nhận yêu cầu xác minh giao dịch thủ công #${transferCode}`,
    previewText: `Chúng tôi đã nhận yêu cầu xác minh chuyển khoản cho đơn #${transferCode} và đang tiến hành xử lý trong vòng 1 giờ làm việc.`,
    content,
  });

  const text = `
Xin chào,

Chúng tôi đã nhận được yêu cầu xác minh thanh toán thủ công của bạn cho đơn hàng #${transferCode}.
Đội ngũ hỗ trợ của Alma Dungduong sẽ tiến hành đối soát và xử lý trong vòng 1 giờ làm việc. Bạn sẽ nhận được email xác nhận ngay khi đơn hàng được duyệt hoàn tất.

Cảm ơn sự kiên nhẫn của bạn!
Hotline & Email: cskh@almadungduong.com
  `.trim();

  return { html, text };
}
