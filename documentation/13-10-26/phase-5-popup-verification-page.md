# Phase 5: Dedicated Popup Page (`/xac-thuc-sdt`)

**Date:** October 13, 2026  
**Feature:** Phone Number Verification (ADR-007)  
**Status:** Completed & Verified  

---

## 1. Summary of Changes

Created the dedicated, focused phone verification popup page at `src/app/xac-thuc-sdt/page.tsx` adhering to the Google One Tap design pattern.

### Features:
1. **Google One Tap UI & Isolation:**
   - Designed specifically for a compact popup window (`width=440, height=560`).
   - Isolated from site shell: excluded `Header`, `Footer`, and `ChatWidget` on `/xac-thuc-sdt` so the popup renders only the focused verification card without distraction.
   - Clean botanical aesthetic matching Alma Dungduong's brand typography, forest green `#2D5A27`, and cream background `#FDFBF7`.

2. **State Machine & User Flows:**
   - **`LOADING`:** Displays gentle spinner while NextAuth resolves session.
   - **`UNAUTHENTICATED`:** Friendly notice informing visitors that logging in is required before verifying a phone number.
   - **`ALREADY_VERIFIED`:** Shows verified checkmark with active phone number, providing an immediate close action.
   - **`STEP 1: PHONE INPUT`:** 
     - Vietnamese phone prefix mask (`+84`).
     - Real-time client error presentation and disabled button states during network dispatch.
   - **`STEP 2: OTP INPUT`:**
     - 6-digit numeric input with auto-focus.
     - 60-second resend countdown with reactivated "Gửi lại mã OTP" trigger.
     - "Thay đổi số điện thoại" back-navigation to Step 1.
   - **`STEP 3: SUCCESS ANIMATION`:**
     - Smooth scale-in success checkmark.
     - Cross-window communication: broadcasts `window.opener.postMessage({ type: 'PHONE_VERIFIED', phone: ... }, '*')`.
     - Automatically invokes `window.close()` after a 3-second countdown (with fallback close button).

---

## 2. Verification

- Tested TypeScript compilation with `npx tsc --noEmit`: 0 errors.
- Verified route isolation in `Header.tsx`, `Footer.tsx`, and `ChatWidget.tsx`.

---

## 3. Next Steps (Phase 6)
Implement UI touchpoints:
1. Add the static phone verification notification message to `AnnouncementBar.tsx` with popup launcher.
2. Add verification badge and `Xác thực ngay` launcher button to the Profile tab in `src/app/tai-khoan/AccountView.tsx` with auto-refresh on `focus` and `message` events.
