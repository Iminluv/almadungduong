# Phase 4: Token Cleanup Routine

**Date:** October 13, 2026  
**Feature:** Phone Number Verification (ADR-007)  
**Status:** Completed & Verified  

---

## 1. Summary of Changes

Extended the token cleanup routine in `src/lib/token-cleanup.ts` to automatically purge expired `PhoneOtpToken` records alongside `PasswordResetToken` and `EmailVerificationToken`.

### Details:
- Updated `cleanupExpiredTokens()` to include `prisma.phoneOtpToken.deleteMany({ where: { expiresAt: { lt: new Date() } } })`.
- Aggregates deleted phone OTP tokens into the total cleanup count returned to callers and administrative endpoints (`DELETE /api/auth/cleanup-tokens`).
- Preserves silent error recovery and graceful handling should the database connection encounter transient errors.

---

## 2. Test Verification

Created `src/__tests__/token-cleanup.test.ts` covering:
- Concurrently issuing deletes across all three token tables (`PasswordResetToken`, `EmailVerificationToken`, and `PhoneOtpToken`).
- Verifying total sum of deleted tokens.
- Graceful error catch and zero return upon database exceptions.

**Result:**
- 2/2 unit tests passed.
- `npx tsc --noEmit` passed with 0 errors.

---

## 3. Next Steps (Phase 5)
Implement the dedicated popup page `src/app/xac-thuc-sdt/page.tsx` following the Google One Tap UX pattern (~440x560px, OTP countdown, auto-close on success).
