# ADR-003: Migration from Resend to Gmail SMTP via Nodemailer

## Status
Accepted (Supersedes Resend transport decision in ADR-002)

## Date
2026-07-22

## Context
The e-commerce platform previously relied on `resend` for sending transactional emails and administrator notifications. However, Resend credentials were not configured, leading to skipped email execution. 

The store operates under the domain `almadungduong.com` with a customer support email forwarder `cskh@almadungduong.com` set up at domain registrar (Spaceship.com), forwarding directly to `almadungduong@gmail.com`.

We required an operational, zero-cost, and reliable email delivery solution integrated with existing email routing.

## Decision

1. **Replace `resend` with `nodemailer` (v7.x)**
   - Replaced the `resend` SDK with `nodemailer` pinned to version `^7.0.7` to comply with `next-auth` peer dependency requirements.
   - Retained all original exported email function signatures (`sendWelcomeEmail`, `sendOrderPendingEmail`, `sendOrderConfirmation`, `sendClaimReceivedEmail`, `sendPasswordResetEmail`, `sendLoyaltyTierUpgradeEmail`, `sendAdminPaymentAlert`, `sendAdminClaimAlert`) to maintain backward compatibility.

2. **Gmail SMTP Transport Configuration**
   - Transporter connects to `smtp.gmail.com` over port 465 (SSL/TLS).
   - Authenticates using `GMAIL_USER` (`almadungduong@gmail.com`) and a 16-character Google **App Password** (`GMAIL_APP_PASSWORD`), adhering to Google Security 2-Factor Authentication requirements.

3. **Dynamic Environment Evaluation**
   - `GMAIL_FROM` and `ADMIN_EMAIL` are evaluated dynamically from `process.env` inside sending helpers at invocation time rather than module load time.
   - Allows runtime updates and clean mocking during automated test execution.

4. **Environment Variables**
   - `GMAIL_USER`: `almadungduong@gmail.com`
   - `GMAIL_APP_PASSWORD`: 16-character Google App Password
   - `GMAIL_FROM`: `Alma Dungduong <almadungduong@gmail.com>` (or verified alias `cskh@almadungduong.com`)
   - `ADMIN_EMAIL`: `almadungduong@gmail.com`

## Alternatives Considered

### 1. Continuing with Resend
- **Pros:** Native API SDK.
- **Cons:** Requires domain DNS verification (DKIM/SPF) and active account management.
- **Rejected:** Gmail SMTP provides instant integration with existing Google infrastructure without additional service accounts.

### 2. Standard Gmail Password Authentication
- **Pros:** Simple credentials.
- **Cons:** Google permanently disabled "Less secure app access" for SMTP authentication.
- **Rejected:** Google enforces 2-Factor Authentication and App Passwords for SMTP clients.

## Consequences
- **Daily Sending Volume:** Personal Gmail accounts are subject to a sending limit of 500 emails/day, which is well within operating thresholds for the current store stage.
- **Testing & Verification:** Comprehensive unit test suite implemented in `src/__tests__/email.test.ts` covering all email types using Vitest and Nodemailer mocks.
- **Deprecation:** Removed `RESEND_API_KEY` and `RESEND_FROM_EMAIL` from environment variable requirements.
