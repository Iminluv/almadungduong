# Phase 6: UI Touchpoints Integration

**Date:** October 13, 2026  
**Feature:** Phone Number Verification (ADR-007)  
**Status:** Completed & Verified  

---

## 1. Summary of Changes

Integrated the phone verification entry points across the customer navigation and account views without adding session overhead to static site headers.

### 1. Announcement Bar Touchpoint (`Header.tsx` & `AnnouncementBar.tsx`):
- Added a 3rd rotating static announcement:
  > *"🎁 Xác thực số điện thoại để nhận quà & bảo vệ tài khoản"*
- Connected an inline `Xác thực ngay` action button that opens `/xac-thuc-sdt` in a centered popup window (`width=440, height=560`).
- **Architectural constraint met:** Announcement bar remains stateless and performant. Auth checks are managed internally by the popup.

### 2. Account Dashboard Touchpoints (`AccountView.tsx`):
- **Overview Tab:**
  - Added a gentle notification card when `!profile?.phoneVerified` alerting the customer to verify their phone number to activate voucher benefits.
- **Profile Tab:**
  - Added a status badge beside the phone input:
    - Verified: `✓ Đã xác thực` (emerald pill).
    - Unverified: `Chưa xác thực` (amber pill) + `Xác thực ngay` trigger button.
- **Cross-Window Auto-Refresh:**
  - Attached listeners for `window.focus` and `message` (`PHONE_VERIFIED`).
  - When the customer completes verification inside the popup, the popup broadcasts `postMessage` and closes. The parent account page automatically re-fetches `/api/user/profile` and transitions the badge to `Đã xác thực` without requiring a manual page refresh.

---

## 2. Verification

- Tested with `npx tsc --noEmit`: 0 errors.
- Verified visual layout, responsive styles, and message rotations.

---

## 3. Next Steps (Phase 7)
Implement automated end-to-end unit and integration tests in `src/__tests__/phone-verification.test.ts` validating all aspects of phone normalization, dual-provider cascade, rate limits, and verification transactions.
