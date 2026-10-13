# Phase 3: Backend API Endpoints

**Date:** October 13, 2026  
**Feature:** Phone Number Verification (ADR-007)  
**Status:** Completed & Verified  

---

## 1. Summary of Changes

Created two Next.js App Router API endpoints to handle the end-to-end phone verification lifecycle, enforcing authentication, global uniqueness, rate limiting, and atomic state transitions.

### 1. `POST /api/phone-verification/send-otp`
- **Authentication:** Requires active NextAuth session (`session.user.id`). Unauthenticated requests reject with `401 Unauthorized`.
- **Validation:** Normalizes input via `normalizeVietnamPhone()`. Rejects invalid prefixes or non-Vietnamese phone numbers with `400 Bad Request`.
- **Global Uniqueness Check:** Queries existing `User` records where `phone == normalizedPhone` and `phoneVerified != null` (excluding the current user). Rejects existing claimed numbers with `409 Conflict`.
- **Rate Limiting:** Queries `PhoneOtpToken` records created within the last 10 minutes for the target phone number. If count $\ge 3$, rejects with `429 Too Many Requests`.
- **Pending Token Invalidation:** Automatically marks previous unconsumed tokens for this user & phone as expired (`usedAt = now()`).
- **Generation & Hashing:** Generates cryptographically secure 6-digit OTP code, stores bcrypt hash (salt 10) in `PhoneOtpToken` with 10-minute expiry (`now() + 10m`).
- **SMS Dispatch:** Dispatches raw OTP via `smsService.sendOtp(normalizedPhone, rawOtp)` using Bird default with automatic eSMS fallback.

### 2. `POST /api/phone-verification/verify-otp`
- **Authentication:** Requires active NextAuth session.
- **Lookup:** Queries latest active token for `userId` and `normalizedPhone` where `usedAt == null` and `expiresAt > now()`. Returns `400` if expired or missing.
- **Constant-Time Verification:** Compares provided OTP with stored bcrypt hash using `bcrypt.compareSync()`.
- **Race Condition Guard:** Re-verifies that no other user claimed this phone while the OTP prompt was open.
- **Atomic Transaction:** Performs `prisma.$transaction()`:
  - Updates `PhoneOtpToken.usedAt = now()`.
  - Updates `User.phone = normalizedPhone`, `User.phoneVerified = now()`.

### 3. Session & Profile Integration
- Extended `src/types/next-auth.d.ts` and `src/lib/auth.ts` to include `phoneVerified` across JWT and Session tokens.
- Updated `src/app/api/user/profile/route.ts` to return `phoneVerified` in `GET` responses, and reset `phoneVerified: null` in `PUT` if a user manually changes their phone number.

---

## 2. Test Verification

Created `src/__tests__/phone-verification-api.test.ts` covering:
- Gating unauthenticated requests (`401`).
- Invalid phone format rejections (`400`).
- Global phone uniqueness collisions (`409`).
- Rate limit thresholds of 3 OTPs / 10 minutes (`429`).
- Successful OTP generation, hashing, dispatch, and token persistence (`200`).
- Expired or missing OTP rejections (`400`).
- Incorrect OTP rejections (`400`).
- Atomic Prisma database updates upon verification (`200`).

**Result:**
- 9/9 integration tests passed.
- `npx tsc --noEmit` passed with 0 errors.

---

## 3. Next Steps (Phase 4)
Implement the token cleanup routine in `src/lib/auth-tokens.ts` and `/api/auth/cleanup-tokens` to purge expired `PhoneOtpToken` rows.
