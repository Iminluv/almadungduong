# Phase 1: Database Migration & Schema Setup

**Date:** October 13, 2026  
**Feature:** Phone Number Verification (ADR-007)  
**Status:** Completed & Verified  

---

## 1. Summary of Changes

Applied the necessary database schema extensions to support OTP-based phone number verification without disrupting existing user accounts.

### Schema Modifications (`prisma/schema.prisma`):
1. **`User` Model Extension:**
   - Added `phoneVerified DateTime?` (nullable timestamp, mirrors `emailVerified`).
   - Added `phoneOtpTokens PhoneOtpToken[]` relation.
2. **`PhoneOtpToken` Model Created:**
   - `id`: `String @id @default(cuid())`
   - `phone`: `String` (normalized E.164 format, e.g. `+84901234567`)
   - `otp`: `String` (bcrypt hash of the 6-digit OTP code)
   - `userId`: `String` (relation to `User.id` with `onDelete: Cascade`)
   - `providerUsed`: `String?` (logs whether `'bird'` or `'esms'` was used for delivery)
   - `expiresAt`: `DateTime` (10-minute validity)
   - `usedAt`: `DateTime?` (consumed timestamp)
   - `createdAt`: `DateTime @default(now())`
   - Indexes added: `@@index([phone])`, `@@index([userId])`, `@@index([expiresAt])`.

---

## 2. Doubt-Driven Verification

- **CLAIM:** Schema changes are 100% backward-compatible with existing users in PostgreSQL / NeonDB.
- **Verification Result:**
  - `phoneVerified` is nullable (`DateTime?`), ensuring all existing users seamlessly load with `phoneVerified: null`.
  - Application-level uniqueness check is used instead of a strict `@unique` database constraint on `User.phone`, preventing conflicts with historical records or empty phone fields.
  - Cascade deletion on `PhoneOtpToken.user` guarantees orphaned OTP records are automatically cleaned up if an unverified user account is deleted.
  - `npm run db:push` succeeded cleanly against NeonDB in 11.81s.
  - `prisma generate` updated client types in `@prisma/client`.

---

## 3. Next Steps (Phase 2)
Implement the core SMS service abstraction in `src/lib/sms.ts` featuring `BirdSmsProvider`, `EsmsSmsProvider`, and `ChainedSmsProvider` with automatic fallback logic.
