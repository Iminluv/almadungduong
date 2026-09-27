# ADR-005: Removal of Pending Order Email and Checkout Address Book Integration

## Status
Accepted

## Date
2026-08-02

## Context

1. **Pending Order Email Redundancy:**
   When a customer submitted an order, the system executed two simultaneous actions:
   - Displayed the VietQR payment modal with bank transfer info and a 10-minute expiry countdown.
   - Sent a plain-text email (`sendOrderPendingEmail`) notifying the user that an order was created and pending payment.
   
   This dual notification caused confusion and created unnecessary SMTP load. Post-payment confirmation emails (`sendOrderConfirmation`) and admin payment alerts (`sendAdminPaymentAlert`) already handle order fulfillment notification after SePay payment verification.

2. **Address Re-entry & Friction at Checkout:**
   Logged-in users previously had to type out their full shipping address manually or rely on static auto-fill from their default address. There was no interactive UI panel at checkout to select between multiple saved addresses or save a new address to their address book during checkout.

3. **Latency & Auth Waterfall in Address Book Loading:**
   The initial implementation of the checkout address book experienced a ~10-second delay on page load due to two factors:
   - **Request Waterfall:** The client waited for NextAuth's `useSession()` hook state transition (`status === "authenticated"`), which required a client-to-server `/api/auth/session` network fetch before triggering `fetch("/api/user/addresses")`.
   - **Redundant Database Queries in Auth:** NextAuth's `jwt` callback executed `prisma.user.findUnique` on *every* session check, adding unnecessary database network latency over SSL.

## Decision

1. **Removal of Pending Order Email (`sendOrderPendingEmail`)**
   - Removed `sendOrderPendingEmail` function export, data interface, call site in `src/app/api/checkout/route.ts`, unit tests, and scratch scripts.
   - Customer confirmation emails (`sendOrderConfirmation`) sent after SePay payment verification remain unchanged.
   - Admin payment alerts (`sendAdminPaymentAlert`) and manual claim alerts (`sendAdminClaimAlert`) remain unchanged.

2. **Checkout Address Book Integration (`AddressStep.tsx`)**
   - Extracted checkout step 1 into a dedicated component `src/components/checkout/AddressStep.tsx`.
   - **Saved Address Selector:** Renders interactive address cards displaying full name, phone number, address details, address label badges ("Nhà", "Cơ quan"), and default indicator.
   - **Custom Address Entry:** Provides a "+ Giao đến địa chỉ khác" option for entering custom recipient details.
   - **Save to Address Book Option:** Logged-in users entering a new address can check *"Lưu địa chỉ này vào sổ địa chỉ cá nhân"*, which asynchronously persists the address via `POST /api/user/addresses` on form submission.

3. **Performance & Auth Waterfall Optimization**
   - **Immediate Address Fetch:** Shifted `fetch("/api/user/addresses")` to run immediately on component mount (`useEffect(() => {}, [])`), parallelizing it with page hydration rather than waiting for `useSession()` status state transitions.
   - **Unblocked Card Rendering:** Removed the `isAuthenticated` gate on address card rendering; cards display immediately when `savedAddresses.length > 0` is returned from the fast API endpoint.
   - **JWT Callback Optimization:** Modified NextAuth's `jwt` callback in `src/lib/auth.ts` to execute `prisma.user.findUnique` only when `token.role` is missing or during explicit `update` triggers.

## Alternatives Considered

### 1. Keep Pending Order Email as an HTML Template
- **Pros:** Customers who close the checkout browser tab have the transfer info in their inbox.
- **Cons:** VietQR modal already stays persistent in `localStorage` (`alma-pending-payment`) allowing session recovery; pending emails clogged inbox and added SMTP delay.
- **Rejected:** Removed in favor of immediate modal UX and post-payment email confirmations.

### 2. Force Users to Manage Addresses Only in `/tai-khoan`
- **Pros:** Simpler checkout page implementation.
- **Cons:** High user friction if a customer wants to ship to an office or alternative address.
- **Rejected:** Standard e-commerce pattern (e.g., Shopee) allows selecting and saving addresses directly at checkout.

## Consequences

- **Performance:** Address book cards load in **~50ms** (down from ~10s), eliminating client-side request waterfalls.
- **Maintainability:** Extracted `AddressStep.tsx` keeps `thanh-toan/page.tsx` clean and modular.
- **User Experience:** Seamless address selection and creation for logged-in users; guest users continue to see the standard delivery form.
- **Testing:** Unit test suite (`npx vitest run`) and TypeScript build (`npx tsc --noEmit`) pass clean with 0 errors.
