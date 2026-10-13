# Spec & Implementation Plan: Remove Phone Number from Register Flow

**Date:** October 13, 2026  
**Document ID:** SPEC-2026-10-13-REMOVE-PHONE-REGISTER  
**Status:** Approved for Implementation (Intent Confirmed via `/interview-me`)  
**Target Flow:** Customer Sign-up / Registration (`/tai-khoan`)  

---

## 1. Specification (Phase 1)

### 1.1 Objective
Streamline the customer registration journey on the website (`/tai-khoan`) by removing the phone number input from the registration form UI and updating the registration API payload accordingly. 
- **User:** New visitors and prospective customers signing up for an account.
- **Why now:** Eliminate unnecessary form fields at sign-up, reduce friction and abandonment rates, allowing users to register quickly with only Name, Email, and Password.
- **Success:** Registration form renders only Name, Email, and Password; account creation succeeds without sending a phone number; email verification continues as expected; phone numbers remain supported elsewhere in the system (Profile, Address Book, Checkout).

### 1.2 Tech Stack
- **Framework:** Next.js 16.2.4 (App Router)
- **UI & State:** React 19.2.4, Framer Motion 12.38.0, Tailwind CSS 4
- **ORM & Database:** Prisma 7.8.0, PostgreSQL (via `@prisma/adapter-pg`)
- **Testing:** Vitest 4.1.6, Testing Library

### 1.3 Executable Commands
```bash
# Development
npm run dev

# Testing
npm run test

# Linting & Formatting
npm run lint
npm run format:check

# Type checking / Production build
npm run build
```

### 1.4 Project Structure
- `src/app/tai-khoan/AccountView.tsx` — Registration form UI, state management, and submit handler.
- `src/app/api/auth/register/route.ts` — Backend registration API endpoint.
- `src/__tests__/register.test.ts` — Unit/integration tests for registration endpoint without phone number.
- `prisma/schema.prisma` — Existing database schema (`User.phone` remains `String?`, no migration needed).

### 1.5 Code Style
Follow idiomatic React 19 / TypeScript conventions used throughout the repository:
```typescript
// Example: src/app/api/auth/register/route.ts
const body = await request.json();
const { name, email, password } = body;

if (!email || !password) {
  return NextResponse.json(
    { error: "Vui lòng điền đầy đủ email và mật khẩu." },
    { status: 400 }
  );
}

const user = await prisma.user.create({
  data: {
    name,
    email,
    hashedPassword,
    loyaltyTierId: defaultTier?.id || null,
  },
});
```

### 1.6 Testing Strategy
- **Framework:** Vitest (`npm run test`).
- **Target:** Verify that `/api/auth/register` creates user records with `phone: null` when phone is not provided, and doesn't fail or require `phone`.
- **UI Verification:** Run Next.js lint & build checks, and verify `AccountView.tsx` form states clean up properly.

### 1.7 Boundaries
- **Always do:**
  - Preserve `profilePhone` and all Profile tab editing functionality so customers can add or update their phone number post-registration.
  - Preserve Address Book (`Address.phone`) and Checkout contact phone validation for shipping carriers.
  - Maintain email verification token generation and email dispatch.
  - Run `npm run test` and `npm run build` after modifications.
- **Ask first:**
  - Any database schema migration on `prisma/schema.prisma` (currently unneeded as `phone` is already nullable).
- **Never do:**
  - Remove `phone` column from the PostgreSQL database or Prisma schema.
  - Alter the login, password reset, or checkout contact steps.

### 1.8 Success Criteria
1. The registration form in `/tai-khoan` displays 3 inputs only: Họ và tên (`registerName`), Email (`registerEmail`), and Mật khẩu (`registerPassword`).
2. Submitting registration sends `{ name, email, password }` to `/api/auth/register` without `phone`.
3. The user record is created in the database with `phone: null`.
4. Verification email is sent successfully.
5. Profile management (`profilePhone`), Address Book, Checkout, and Admin Customer views continue functioning without regressions.
6. TypeScript compilation, linting, and tests pass with 0 errors.

### 1.9 Open Questions
None. Intent and scope confirmed during `/interview-me` interview.

---

## 2. Implementation Plan (Phase 2)

### 2.1 Component Breakdown
```mermaid
graph TD
    UI[AccountView.tsx: Register Form] -->|Submits name, email, password| API[/api/auth/register/route.ts]
    API -->|Hashes password| BC[bcryptjs]
    API -->|Inserts User with phone: null| DB[(PostgreSQL via Prisma)]
    API -->|Generates Token & Sends Email| Mail[Nodemailer Verification]
    
    subgraph Retained Flows [Retained Unchanged Flows]
        P[Profile Tab: Update Phone]
        A[Address Book: Shipping Phone]
        C[Checkout: Contact Phone]
    end
```

### 2.2 Sequence of Work
1. **API Refactoring:** Update `/api/auth/register/route.ts` to omit `phone` from required body extraction and user creation.
2. **Client Component Refactoring:** Update `src/app/tai-khoan/AccountView.tsx`:
   - Remove `registerPhone` state.
   - Remove `registerPhone` field from `handleRegister` body payload.
   - Remove `setRegisterPhone("")` on success reset.
   - Remove `<input type="tel">` and label from the JSX.
3. **Automated Testing:** Add `src/__tests__/register.test.ts` to test registration logic.
4. **Verification & Build:** Run `npm run test`, `npm run lint`, and `npm run build`.

---

## 3. Implementable Tasks (Phase 3)

- [x] **Task 1: Update Register API Route (`/api/auth/register`)**
  - **Acceptance:** `/api/auth/register` extracts `{ name, email, password }`, creates user without needing `phone`, and sends verification email.
  - **Verify:** API code compiles cleanly with TypeScript without type errors.
  - **Files:** `src/app/api/auth/register/route.ts`

- [x] **Task 2: Update Register Form UI (`AccountView.tsx`)**
  - **Acceptance:** `registerPhone` state and the phone number input field are removed from the registration form. Profile phone editing remains intact.
  - **Verify:** Visual layout in `/tai-khoan` shows Name, Email, Password. Form resets and submits cleanly.
  - **Files:** `src/app/tai-khoan/AccountView.tsx`

- [x] **Task 3: Add Register Unit Test**
  - **Acceptance:** Test verifies `/api/auth/register` accepts request without phone and creates user with `phone: null`.
  - **Verify:** `npm run test` passes.
  - **Files:** `src/__tests__/register.test.ts`

- [x] **Task 4: Full Verification and Build Validation**
  - **Acceptance:** Code passes all lints and `npm run build` generates Next.js production bundle without errors.
  - **Verify:** `npm run lint` and `npm run build` succeed.
  - **Files:** None (verification step).
