import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

/**
 * Builds HTML & text for the Welcome / Account Registration Email.
 */
export function renderWelcomeEmail(name: string): { html: string; text: string } {
  const displayName = name || 'bạn';

  const content = `
    <!-- Hero Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center" style="background-color: ${emailTokens.colors.accentLight}; padding: 28px 20px; border-radius: 8px; border: 1px solid #D4E2DA;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <div style="font-size: 36px; margin-bottom: 10px;">🌸</div>
                <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 22px; font-weight: 600; color: ${emailTokens.colors.accent}; margin: 0 0 6px 0;">
                  Chào mừng bạn đến với Alma Dungduong
                </h1>
                <p style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.textMuted}; margin: 0;">
                  Hành trình tìm lại vẻ đẹp nguyên bản của làn da
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="${commonStyles.paragraph}">
      Chào <strong>${displayName}</strong>,
    </p>
    <p style="${commonStyles.paragraph}">
      Chúc mừng bạn đã đăng ký tài khoản thành công tại <strong>Alma Dungduong</strong>. Chúng tôi rất vinh hạnh được đồng hành cùng bạn trong hành trình chăm sóc và nuôi dưỡng hệ vi sinh làn da khỏe mạnh.
    </p>

    <!-- Member Benefits List -->
    <div style="background-color: ${emailTokens.colors.surface}; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 22px 24px; margin: 24px 0;">
      <h3 style="font-family: ${emailTokens.fonts.serif}; font-size: 16px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 14px 0;">
        🎁 Đặc quyền thành viên của bạn:
      </h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 6px 0; vertical-align: top; width: 24px; font-size: 14px;">💧</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.text}; padding: 6px 0;">
            <strong>Tích giọt điểm thưởng:</strong> Tích lũy giọt thưởng sau mỗi đơn hàng để thăng hạng thành viên và đổi quà.
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; vertical-align: top; font-size: 14px;">🤍</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.text}; padding: 6px 0;">
            <strong>Danh sách yêu thích:</strong> Lưu giữ các sản phẩm phù hợp với nhu cầu và làn da của bạn.
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; vertical-align: top; font-size: 14px;">✨</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.text}; padding: 6px 0;">
            <strong>Tư vấn da chuyên sâu 1:1:</strong> Đội ngũ chuyên viên sẵn sàng hỗ trợ bạn xây dựng routine vi sinh phù hợp.
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 12px 0;">
      <tr>
        <td align="center">
          <a href="https://almadungduong.vn/san-pham" target="_blank" style="${commonStyles.buttonPrimary}">
            Khám phá Sản Phẩm Vi Sinh →
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderEmailLayout({
    title: '[Alma Dungduong] Đăng ký tài khoản thành công',
    previewText: `Chào mừng ${displayName} đến với Alma Dungduong - Mỹ phẩm Vi sinh Hoa Ngân. Khám phá các ưu đãi dành riêng cho bạn.`,
    content,
  });

  const text = `
Chào ${displayName},

Chào mừng bạn đã đăng ký tài khoản thành công tại Alma Dungduong!

Từ nay bạn có thể dễ dàng quản lý thông tin tài khoản, lưu các sản phẩm yêu thích và tích luỹ giọt điểm thành viên khi mua sắm.

Đặc quyền thành viên của bạn:
- Tích giọt điểm thưởng sau mỗi đơn hàng
- Lưu sản phẩm yêu thích và lịch sử mua sắm tiện lợi
- Được tư vấn chuyên sâu về routine chăm sóc da vi sinh bản địa 1:1

Khám phá các sản phẩm tại: https://almadungduong.vn/san-pham
Quản lý tài khoản: https://almadungduong.vn/tai-khoan

Cảm ơn bạn đã đồng hành cùng Alma Dungduong!
  `.trim();

  return { html, text };
}
