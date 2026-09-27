import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { renderOrderConfirmationEmail } from '../src/lib/email/templates/orderConfirmation';
import { renderOrderPendingEmail } from '../src/lib/email/templates/orderPending';
import { renderWelcomeEmail } from '../src/lib/email/templates/welcome';
import { renderLoyaltyUpgradeEmail } from '../src/lib/email/templates/loyaltyUpgrade';

// Load .env
dotenv.config({ path: '.env' });

const mockOrder = {
  transferCode: 'ALMA98264',
  totalAmount: 880000,
  shippingName: 'Nguyễn Thảo Linh',
  shippingPhone: '0982 345 678',
  shippingAddress: 'Số 18, Ngõ 45 Đường Láng Hạ, Phường Thành Công, Quận Ba Đình, Hà Nội',
  items: [
    {
      title: 'Serum Phục Hồi Vi Sinh Hoa Ngân (Microbiome Barrier Serum)',
      price: 490000,
      quantity: 1,
      variant: 'Chai thủy tinh 30ml',
    },
    {
      title: 'Kem Dưỡng Thảo Dược Cấp Ẩm Tự Nhiên (Nourishing Herbal Cream)',
      price: 390000,
      quantity: 1,
      variant: 'Hũ 50g',
    },
  ],
};

async function sendMockEmail() {
  const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || 'Alma Dungduong <cskh@almadungduong.com>';
  
  // Target recipient: allow CLI override or fallback to ADMIN_EMAIL
  const recipientArg = process.argv.find((arg) => arg.startsWith('--to='));
  const targetEmail = recipientArg ? recipientArg.split('=')[1] : (process.env.ADMIN_EMAIL || 'almadungduong@gmail.com');

  console.log('==============================================');
  console.log('  ALMA DUNGDUONG - MOCK EMAIL SENDER');
  console.log('==============================================');
  console.log(`📡 SMTP Host:     ${host}:${port}`);
  console.log(`✉️  Sender (From):  ${from}`);
  console.log(`🎯 Recipient (To): ${targetEmail}`);
  console.log('==============================================\n');

  if (!pass || !user) {
    console.error('❌ Missing SMTP_USER or SMTP_PASS in .env');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const templateType = process.argv.includes('--pending') ? 'pending' : 'confirmation';

  let emailPayload: { html: string; text: string; subject: string };

  if (templateType === 'pending') {
    const pendingOrder = {
      ...mockOrder,
      bankName: process.env.SEPAY_BANK_NAME || 'BIDV',
      bankAccount: process.env.SEPAY_BANK_ACCOUNT_NUMBER || '96247ALMADUNGDUONG',
      accountName: process.env.SEPAY_BANK_ACCOUNT_NAME || 'VU THI KIEU MY',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    const rendered = renderOrderPendingEmail(pendingOrder);
    emailPayload = {
      ...rendered,
      subject: `[Alma Dungduong] Xác nhận đơn hàng #${pendingOrder.transferCode} đang chờ thanh toán (MOCK PREVIEW)`,
    };
  } else {
    const rendered = renderOrderConfirmationEmail(mockOrder);
    emailPayload = {
      ...rendered,
      subject: `[Alma Dungduong] Xác nhận đơn hàng #${mockOrder.transferCode} thành công (MOCK PREVIEW)`,
    };
  }

  console.log(`⏳ Sending ${templateType.toUpperCase()} mock email to ${targetEmail}...`);

  try {
    const info = await transporter.sendMail({
      from,
      to: targetEmail,
      replyTo: process.env.EMAIL_REPLY_TO || 'cskh@almadungduong.com',
      subject: emailPayload.subject,
      text: emailPayload.text,
      html: emailPayload.html,
    });

    console.log('\n✅ Mock email dispatched successfully!');
    console.log(`📫 Message ID: ${info.messageId}`);
    console.log(`💌 Delivered to: ${targetEmail}`);
    console.log('\nPlease check the inbox (or spam folder) to review the visual layout.');
  } catch (error: any) {
    console.error('\n❌ Failed to send mock email:');
    console.error(error.message || error);
    process.exit(1);
  }
}

sendMockEmail();
