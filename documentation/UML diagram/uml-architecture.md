# Architectural Specification & UML Diagrams - Alma Dungduong E-Commerce

This index links to each individual UML diagram and specification file separated into pure Mermaid code files for easy viewing and maintenance.

---

### 📂 Diagrams & Specifications Index

1. **[Complete Project Master Architecture Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/master-architecture.md)**
   - Unified master Mermaid diagram (`graph TB`) connecting all Storefront views, Admin views, State Stores, Context Providers, Middleware, API Controllers, Core Libraries, Prisma Database Tables, and External Cloud Services.

2. **[Database Entity Relationship Diagram (ERD / Class Diagram)](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/database-erd.md)**
   - Pure Mermaid `erDiagram` modeling all 19 database entities, primary/foreign keys, attributes, and relationships.

3. **[Multi-Layer System Architecture Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/system-architecture.md)**
   - Pure Mermaid `graph TB` diagram mapping Presentation, Client State, API Controllers, Core Services, and External Infrastructure.

4. **[Order Checkout & SePay Webhook Sequence Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/checkout-sequence.md)**
   - Pure Mermaid `sequenceDiagram` detailing order creation, VietQR generation, status polling, and SePay HMAC webhook validation.

5. **[User Authentication & Password Reset Sequence Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/auth-sequence.md)**
   - Pure Mermaid `sequenceDiagram` detailing password reset request generation, Gmail SMTP email transmission, and token verification.

6. **[Admin Product & Cloudinary Storage Sequence Diagram](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/cloudinary-sequence.md)**
   - Pure Mermaid `sequenceDiagram` detailing multipart image streaming to Cloudinary and database asset purging on deletion.

7. **[File Exclusion Matrix](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/file-exclusion.md)**
   - Rationale and list of files excluded from UML modeling (configs, tests, seeders, static assets).
