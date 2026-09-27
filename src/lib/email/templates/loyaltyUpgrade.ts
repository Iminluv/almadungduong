import { emailTokens, commonStyles } from '../styles';
import { renderEmailLayout } from '../layout';

/**
 * Builds HTML & text for the Loyalty Tier Upgrade Email.
 */
export function renderLoyaltyUpgradeEmail(name: string, tierName: string): { html: string; text: string } {
  const displayName = name || 'bạn';

  const content = `
    <!-- Celebration Hero Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center" style="background-color: ${emailTokens.colors.goldLight}; padding: 30px 20px; border-radius: 8px; border: 1px solid #E8D7B5;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <div style="font-size: 38px; margin-bottom: 12px;">👑</div>
                <h1 style="font-family: ${emailTokens.fonts.serif}; font-size: 22px; font-weight: 700; color: #78350F; margin: 0 0 8px 0;">
                  Chúc Mừng Nâng Hạng Thành Viên!
                </h1>
                <div style="display: inline-block; background-color: #78350F; color: #FFF; padding: 6px 18px; border-radius: 20px; font-family: ${emailTokens.fonts.sans}; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
                  Hạng: ${tierName}
                </div>
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
      Alma Dungduong xin trân trọng thông báo tài khoản của bạn đã chính thức đạt mốc tích lũy và được nâng cấp lên hạng thành viên mới: <strong style="color: ${emailTokens.colors.accent};">${tierName}</strong>!
    </p>
    <p style="${commonStyles.paragraph}; color: ${emailTokens.colors.textMuted};">
      Chúng tôi chân thành cảm ơn bạn đã luôn tin yêu và đồng hành cùng Alma Dungduong trong hành trình dung dưỡng làn da khỏe đẹp nguyên bản.
    </p>

    <!-- Unlocked Benefits Box -->
    <div style="background-color: #FFFFFF; border: 1px solid ${emailTokens.colors.border}; border-radius: 8px; padding: 22px 24px; margin: 24px 0;">
      <h3 style="font-family: ${emailTokens.fonts.serif}; font-size: 16px; font-weight: 600; color: ${emailTokens.colors.text}; margin: 0 0 12px 0;">
        🌟 Quyền lợi mới dành riêng cho hạng ${tierName}:
      </h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 6px 0; vertical-align: top; width: 24px; font-size: 14px;">🎁</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.text}; padding: 6px 0;">
            Hưởng tỷ lệ tích giọt điểm thưởng cao hơn trên mỗi đơn hàng.
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; vertical-align: top; font-size: 14px;">🏷️</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.text}; padding: 6px 0;">
            Nhận ưu đãi quà tặng và voucher sinh nhật hàng năm.
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; vertical-align: top; font-size: 14px;">💆</td>
          <td style="font-family: ${emailTokens.fonts.sans}; font-size: 14px; color: ${emailTokens.colors.text}; padding: 6px 0;">
            Được ưu tiên tham gia các chương trình trải nghiệm sản phẩm mới miễn phí.
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 12px 0;">
      <tr>
        <td align="center">
          <a href="https://almadungduong.vn/khach-hang-than-thiet" target="_blank" style="${commonStyles.buttonPrimary}">
            Xem Quyền Lợi & Giọt Thưởng →
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderEmailLayout({
    title: `[Alma Dungduong] Nâng cấp hạng thành viên: ${tierName}`,
    previewText: `Chúc mừng ${displayName} đã thăng hạng thành viên lên ${tierName} tại Alma Dungduong! Khám phá quyền lợi mới ngay.`,
    content,
  });

  const text = `
Chúc mừng ${displayName},

Alma Dungduong xin thông báo tài khoản của bạn đã được nâng cấp lên hạng thành viên mới: ${tierName}!

Cảm ơn bạn đã luôn tin tưởng và đồng hành cùng Alma Dungduong trong hành trình dung dưỡng làn da khỏe đẹp.
Bạn có thể kiểm tra các quyền lợi và ưu đãi mới của mình ngay tại trang cá nhân: https://almadungduong.vn/khach-hang-than-thiet

Trân trọng,
Đội ngũ Alma Dungduong
  `.trim();

  return { html, text };
}
