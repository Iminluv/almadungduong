# ADR-006: Email Verification on User Registration

## Status
Accepted

## Date
2026-08-03

## Context

Previously, credential-based user registration created account records with `emailVerified: null` and immediately logged the user in via NextAuth `signIn("credentials", ...)`. This allowed unverified email addresses to access user features and make purchases.

We required a lightweight, zero-dependency email verification workflow to verify email ownership for credentials users while keeping Google OAuth auto-verified.

## Decision

1. **Lightweight Token Pattern (`EmailVerificationToken`)**
   - Created a new Prisma model `EmailVerificationToken` (`id`, `email`, `token`, `expiresAt`, `usedAt`) mirroring the `PasswordResetToken` architecture.
   - Tokens expire after 1 hour (per user preference).

2. **Backend API Endpoints**
   - `POST /api/auth/register`: Creates user with `emailVerified: null`, generates a 1-hour verification token, and emails the verification link via Brevo SMTP Relay.
   - `POST /api/auth/send-verification`: (Re)sends verification emails on demand.
   - `GET /api/auth/verify-email?token=xxx`: Validates tokens, sets `user.emailVerified = new Date()`, marks token `usedAt`, and redirects to `/tai-khoan?verified=true`.

3. **Authentication Gating & OAuth**
   - NextAuth `authorize()` throws `EMAIL_NOT_VERIFIED` when credentials users attempt login without an `emailVerified` timestamp.
   - Google OAuth sign-in auto-verifies users (`emailVerified: new Date()`) since email ownership is proven by Google.
   - Performed a one-time backfill on 8 pre-existing users so existing customers remain unblocked.

4. **Frontend UI Changes**
   - Removed automatic login post-registration; replaced with a "Check your email" success panel.
   - Unverified login attempts display an amber notice banner with a "Resend verification email" action button.

## Consequences

- **Security:** Guarantees email ownership before credentials accounts can log in or make purchases.
- **Maintainability:** Reuses existing Brevo SMTP relay, crypto token generation, and token cleanup mechanisms.
- **Testing:** 11/11 unit tests passed; production build compiled clean.
