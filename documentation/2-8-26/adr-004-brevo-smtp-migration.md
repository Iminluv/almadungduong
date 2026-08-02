# ADR-004: Migration from Gmail SMTP to Brevo SMTP Relay via Nodemailer

## Status
Accepted (Supersedes Gmail SMTP transport decision in ADR-003)

## Date
2026-08-02

## Context
Previously in ADR-003, the platform used Gmail SMTP (`smtp.gmail.com`) to send transactional emails. However, sending emails directly under `almadungduong@gmail.com` lacked custom domain branding, and using custom sender addresses via Gmail SMTP required complex alias configuration in personal Google accounts.

The store domain `almadungduong.com` is registered at Spaceship.com with an inbound email forwarder `cskh@almadungduong.com` forwarding to `almadungduong@gmail.com`.

We required a professional, zero-cost, custom-domain email delivery service (`cskh@almadungduong.com`) for outbound transactional emails without needing a paid mailbox host.

## Decision

1. **Adopt Brevo (formerly Sendinblue) SMTP Relay**
   - Transporter connects to `smtp-relay.brevo.com` over port 587 (STARTTLS / `secure: false`).
   - Authenticates using `BREVO_SMTP_USER` (Brevo account login email) and `BREVO_SMTP_KEY` (generated SMTP v3 key).
   - Custom sender `cskh@almadungduong.com` authenticated via DKIM and SPF TXT records in Spaceship DNS.

2. **Inbound & Outbound Architecture Separation**
   - **Outbound Emails (App → Customers):** Sent via Brevo SMTP using sender identity `Alma Dungduong <cskh@almadungduong.com>`.
   - **Inbound Emails (Customers → Store):** Sent to `cskh@almadungduong.com` and automatically forwarded to `almadungduong@gmail.com` via Spaceship email forwarding.
   - **Admin Alert Emails:** Sent to `ADMIN_EMAIL` (`almadungduong@gmail.com`).

3. **Retained Function Signatures**
   - All exported email functions in `src/lib/email.ts` maintain full backward compatibility (`sendWelcomeEmail`, `sendOrderPendingEmail`, `sendOrderConfirmation`, `sendClaimReceivedEmail`, `sendPasswordResetEmail`, `sendLoyaltyTierUpgradeEmail`, `sendAdminPaymentAlert`, `sendAdminClaimAlert`).

4. **Environment Variables**
   - `BREVO_SMTP_USER`: Brevo account login email
   - `BREVO_SMTP_KEY`: Brevo SMTP v3 Key
   - `BREVO_FROM`: `Alma Dungduong <cskh@almadungduong.com>`
   - `ADMIN_EMAIL`: `almadungduong@gmail.com`

## Alternatives Considered

### 1. Spaceship Spacemail Hosted Mailbox
- **Pros:** Native mailbox hosted at domain registrar.
- **Cons:** Paid service subscription (~$0.59–$0.98/month per mailbox).
- **Rejected:** Brevo provides a free tier with custom domain DKIM authentication without recurring mailbox costs.

### 2. Gmail SMTP with App Passwords (ADR-003)
- **Pros:** Zero additional setup if already using Gmail.
- **Cons:** All outgoing emails show `almadungduong@gmail.com` or require Gmail alias verification.
- **Rejected:** Suboptimal branding for a growing e-commerce platform.

## Consequences
- **Sending Volume:** Brevo free plan allows up to 300 emails/day, which is fully sufficient for current transactional volume.
- **Domain Verification:** Requires adding DKIM and SPF TXT records to Spaceship.com DNS settings.
- **Testing:** Unit test suite in `src/__tests__/email.test.ts` updated to mock Brevo SMTP variables and verify `cskh@almadungduong.com` sender headers.
- **Environment Updates:** Deprecated `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_FROM` in favor of `BREVO_SMTP_*` and `BREVO_FROM`.
