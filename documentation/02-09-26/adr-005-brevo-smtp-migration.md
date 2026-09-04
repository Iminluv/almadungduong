# ADR-005: Migration from Gmail SMTP to Brevo SMTP Relay

## Status
Accepted (Supersedes ADR-003: Gmail SMTP)

## Date
2026-09-04

## Context
The e-commerce platform previously relied on Gmail SMTP (via Nodemailer with a Google App Password) for sending transactional emails. While functional, this approach had several limitations:

1. **Unprofessional sender identity**: Emails sent from `almadungduong@gmail.com` lack brand credibility for an e-commerce store operating under `almadungduong.com`.
2. **No domain authentication**: Gmail personal accounts cannot configure SPF/DKIM alignment for a custom domain, increasing the likelihood of emails being flagged as spam.
3. **Deliverability risk**: Cloud hosting platforms (Vercel serverless functions) can be unreliable with SMTP connections to `smtp.gmail.com`.
4. **Scaling ceiling**: Gmail personal accounts impose a 500 emails/day sending limit.

The store operates under `almadungduong.com` (registered at Spaceship.com) with a customer support email forwarder `cskh@almadungduong.com` forwarding to `almadungduong@gmail.com`.

## Decision

### 1. Keep Nodemailer as Transport Abstraction
- Nodemailer is retained as the SMTP transport layer, ensuring **maximum provider portability**.
- Switching email providers in the future requires only changing SMTP environment variables — zero code changes.

### 2. Brevo SMTP Relay Transport
- SMTP host changed from `smtp.gmail.com:465` (SSL) to `smtp-relay.brevo.com:587` (STARTTLS).
- Authentication uses the Brevo SMTP Login ID (e.g. `b781e6001@smtp-brevo.com`, found under Settings > SMTP & API > SMTP tab) and a generated SMTP key (prefixed `xsmtpsib-`).
- Note: Brevo's default "Blocking unauthorized IP addresses" setting (under Settings > Security > Authorized IPs) must be **Deactivated** to allow requests from dynamic IP environments like local dev and Vercel serverless functions.

### 3. Domain-Branded Sender
- Sender address changed from `almadungduong@gmail.com` to `cskh@almadungduong.com`.
- `replyTo` header set to `cskh@almadungduong.com` for proper reply routing through the domain forwarder.

### 4. Generic Environment Variables
All email-related env vars are now provider-agnostic:

| Variable | Purpose |
|---|---|
| `SMTP_HOST` | SMTP relay hostname |
| `SMTP_PORT` | SMTP relay port |
| `SMTP_SECURE` | `true` for SSL (port 465), `false` for STARTTLS (port 587) |
| `SMTP_USER` | SMTP authentication username |
| `SMTP_PASS` | SMTP authentication password/key |
| `EMAIL_FROM` | Formatted sender identity |
| `ADMIN_EMAIL` | Admin notification recipient |

### 5. Anti-Spam Improvements
- Added `replyTo` header to all outgoing emails.
- Added plain-text fallback to the HTML order confirmation email for multipart MIME compliance.
- Domain authentication (SPF, DKIM, DMARC) configured via DNS at Spaceship.com.

### 6. DNS Authentication Records
| Record | Host | Value |
|---|---|---|
| SPF | `@` | `v=spf1 include:spf.brevo.com ~all` |
| DKIM | *(Brevo-provided)* | *(Brevo-provided key)* |
| DMARC | `_dmarc` | `v=DMARC1; p=none; rua=mailto:almadungduong@gmail.com` |

## Alternatives Considered

### 1. Brevo REST API (`@getbrevo/brevo` SDK)
- **Pros:** Structured JSON errors, no SMTP port concerns.
- **Cons:** Creates vendor lock-in; switching providers requires code changes.
- **Rejected:** Portability via Nodemailer SMTP is more valuable for a growing business.

### 2. Resend SMTP
- **Pros:** No branding on free tier, developer-friendly.
- **Cons:** Lower daily limit (100/day vs Brevo's 300/day).
- **Considered but not selected:** Brevo's higher daily limit better suits e-commerce volume spikes.

### 3. Continuing with Gmail SMTP
- **Pros:** Zero migration effort.
- **Cons:** No domain authentication, unprofessional sender, deliverability risk.
- **Rejected:** Unacceptable for a production e-commerce platform.

## Consequences
- **Daily Sending Volume:** Brevo free tier allows 300 emails/day, sufficient for current operations.
- **Branding:** Free tier includes "Sent with Brevo" branding. Removable on Starter plan ($9/month).
- **Provider Portability:** Future migration to any SMTP-compatible provider (Resend, SendGrid, Amazon SES) requires only environment variable changes.
- **Deprecated:** `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_FROM`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` are no longer used.
