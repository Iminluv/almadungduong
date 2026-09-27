/**
 * Design system tokens and reusable inline styles for Alma Dungduong HTML Emails.
 * Designed for maximum compatibility across Gmail, Apple Mail, Outlook, and mobile clients.
 */

export const emailTokens = {
  colors: {
    bg: '#FAF8F5',            // Warm cream / Rice paper
    surface: '#F5F2EC',       // Sand / Card surface
    card: '#FFFFFF',          // Clean white content card
    text: '#1C1C1A',          // Deep charcoal body text
    textMuted: '#68645E',     // Muted secondary text
    textLight: '#9E9991',     // Helper / subtle text
    accent: '#1A4331',        // Deep botanical forest green (Primary Brand)
    accentLight: '#EBF2EE',   // Subtle green tint for badges / highlights
    accentHover: '#133325',   // Darker green
    gold: '#B68D40',          // Luxury botanical gold
    goldLight: '#FBF5E8',     // Gold background tint for VIP / Loyalty
    navy: '#00347D',          // Heritage navy
    border: '#EBE7DF',        // Subtle card border
    borderLight: '#F0EDE8',   // Inner table divider
    statusSuccess: '#1A4331', // Green for completed / confirmed
    statusPending: '#D97706', // Warm amber for pending transfer
    statusPendingBg: '#FEF3C7',// Light amber
  },
  fonts: {
    serif: "'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  },
};

export const commonStyles = {
  body: `
    margin: 0;
    padding: 0;
    width: 100% !important;
    background-color: ${emailTokens.colors.bg};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-family: ${emailTokens.fonts.sans};
    color: ${emailTokens.colors.text};
  `,
  containerTable: `
    width: 100%;
    border-collapse: collapse;
    background-color: ${emailTokens.colors.bg};
  `,
  mainCard: `
    max-width: 600px;
    margin: 0 auto;
    background-color: ${emailTokens.colors.card};
    border: 1px solid ${emailTokens.colors.border};
    border-radius: 10px;
    overflow: hidden;
  `,
  header: `
    padding: 32px 36px 24px 36px;
    background-color: ${emailTokens.colors.card};
    text-align: center;
    border-bottom: 1px solid ${emailTokens.colors.borderLight};
  `,
  brandLogo: `
    font-family: ${emailTokens.fonts.serif};
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: ${emailTokens.colors.accent};
    text-decoration: none;
    display: inline-block;
  `,
  brandTagline: `
    font-family: ${emailTokens.fonts.sans};
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${emailTokens.colors.textMuted};
    margin-top: 4px;
  `,
  contentPadding: `
    padding: 32px 36px;
  `,
  headingH1: `
    font-family: ${emailTokens.fonts.serif};
    font-size: 22px;
    font-weight: 600;
    line-height: 1.35;
    color: ${emailTokens.colors.text};
    margin: 0 0 12px 0;
  `,
  paragraph: `
    font-family: ${emailTokens.fonts.sans};
    font-size: 15px;
    line-height: 1.65;
    color: ${emailTokens.colors.text};
    margin: 0 0 16px 0;
  `,
  paragraphMuted: `
    font-family: ${emailTokens.fonts.sans};
    font-size: 14px;
    line-height: 1.6;
    color: ${emailTokens.colors.textMuted};
    margin: 0 0 16px 0;
  `,
  buttonPrimary: `
    display: inline-block;
    padding: 13px 28px;
    background-color: ${emailTokens.colors.accent};
    color: #FFFFFF !important;
    text-decoration: none;
    font-family: ${emailTokens.fonts.sans};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    border-radius: 6px;
    text-align: center;
  `,
  highlightBox: `
    background-color: ${emailTokens.colors.surface};
    border: 1px solid ${emailTokens.colors.border};
    border-radius: 8px;
    padding: 20px 24px;
    margin: 20px 0;
  `,
  footer: `
    background-color: ${emailTokens.colors.surface};
    padding: 28px 36px;
    border-top: 1px solid ${emailTokens.colors.borderLight};
    text-align: center;
  `,
  footerText: `
    font-family: ${emailTokens.fonts.sans};
    font-size: 12px;
    line-height: 1.6;
    color: ${emailTokens.colors.textMuted};
    margin: 0 0 8px 0;
  `,
  divider: `
    height: 1px;
    background-color: ${emailTokens.colors.borderLight};
    border: none;
    margin: 24px 0;
  `,
};
