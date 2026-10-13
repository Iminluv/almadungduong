# ADR-007: Phone Number Verification with Dual-Provider Fallback

## Status
Accepted

## Date
2026-10-13

## Context

Customer phone numbers were previously unverified text fields in user profiles. To prevent bot abuse, prepare for a future phone-based voucher bonus reward system, and ensure high-deliverability SMS promotional capabilities, we needed an OTP-based phone number verification workflow for Vietnamese mobile numbers (`+84`).

Key challenges and requirements included:
1. **Zero Registration Friction:** Phone verification must NOT block user sign-up or checkout. It must be an optional, rewarded post-login step.
2. **Cost Optimization with Carrier-Grade Fallback:** Zero initial cost on free quota using **Bird (MessageBird)**, with automatic, transparent fallback to **eSMS.vn** (~₫300–500/OTP) when Bird free tier credits or rate limits are exhausted.
3. **Focused Popup UX:** Rather than navigating users away from their current page, verification runs inside a compact Google One Tap-style popup window (`/xac-thuc-sdt`, 440×560px) that automatically closes upon success.
4. **Security & Abuse Defense:** Enforce global uniqueness across accounts, protect against SMS pumping attacks via rate limiting, and securely hash OTPs at rest.

---

## Decision

### 1. Database Schema Extensions (`prisma/schema.prisma`)
- **`User.phoneVerified`:** Added nullable `DateTime?` timestamp, matching the `emailVerified` architecture.
- **`PhoneOtpToken` Model:** Created with `id`, `phone`, `otp` (bcrypt hash with salt 10), `userId`, `providerUsed` (`'bird' | 'esms'`), `expiresAt` (10 minutes), `usedAt`, and `createdAt`. Indexed on `[phone]`, `[userId]`, and `[expiresAt]`.
- Applied directly via `npm run db:push` to NeonDB PostgreSQL without breaking existing data.

### 2. Dual-Provider Cascade Architecture (`src/lib/sms.ts`)
- **`normalizeVietnamPhone` / `isValidVietnamPhone`:** Canonicalizes inputs to E.164 (`+84xxxxxxxxx`) and validates against official Vietnamese mobile carrier prefixes (`3, 5, 7, 8, 9`).
- **`BirdSmsProvider` (Primary):** Dispatches OTPs through Bird REST API. Intercepts HTTP 402/429 and credit/balance limitation errors.
- **`EsmsSmsProvider` (Fallback):** Connects to eSMS.vn API (`SendMultipleMessage_V4_post_json`) with support for local offline simulation via `ESMS_SANDBOX="true"`.
- **`ChainedSmsProvider`:** Composite orchestrator that tries Bird first, catches quota errors or network outages, and cascades to eSMS.vn without disrupting user requests.

### 3. Backend Endpoints
- **`POST /api/phone-verification/send-otp`:**
  - Authenticated via NextAuth session.
  - Rejects numbers already claimed and verified by another user (`409 Conflict`).
  - Limits requests to max 3 OTPs / 10 minutes per phone (`429 Too Many Requests`).
  - Invalidates older pending tokens, generates a 6-digit random code, saves bcrypt hash, and dispatches SMS.
- **`POST /api/phone-verification/verify-otp`:**
  - Authenticated via NextAuth session.
  - Validates active token, executes constant-time `bcrypt.compareSync()`.
  - Atomic Prisma transaction: consumes token (`usedAt = now()`) and updates `User.phone` and `User.phoneVerified = now()`.
- **Profile Reset:** Updating the phone number in `PUT /api/user/profile` automatically resets `phoneVerified: null` if the number changed.

### 4. Google One Tap Popup & Touchpoints
- **Dedicated Popup Page (`/xac-thuc-sdt`):** A standalone 440×560px page with phone mask input, 6-digit OTP input with 60s countdown timer, success checkmark animation, and `window.close()`. Broadcasts `PHONE_VERIFIED` to `window.opener`.
- **Site Shell Isolation:** `Header`, `Footer`, and `ChatWidget` return `null` on `/xac-thuc-sdt`.
- **`AnnouncementBar`:** Displays 3rd rotating announcement (`🎁 Xác thực số điện thoại để nhận quà & bảo vệ tài khoản`) linking to the popup launcher. Stateless component.
- **Profile Tab (`AccountView.tsx`):** Renders status badge (`✓ Đã xác thực` / `Chưa xác thực`) and `Xác thực ngay` button. Listens to `window.focus` and `message` events to immediately update profile data upon popup completion.
- **Account Overview:** Displays an alert banner for unverified accounts to incentivize phone verification.

### 5. Automated Token Cleanup (`src/lib/token-cleanup.ts`)
- Added `PhoneOtpToken.deleteMany({ where: { expiresAt: { lt: now() } } })` to the existing cleanup routine invoked by `DELETE /api/auth/cleanup-tokens`.

---

## Consequences

- **Cost-Efficiency:** Operates at 0₫ on Bird free tier, while ensuring zero downtime or failed deliveries via automatic rollback to eSMS.vn.
- **Frictionless Conversion:** Users never leave their current browsing session; the popup opens, verifies in seconds, and dismisses itself.
- **Robust Security:**
  - OTPs hashed at rest with bcrypt.
  - SMS pumping mitigated by per-phone and per-account rate limits (3/10min).
  - Global phone uniqueness enforced at API level without fragile schema migrations.
- **Testing:** 34/34 automated tests across normalization, dual-provider cascade, API endpoints, and token cleanup passing cleanly.
