import nodemailer from 'nodemailer';
import {
  renderOrderConfirmationEmail,
  OrderConfirmationData,
} from './email/templates/orderConfirmation';
import {
  renderOrderPendingEmail,
  OrderPendingData,
} from './email/templates/orderPending';
import { renderWelcomeEmail } from './email/templates/welcome';
import { renderLoyaltyUpgradeEmail } from './email/templates/loyaltyUpgrade';
import { renderPasswordResetEmail } from './email/templates/passwordReset';
import { renderClaimReceivedEmail } from './email/templates/claimReceived';
import {
  renderAdminPaymentAlertEmail,
  renderAdminClaimAlertEmail,
  AdminOrderAlertData,
} from './email/templates/adminAlerts';

export type OrderEmailData = OrderConfirmationData;
export type OrderPendingEmailData = OrderPendingData;
export type { AdminOrderAlertData };

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // false for port 587 STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Shared helper to send email via SMTP (Nodemailer)
 */
async function sendEmail(opts: { to: string; subject: string; text?: string; html?: string }) {
  if (!process.env.SMTP_PASS) {
    console.error('[Email] SMTP_PASS is not set — email delivery is disabled in this environment.');
    return null;
  }
  const fromAddress = process.env.EMAIL_FROM || 'Alma Dungduong <cskh@almadungduong.com>';
  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      replyTo: process.env.EMAIL_REPLY_TO || 'cskh@almadungduong.com',
      ...opts,
    });
    return info;
  } catch (error) {
    console.error(`[Email] Error sending to ${opts.to}:`, error);
    return null;
  }
}

/**
 * Sends a stylized HTML welcome email to a newly registered user
 */
export async function sendWelcomeEmail(toEmail: string, name: string) {
  const { html, text } = renderWelcomeEmail(name);
  return sendEmail({
    to: toEmail,
    subject: '[Alma Dungduong] Đăng ký tài khoản thành công',
    html,
    text,
  });
}

/**
 * Sends an email when order is created and waiting for bank transfer
 */
export async function sendOrderPendingEmail(toEmail: string, order: OrderPendingEmailData) {
  const { html, text } = renderOrderPendingEmail(order);
  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} đang chờ thanh toán`,
    html,
    text,
  });
}

/**
 * Sends a stylized HTML email confirming successful transaction processing.
 */
export async function sendOrderConfirmation(order: OrderEmailData, toEmail: string) {
  const { html, text } = renderOrderConfirmationEmail(order);
  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Xác nhận đơn hàng #${order.transferCode} thành công`,
    html,
    text,
  });
}

/**
 * Sends email when customer claims transfer verifying manually
 */
export async function sendClaimReceivedEmail(toEmail: string, transferCode: string) {
  const { html, text } = renderClaimReceivedEmail(transferCode);
  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Nhận yêu cầu xác minh giao dịch thủ công #${transferCode}`,
    html,
    text,
  });
}

/**
 * Sends a password reset request email
 */
export async function sendPasswordResetEmail(toEmail: string, resetUrl: string) {
  const { html, text } = renderPasswordResetEmail(resetUrl);
  return sendEmail({
    to: toEmail,
    subject: '[Alma Dungduong] Yêu cầu đặt lại mật khẩu tài khoản',
    html,
    text,
  });
}

/**
 * Sends email when user is upgraded to a higher loyalty tier
 */
export async function sendLoyaltyTierUpgradeEmail(toEmail: string, name: string, tierName: string) {
  const { html, text } = renderLoyaltyUpgradeEmail(name, tierName);
  return sendEmail({
    to: toEmail,
    subject: `[Alma Dungduong] Nâng cấp hạng thành viên thành công: ${tierName}`,
    html,
    text,
  });
}

/**
 * Send payment notification to Admin email if configured
 */
export async function sendAdminPaymentAlert(order: AdminOrderAlertData) {
  const adminAddress = process.env.ADMIN_EMAIL;
  if (!adminAddress) return null;

  const { html, text } = renderAdminPaymentAlertEmail(order);
  return sendEmail({
    to: adminAddress,
    subject: `[Alma Admin] Thanh toán đơn hàng #${order.transferCode} thành công`,
    html,
    text,
  });
}

/**
 * Send manual claim notification to Admin email if configured
 */
export async function sendAdminClaimAlert(order: AdminOrderAlertData) {
  const adminAddress = process.env.ADMIN_EMAIL;
  if (!adminAddress) return null;

  const { html, text } = renderAdminClaimAlertEmail(order);
  return sendEmail({
    to: adminAddress,
    subject: `[Alma Admin] Yêu cầu xác minh thủ công #${order.transferCode}`,
    html,
    text,
  });
}
