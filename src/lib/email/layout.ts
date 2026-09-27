import { emailTokens, commonStyles } from './styles';

export interface EmailLayoutProps {
  title: string;
  previewText?: string;
  content: string;
}

/**
 * Universal Master Layout wrapper for all Alma Dungduong emails.
 * Guarantees cross-client email rendering, brand consistency, and responsive responsiveness.
 */
export function renderEmailLayout({ title, previewText, content }: EmailLayoutProps): string {
  const previewHtml = previewText
    ? `
    <!-- Hidden preheader text for inbox previews -->
    <div style="display: none; font-size: 1px; color: #FAF8F5; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
      ${previewText}
      ${'&nbsp;&zwnj;'.repeat(30)}
    </div>
  `
    : '';

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="vi">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${title}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, h2, h3, p, a, span { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      margin: 0 !important;
      padding: 0 !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
    }
    table, td {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }
    img {
      border: 0 !important;
      outline: none !important;
      text-decoration: none !important;
      -ms-interpolation-mode: bicubic !important;
    }
    a {
      text-decoration: none;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
      }
      .content-cell {
        padding: 24px 20px !important;
      }
      .header-cell {
        padding: 24px 20px 20px 20px !important;
      }
      .footer-cell {
        padding: 24px 20px !important;
      }
      .responsive-stack {
        display: block !important;
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="${commonStyles.body}">
  ${previewHtml}

  <!-- Background Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${commonStyles.containerTable}">
    <tr>
      <td align="center" style="padding: 32px 12px;">
        
        <!-- Main Email Container (600px Max) -->
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="${commonStyles.mainCard}">
          
          <!-- Brand Header -->
          <tr>
            <td class="header-cell" style="${commonStyles.header}">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="https://almadungduong.vn" target="_blank" style="${commonStyles.brandLogo}">
                      ALMA <span style="font-family: ${emailTokens.fonts.sans}; font-weight: 400; font-size: 15px; letter-spacing: 0.18em; opacity: 0.85;">DUNGDUONG</span>
                    </a>
                    <div style="${commonStyles.brandTagline}">
                      Mỹ Phẩm Vi Sinh Hoa Ngân
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Slot -->
          <tr>
            <td class="content-cell" style="${commonStyles.contentPadding}">
              ${content}
            </td>
          </tr>

          <!-- Brand Values Bar -->
          <tr>
            <td style="background-color: ${emailTokens.colors.accentLight}; padding: 16px 24px; text-align: center; border-top: 1px solid ${emailTokens.colors.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="font-family: ${emailTokens.fonts.sans}; font-size: 12px; font-weight: 500; color: ${emailTokens.colors.accent}; letter-spacing: 0.02em;">
                    🌿 100% Thảo dược tự nhiên & Vi sinh lành tính &nbsp;·&nbsp; ✨ Tư vấn chăm sóc da 1:1
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer-cell" style="${commonStyles.footer}">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <p style="${commonStyles.footerText}; font-weight: 600; color: ${emailTokens.colors.text}; margin-bottom: 4px;">
                      Alma Dungduong - Mỹ phẩm Vi sinh Hoa Ngân
                    </p>
                    <p style="${commonStyles.footerText}">
                      Hotline & Zalo: <a href="tel:0900000000" style="color: ${emailTokens.colors.accent}; text-decoration: none; font-weight: 500;">Hỗ trợ khách hàng</a> &nbsp;|&nbsp; 
                      Email: <a href="mailto:cskh@almadungduong.com" style="color: ${emailTokens.colors.accent}; text-decoration: none; font-weight: 500;">cskh@almadungduong.com</a>
                    </p>
                    <p style="${commonStyles.footerText}">
                      Website: <a href="https://almadungduong.vn" target="_blank" style="color: ${emailTokens.colors.accent}; text-decoration: underline;">almadungduong.vn</a>
                    </p>
                    <p style="${commonStyles.footerText}; font-size: 11px; color: ${emailTokens.colors.textLight}; margin-top: 16px; margin-bottom: 0;">
                      Bạn nhận được email này vì đã có giao dịch hoặc tài khoản tại Alma Dungduong.<br />
                      Đây là email gửi tự động từ hệ thống. Vui lòng liên hệ hotline/email nếu cần hỗ trợ.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Main Email Container -->

      </td>
    </tr>
  </table>
  <!-- /Background Wrapper -->
</body>
</html>
  `.trim();
}
