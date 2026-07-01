# ADR-002: Full Lifecycle User Email Services, Password Reset & Token Auto-Cleanup

## Status
Accepted

## Date
2026-07-01

## Context
We need to expand the e-commerce platform's transaction confirmation capability into a comprehensive lifecycle notification layer. The required features include:
1. Sending emails on user registration, order creation (pending status with bank transfer details and QR), payment confirmation, manual claims submission, and loyalty tier rank upgrades.
2. Providing admin alerts on successful payment and manual verification claims.
3. Implementing a secure, self-contained password-reset mechanism.
4. Keeping the database clean by pruning expired password reset tokens automatically.

## Decisions

### 1. Hybrid Email Template Formats (HTML + Plain Text)
- **Decision:** Keep the existing payment confirmation email `sendOrderConfirmation` in **HTML** (as customers expect visual styling for invoices). All other new emails (Welcome, Order Pending, Claim Received, Password Reset, Loyalty Rank Upgrade, Admin Alerts) are implemented in **Plain Text** using Resend's `text` field option.
- **Rationale:** Plain-text format is highly reliable, robust against rendering variations in email clients, simple to write and localize, and eliminates potential HTML injection vulnerability vectors.

### 2. Dedicated `PasswordResetToken` Relational Model
- **Decision:** Implement password reset tokens using a separate table `PasswordResetToken` in PostgreSQL via Prisma:
  ```prisma
  model PasswordResetToken {
    id        String    @id @default(cuid())
    email     String
    token     String    @unique
    expiresAt DateTime
    usedAt    DateTime?
    createdAt DateTime  @default(now())

    @@index([email])
    @@index([expiresAt])
  }
  ```
- **Rationale:** Keeping tokens in a separate table keeps the `User` model clean of transient fields. Using a nullable `usedAt` field allows enforcing one-time use of the token while preserving an audit trail of password reset histories.

### 3. Asymmetric Security & Enumeration Prevention
- **Decision:** The forgot-password endpoint `/api/auth/forgot-password` returns `200 OK` with a success status string regardless of whether the email exists in the database.
- **Rationale:** Prevents email discovery/user enumeration attacks.

### 4. Dual-Strategy Expired Token Cleanup (Lazy + Explicit)
- **Decision:** Implement automatic cleanup of expired reset tokens using two strategies:
  1. **Lazy Cleanup:** Every forgot-password API request calls the cleanup helper asynchronously (non-blocking) to delete tokens where `expiresAt < now()`.
  2. **Explicit Administrative Route:** Create `/api/auth/cleanup-tokens` (secured to the `"admin"` user role check) which handles manual cleanup triggers or future cron/scheduled jobs.
- **Rationale:** Ensures database size does not grow indefinitely with expired tokens while avoiding the overhead of external polling or schedulers for basic operations.

### 5. Regex-based Vietnamese Loyalty Condition Parsing
- **Decision:** Upgrades of loyalty tiers are monitored on transaction completion in the payment webhook. Tiers are queried and checked dynamically by parsing their condition thresholds in Vietnamese text (e.g. "Tổng chi tiêu > 5 triệu") using a matching pattern `/(\d+)\s*triệu/`.
- **Rationale:** Allows dynamic mapping against database-configured tiers and thresholds without hardcoding specific rule margins.

## Alternatives Considered

### Storing Tokens on the `User` Model
- **Pros:** Avoids creating a database table.
- **Cons:** Requires adding `resetToken`, `resetTokenExpiry`, and `resetTokenUsed` to the User schema, polluting user records.
- **Rejected:** Relational normalization is cleaner and indexable.

### Sending HTML for all emails
- **Pros:** Consistent aesthetic styling.
- **Cons:** High development overhead, potential client-side layout breakage, harder to update text templates.
- **Rejected:** The client requested plain emails.

## Consequences
- Requires Neon database schema synchronization (`prisma db push`).
- Two new environment variables are utilized: `NEXT_PUBLIC_BASE_URL` (for building the dynamic absolute link) and `ADMIN_EMAIL` (for receiving admin alert notifications).
- The transaction webhook processes loyalty checks asynchronously to prevent delays or webhook timeout failures on database operations.
