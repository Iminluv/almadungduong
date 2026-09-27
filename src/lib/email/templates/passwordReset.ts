import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

/**
 * Builds HTML & text for the Password Reset Email.
 */
export function renderPasswordResetEmail(resetUrl: string): { html: string; text: string } {
  const content = `
    <!-- Security Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center" style="background-color: ${emailTokens.colors.surface}; padding: 24px 20px; border-radius: 8px; border: 1px solid ${emailTokens.colors.border};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <div style="font-size: 32px; margin-bottom: 8px;">🔐</div>
                <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 20px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 4px 0;">
                  Yêu Cầu Đặt Lại Mật Khẩu
                </h1>
                <p style="font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: ${emailTokens.colors.textMuted}; margin: 0;">
                  Bảo mật tài khoản Alma Dungduong
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
      Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại <strong>Alma Dungduong</strong>. Vui lòng bấm vào nút bên dưới để tạo mật khẩu mới:
    </p>

    <!-- Reset Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0;">
      <tr>
        <td align="center">
          <a href="${resetUrl}" target="_blank" style="${commonStyles.buttonPrimary}">
            Đặt Lại Mật Khẩu Ngay →
          </a>
        </td>
      </tr>
    </table>

    <!-- Expiration & Security Notice -->
    <div style="background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 6px; padding: 14px 18px; margin: 20px 0; font-family: ${emailTokens.fonts.sans}; font-size: 13px; color: #92400E; line-height: 1.5;">
      ⏰ <strong>Lưu ý:</strong> Liên kết đặt lại mật khẩu này chỉ có hiệu lực trong vòng <strong>1 giờ</strong>.
      Nếu bạn không yêu cầu hành động này, vui lòng bỏ qua email và mật khẩu hiện tại của bạn vẫn an toàn.
    </div>

    <!-- Direct URL fallback -->
    <p style="${commonStyles.paragraphMuted}; font-size: 12px; margin-top: 24px; word-break: break-all;">
      Nếu nút bấm trên không hoạt động, bạn có thể sao chép liên kết sau và dán vào thanh địa chỉ trình duyệt:<br />
      <a href="${resetUrl}" style="color: ${emailTokens.colors.accent}; text-decoration: underline;">${resetUrl}</a>
    </p>
  `;

  const html = renderEmailLayout({
    title: '[Alma Dungduong] Yêu cầu đặt lại mật khẩu tài khoản',
    previewText: 'Hướng dẫn đặt lại mật khẩu tài khoản của bạn tại Alma Dungduong. Liên kết có hiệu lực trong 1 giờ.',
    content,
  });

  const text = `
Xin chào,

Bạn nhận được email này vì có yêu cầu đặt lại mật khẩu cho tài khoản tại Alma Dungduong.
Vui lòng nhấn vào liên kết dưới đây để tiến hành đặt lại mật khẩu mới cho tài khoản của bạn:

${resetUrl}

Liên kết này chỉ có hiệu lực trong vòng 1 giờ kể từ thời điểm yêu cầu được gửi. Nếu bạn không yêu cầu đặt lại mật khẩu này, bạn có thể an tâm bỏ qua email này.

Alma Dungduong Support Team
cskh@almadungduong.com
  `.trim();

  return { html, text };
}
