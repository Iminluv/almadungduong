# Architectural Specification & UML Diagrams - Alma Dungduong E-Commerce

This index links to each individual UML diagram and specification file separated into pure Mermaid code files for easy viewing and maintenance.

---

### 📂 Diagrams & Specifications Index

1. **[Complete Project Master Architecture Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/master-architecture.md)**
   - Unified master Mermaid diagram (`graph TB`) connecting all Storefront views, Admin views, State Stores, Context Providers, Middleware, API Controllers, Core Libraries, Prisma Database Tables, and External Cloud Services (Brevo SMTP, Cloudinary, SePay, Neon PG).

2. **[Database Entity Relationship Diagram (ERD)](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/database-erd.md)**
   - Pure Mermaid `erDiagram` modeling all 20 database entities (including `EmailVerificationToken`, `PasswordResetToken`, `Address`, `User`, `Order`, `Review`), primary/foreign keys, attributes, and relationships.

3. **[Multi-Layer System Architecture Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/system-architecture.md)**
   - Pure Mermaid `graph TB` diagram mapping Presentation, Client State, API Controllers, Core Services (Brevo SMTP Relay), and External Infrastructure.

4. **[Order Checkout & SePay Webhook Sequence Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/checkout-sequence.md)**
   - Pure Mermaid `sequenceDiagram` detailing Address Book selection (`AddressStep`), order creation, VietQR generation, status polling, SePay HMAC webhook validation, and Brevo HTML invoice dispatch.

5. **[User Authentication & Email Verification Sequence Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/auth-sequence.md)**
   - Pure Mermaid `sequenceDiagram` detailing user registration, 1-hour verification token generation, Brevo SMTP email delivery, token activation endpoint, credentials login gate, resend token flow, and password reset workflow.

6. **[Admin Product & Cloudinary Storage Sequence Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/cloudinary-sequence.md)**
   - Pure Mermaid `sequenceDiagram` detailing multipart image streaming to Cloudinary and database asset purging on deletion.

7. **[File Exclusion Matrix](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/UML%20diagram/file-exclusion.md)**
   - Rationale and list of files excluded from UML modeling (configs, tests, seeders, static assets).
