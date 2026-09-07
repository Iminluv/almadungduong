import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load .env
dotenv.config({ path: '.env' });

async function verifySmtp() {
  const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || 'Alma Dungduong <cskh@almadungduong.com>';
  const adminEmail = process.env.ADMIN_EMAIL || user;

  console.log('--- SMTP Configuration Check ---');
  console.log(`Host:    ${host}`);
  console.log(`Port:    ${port} (secure: ${secure})`);
  console.log(`User:    ${user || '(not set)'}`);
  console.log(`Pass:    ${pass ? pass.slice(0, 15) + '...' : '(not set)'}`);
  console.log(`From:    ${from}`);
  console.log('--------------------------------\n');

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

  console.log('⏳ Verifying connection and credentials with SMTP server...');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection and authentication SUCCESSFUL!\n');

    const shouldSend = process.argv.includes('--send');
    if (shouldSend) {
      console.log(`⏳ Sending test email to ${adminEmail}...`);
      const info = await transporter.sendMail({
        from,
        to: adminEmail,
        replyTo: process.env.EMAIL_REPLY_TO || 'cskh@almadungduong.com',
        subject: '[Test] Brevo SMTP Configuration Verification',
        text: 'This is a test email from Alma Dungduong verifying that Brevo SMTP is working properly.',
        html: '<p>This is a test email from <strong>Alma Dungduong</strong> verifying that Brevo SMTP is working properly.</p>',
      });
      console.log(`✅ Test email sent successfully! Message ID: ${info.messageId}`);
    } else {
      console.log('💡 Note: Pass --send flag to send an actual test email (e.g., npx tsx scripts/verify-smtp.ts --send)');
    }
  } catch (error: any) {
    console.error('❌ SMTP Verification Failed:');
    console.error(error.message || error);
    if (error.responseCode === 535) {
      console.log('\n🔍 Troubleshooting 535 Authentication failed:');
      console.log('1. Brevo SMTP username is usually NOT your Gmail address.');
      console.log('   In Brevo dashboard, go to Settings > SMTP & API > SMTP tab.');
      console.log('   Look at the "Login" field (often formatted like xxx@smtp-brevo.com).');
      console.log('2. Make sure your SMTP key (SMTP_PASS) was generated on the SMTP tab.');
    } else if (error.responseCode === 525 || (error.message && error.message.includes('525'))) {
      console.log('\n🔍 Troubleshooting 525 Unauthorized IP address:');
      console.log('Brevo enables "Blocking unauthorized IP addresses" by default for all accounts created after May 2024.');
      console.log('Because Vercel serverless functions (and local machines) use dynamic IPs, you should deactivate this restriction:');
      console.log('1. In Brevo dashboard, go to: Settings > Security > Authorized IPs');
      console.log('2. Under "Blocking unauthorized IP addresses", click Deactivate.');
      console.log('   (Alternatively, whitelist your current local IP if only testing locally: 42.116.66.140)');
    }
    process.exit(1);
  }
}

verifySmtp();
