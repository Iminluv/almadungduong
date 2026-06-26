# Phase 0 Documentation: Schema & Auth Guard

Completed on: **2026-06-26**

## Accomplishments

### 1. Database Schema Update
- Modified `prisma/schema.prisma` to add the `role` field on the `User` model:
  ```prisma
  role            String    @default("user")
  ```
- Executed `npx prisma db push` to push the schema to the PostgreSQL database (Neon), updating the tables without data loss.

### 2. Admin User Bootstrapping
- Created a bootstrapping script at [set_admin.ts](file:///d:/Projects/almadungduong/prisma/set_admin.ts).
- Executed the script (`npx tsx prisma/set_admin.ts`) to create a new admin account:
  * **Email:** `admin@almadungduong.com`
  * **Password:** `46f532c760faAd1!`
  * **Role:** `admin`

### 3. NextAuth Configuration Updates
- Modified [auth.ts](file:///d:/Projects/almadungduong/src/lib/auth.ts) to:
  * Fetch the `role` field in credentials authorization.
  * Fetch and update the `role` field from the database in the `jwt` callback.
  * Pass and assign the `role` to the session's `user` object in the `session` callback.
- Added type declarations in [next-auth.d.ts](file:///d:/Projects/almadungduong/src/types/next-auth.d.ts) to augment `User`, `Session`, and `JWT` interfaces for custom properties (`role`, `loyaltyTierId`, `phone`), avoiding compiler type errors.

### 4. Route Protection Middleware
- Modified [middleware.ts](file:///d:/Projects/almadungduong/src/middleware.ts) to match `/admin/:path*` routes and check for standard/secured NextAuth session token cookies. If not logged in, it edge-redirects users to `/tai-khoan`.

### 5. Layout & Dashboard Frame
- Created a placeholder client-side Admin shell layout at [AdminShell.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminShell.tsx).
- Created a server-side layout at [layout.tsx](file:///d:/Projects/almadungduong/src/app/admin/layout.tsx) that enforces `role === "admin"` check.
- Created a landing view page at [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/page.tsx).

---

## Verification Status
- Checked the TypeScript compiler using `npx tsc --noEmit`. Compiles successfully with **0 errors**.
- Database successfully synchronized.
- Admin bootstrap successfully executed.
