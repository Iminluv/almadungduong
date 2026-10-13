# Phase 2: Core SMS Provider Library (`src/lib/sms.ts`)

**Date:** October 13, 2026  
**Feature:** Phone Number Verification (ADR-007)  
**Status:** Completed & Verified  

---

## 1. Summary of Changes

Implemented the unified dual-provider SMS delivery engine and Vietnamese phone number normalization and validation logic in `src/lib/sms.ts`.

### Key Components:
1. **Vietnamese Phone Normalizer & Validator:**
   - `normalizeVietnamPhone(raw)`: Strips non-digit formatting and converts standard 10-digit formats (`09xxx`, `+849xxx`, `849xxx`) to canonical E.164 (`+849xxx`).
   - `isValidVietnamPhone(phone)`: Regex-validated against authorized Vietnamese mobile carrier prefixes (`+84` followed by 9 digits starting with 3, 5, 7, 8, or 9).
   - `toNationalPhone(e164)`: Converts E.164 back to national 10-digit format (`09xxx`) required by domestic SMS gateways.

2. **`BirdSmsProvider` (Primary - Free Tier):**
   - Connects to Bird (MessageBird) API (`https://rest.messagebird.com/messages`).
   - Authenticates via `BIRD_API_KEY` with originator `BIRD_ORIGINATOR`.
   - Actively identifies quota and balance exhaustion (HTTP 402, 429, or error responses indicating limit/balance), setting `isQuotaExceeded: true`.

3. **`EsmsSmsProvider` (Secondary - Automatic Fallback):**
   - Connects to eSMS.vn API (`SendMultipleMessage_V4_post_json`).
   - Authenticates via `ESMS_API_KEY` and `ESMS_SECRET_KEY` with configurable `ESMS_SMS_TYPE` and `ESMS_BRANDNAME`.
   - Supports local sandbox execution (`ESMS_SANDBOX="true"`) to simulate OTP delivery during local testing without consuming credits.

4. **`ChainedSmsProvider` (Orchestrator):**
   - Attempts primary provider (`Bird`) first.
   - If `Bird` exhausts its quota or encounters an error, seamlessly and automatically cascades to `eSMS.vn`.
   - Returns metadata indicating whether fallback was triggered (`fallbackUsed: boolean`).

---

## 2. Test Verification

- Created `src/__tests__/sms.test.ts` covering:
  - 10-digit national, E.164, and formatted Vietnamese phone numbers.
  - Rejection of invalid phone numbers (landlines, shortcodes, international numbers).
  - Primary provider success path.
  - Automatic fallback upon quota depletion (HTTP 402/429/balance errors).
  - Both-provider failure handling.
  - Offline sandbox mode simulation.
- **Result:** 12/12 unit tests passed. TypeScript type checking (`npx tsc --noEmit`) passed with 0 errors.

---

## 3. Next Steps (Phase 3)
Implement the backend API endpoints:
- `POST /api/phone-verification/send-otp`: Authentication gating, rate limiting (3 OTP/10 min), global phone uniqueness check, bcrypt hash storage, and OTP dispatch via `smsService`.
- `POST /api/phone-verification/verify-otp`: Code verification and atomic update of `user.phone` and `user.phoneVerified`.
