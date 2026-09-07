# Project Structure - Alma Dungduong E-commerce

This document provides a comprehensive overview of the file structure and folder architecture of the **Alma Dungduong** e-commerce website. The project is built using **Next.js 16 (App Router)** with **React 19**, styled using **Tailwind CSS v4**, and connected to a serverless **Neon PostgreSQL** database using **Prisma 7**.

---

## 📂 Directory Tree Overview

Below is the directory tree highlighting the key source files and configurations:

```
almadungduong/
├── .github/                  # GitHub workflow templates and issue formats
│   └── PULL_REQUEST_TEMPLATE.md
├── documentation/            # Implementation details, migrations, specs and reports
│   ├── task_report.md        # Comprehensive report of completed tasks
│   ├── 2-6-26/               # Product catalog, category/tag, review, and image normalization & seed docs
│   │   ├── category_tag_normalization.md
│   │   ├── database_migration_seeding.md
│   │   ├── frontend_integration_routing.md
│   │   ├── product_image_normalization.md
│   │   └── product_reviews_normalization.md
│   ├── 4-6-26/               # User Account feature implementation reports (Phases 1-10)
│   │   ├── phase-1-2-report.md
│   │   ├── phase-3-4-report.md
│   │   ├── phase-5-6-report.md
│   │   ├── phase-7-8-report.md
│   │   └── phase-9-10-report.md
│   ├── 6-6-26/               # SePay payment integration report (VietQR, HMAC webhook, auto-polling)
│   │   └── sepay-integration-report.md
│   ├── 19-6-26/              # Content protection (anti-copy, F12 blocker) system report
│   │   └── content-protection-report.md
│   ├── 26-06-26/             # Admin panel specs for dashboard, orders, products, settings, etc.
│   │   ├── phase-0-schema-auth.md
│   │   ├── phase-1-dashboard.md
│   │   ├── phase-2-orders.md
│   │   ├── phase-3-customers.md
│   │   ├── phase-4-products.md
│   │   ├── phase-5-settings.md
│   │   └── phase-6-ui-shell.md
│   ├── 01-07-26/             # ADR for full-lifecycle email & password reset services
│   │   └── adr-email-services.md
│   ├── 22-07-26/             # ADRs for Gmail SMTP migration and Cloudinary direct image upload
│   │   ├── adr-003-gmail-smtp-migration.md
│   │   └── adr-004-cloudinary-image-upload.md
│   └── 02-08-26/             # UML Architecture diagrams & file exclusion specifications
│       ├── auth-sequence.md
│       ├── checkout-sequence.md
│       ├── cloudinary-sequence.md
│       ├── database-erd.md
│       ├── file-exclusion.md
│       ├── master-architecture.md
│       ├── system-architecture.md
│       └── uml-architecture.md
├── prisma/                   # Prisma ORM schema and database seeding
│   ├── schema.prisma         # Relational database schema definition (including PasswordResetToken)
│   ├── products_seed_data.ts # Normalized products list data for seeding
│   ├── reviews_seed_data.ts  # Normalized product reviews data for seeding
│   ├── extract_reviews.py    # Python helper script to extract spreadsheet reviews
│   ├── seed.ts               # Database seed script for loyalty, categories, and products
│   ├── set_admin.ts          # Seed script to create/reset the admin user account details
│   └── sync_custom.ts        # Database custom sync script for free shipping & test product
├── public/                   # Public static assets
│   ├── images/               # Image resources (e.g., hero banners, results)
│   ├── file.svg / globe.svg  # Default brand/system vector assets
│   └── robots.txt            # Static robots rule configuration
├── scratch/                  # Scratchpad diagnostic and migration scripts
│   ├── check_db_version.ts   # Check database engine version and settings
│   ├── check_tokens.ts       # Diagnostic script inspecting password reset tokens
│   ├── convert_to_relative.ts# Converts absolute Cloudinary URLs to relative paths
│   ├── test_all_email_workflows.ts # E2E test script verifying all Nodemailer email templates
│   └── test_real_email.ts    # Diagnostic script executing live SMTP test email dispatch
├── src/                      # Application Source Code
│   ├── __tests__/            # Unit testing suite (Vitest)
│   │   ├── setup.ts          # Test setup & configuration
│   │   ├── email.test.ts     # Email library unit tests (Gmail SMTP Nodemailer mock)
│   │   └── loyalty.test.tsx  # Loyalty program frontend tests
│   ├── app/                  # Next.js App Router pages and API routes
│   │   ├── admin/            # Admin Panel frontend views (dashboard, orders, products, etc.)
│   │   │   ├── customers/    # Customer list & detail views (+ loading skeleton)
│   │   │   ├── orders/       # Orders queue & detail viewer (+ loading skeleton)
│   │   │   ├── products/     # Catalog editor, creator and modifier forms (+ loading skeleton)
│   │   │   ├── settings/     # Global configurations tabs (+ loading skeleton)
│   │   │   ├── layout.tsx    # Admin dashboard sidebar and shell layout
│   │   │   └── loading.tsx   # Global admin loading skeleton view
│   │   ├── api/              # Route handlers / backend endpoints
│   │   │   ├── admin/        # Admin restricted REST API endpoints (stats, products, settings, upload)
│   │   │   ├── auth/         # NextAuth auth, registration, password reset & cleanup endpoints
│   │   │   ├── checkout/     # Order creation and SePay checkout initiation API
│   │   │   ├── claim-transfer/ # Manual checkout claim notifications API
│   │   │   ├── loyalty/      # Loyalty Program API endpoints
│   │   │   ├── payment-status/ # Dynamic status checker API by transaction code
│   │   │   ├── products/     # Product listing, filtering, and detail API endpoints
│   │   │   ├── sepay-webhook/# Secure callback endpoint validating HMAC signatures
│   │   │   ├── shipping/     # Shipping rates API endpoint
│   │   │   └── user/         # Customer profile, addresses, favorites, and orders API routes
│   │   ├── blog/             # Brand blog page & article details
│   │   ├── chung-chi/        # Quality certifications and reports page
│   │   ├── ket-qua/          # Checkout results / order status
│   │   ├── khach-hang-than-thiet/ # Loyalty program views
│   │   ├── san-pham/         # Product catalog and detail views
│   │   ├── tai-khoan/        # Customer account dashboard, auth views & reset-password flow
│   │   │   └── reset-password/ # Password reset form page using reset token
│   │   ├── thanh-toan/       # Checkout/payment forms
│   │   ├── ve-chung-toi/     # "About Us" and brand history page
│   │   ├── globals.css       # Global styles & Tailwind CSS v4 configuration
│   │   ├── layout.tsx        # Application root layout with components wrappers
│   │   ├── middleware.ts     # Edge-compatible routing pass-through middleware
│   │   ├── page.tsx          # Homepage view entry point
│   │   ├── robots.ts         # Dynamic search engine crawler policy handler
│   │   └── sitemap.ts        # Dynamic XML sitemap generator
│   ├── components/           # Reusable React UI Components
│   │   ├── admin/            # Admin Panel controls (forms, grids, editors, sidebars, stats)
│   │   ├── cart/             # Shopping cart components (drawer, badge)
│   │   ├── checkout/         # SePay payment QR & polling modal components
│   │   ├── home/             # Homepage-specific components
│   │   ├── layout/           # Shared page wrappers (Header, Footer, Chat widget, AnnouncementBar)
│   │   ├── products/         # Product listing filters, review cards, mobile filter
│   │   ├── providers/        # Context providers (AuthProvider, ContentProtectionProvider)
│   │   └── ui/               # Core design system atomic elements (button, inputs, product cards, toasts)
│   ├── lib/                  # Application core services & shared utilities
│   │   ├── store/            # Client state stores (Zustand)
│   │   │   ├── useCart.ts    # Cart state store
│   │   │   └── useFavorites.ts # Wishlist state store
│   │   ├── auth.ts           # NextAuth central authentication config
│   │   ├── caseStudies.ts    # Scientific skin treatment case studies dataset
│   │   ├── cloudinary.ts     # Cloudinary SDK configuration & deletion helper
│   │   ├── data.ts           # Mock & fallback static product data
│   │   ├── db.ts             # Prisma Client Postgres singleton adapter
│   │   ├── email.ts          # Gmail SMTP (Nodemailer) transaction email utilities & templates
│   │   ├── notifications.ts  # Centralized developer logging/notification service stubs
│   │   ├── sepay.ts          # SePay API v2 client integration & QR generator
│   │   ├── token-cleanup.ts  # Database cleanup routine for expired password reset tokens
│   │   ├── use-content-protection.ts # Client hooks managing anti-dev-tools & click restrictions
│   │   ├── useImageUpload.ts # Client hook managing local device image uploads to Cloudinary
│   │   └── utils.ts          # Tailwind styling helpers (`cn`)
│   └── types/                # TypeScript type declarations
│       └── next-auth.d.ts    # NextAuth session and JWT module augmentations
├── commitlint.config.js      # Commitlint configuration rules for Git commits
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js bundler configuration
├── package.json              # Project dependencies, scripts, metadata
├── postcss.config.mjs        # PostCSS configuration for Tailwind CSS v4
├── prettier.config.js        # Code formatter options
├── prisma.config.ts          # Prisma 7 custom config
├── tsconfig.json             # TypeScript rules configuration
└── vitest.config.ts          # Vitest unit test runner settings
```

---

## 🗂️ Detailed Directory Breakdowns

### 1. Root Configuration Files
These files govern linting, bundler settings, typing, testing, and database rules:

| File | Path / Link | Purpose |
| :--- | :--- | :--- |
| `package.json` | [package.json](file:///Users/iminluv/Documents/GitHub/almadungduong/package.json) | Lists dependencies (React 19, Next.js 16, Prisma 7, Zustand, Tailwind 4, Nodemailer) and custom scripts (`dev`, `build`, `db:seed`, `vitest`). |
| `next.config.ts` | [next.config.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/next.config.ts) | Next.js execution parameters and image domain whitelist configurations (e.g., Cloudinary `res.cloudinary.com`). |
| `tsconfig.json` | [tsconfig.json](file:///Users/iminluv/Documents/GitHub/almadungduong/tsconfig.json) | Dictates compile options and path aliases (e.g. `@/*` mapping to `./src/*`). |
| `vitest.config.ts` | [vitest.config.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/vitest.config.ts) | Custom test runner setup targeting React hooks, Nodemailer mocks, and DOM renderings. |
| `prisma.config.ts` | [prisma.config.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma.config.ts) | Standard Prisma 7 datasource file configuration. |
| `eslint.config.mjs` | [eslint.config.mjs](file:///Users/iminluv/Documents/GitHub/almadungduong/eslint.config.mjs) | ESLint linter configuration rules. |
| `prettier.config.js` | [prettier.config.js](file:///Users/iminluv/Documents/GitHub/almadungduong/prettier.config.js) | Defines code style standards and spacing formatting. |
| `postcss.config.mjs` | [postcss.config.mjs](file:///Users/iminluv/Documents/GitHub/almadungduong/postcss.config.mjs) | Configures CSS preprocessing rules for Tailwind CSS v4. |
| `commitlint.config.js` | [commitlint.config.js](file:///Users/iminluv/Documents/GitHub/almadungduong/commitlint.config.js) | Defines rules for standardizing Git commit messages. |
| `test-prisma.ts` | [test-prisma.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/test-prisma.ts) | Quick test diagnostic script verifying Prisma client connectivity. |
| `README.md` | [README.md](file:///Users/iminluv/Documents/GitHub/almadungduong/README.md) | Standard documentation covering local setup, environment variables, and build options. |

---

### 2. `prisma/` — Database Operations & Schema
Responsible for schema definitions, migrations, and test data seed populations.

*   [schema.prisma](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/schema.prisma): Outlines the relational models for the database:
    *   `LoyaltyTier`: Tracks customer tiers (e.g. *Ươm mầm*, *Dung dưỡng*, *Nở rộ*) along with order rules.
    *   `LoyaltyBenefit`: Specific benefits assigned to each tier.
    *   `LoyaltyConfig`: Global key-value store for static loyalty configuration.
    *   `Product`: Represents items in the catalog (pricing, ratings, slug, homepage feature status, published state) and tracks favorites.
    *   `Category`: Hierarchical product category classification (parent/children relationships).
    *   `Tag`: Labels for products (e.g., *Deal tháng*, *Bán chạy nhất*).
    *   `ProductImage`: Product gallery photo URLs with display ordering.
    *   `Review`: Customer ratings, verified purchase status, and review comments.
    *   `ShippingZone`: Regional groups (e.g., National `VN` zone) for shipping rates.
    *   `ShippingRate`: Base delivery costs, free tier eligibility threshold, and active states.
    *   `User`: Customer profile details, total accumulated spend, role (`user` / `admin`), hashed passwords, and loyalty tier bounds.
    *   `Account` / `Session`: OAuth credentials links and server-side user authentication tracking.
    *   `Address`: User-owned shipping addresses for auto-filling and checkout.
    *   `Favorite`: Wishlist tracking correlating users and catalog products.
    *   `Order`: Represents buyer transaction sessions, status indicators (`pending` / `completed` / `expired`), transfer codes, pricing fields, user claim flags, and snapshot shipping/bank logs.
    *   `OrderItem`: Relates purchased products, prices, and quantities to parent orders.
    *   `WebhookLog`: Records incoming raw transaction payloads from payment gateway webhooks for HMAC check and idempotent processing.
    *   `PasswordResetToken`: Stores hashed/unique password reset tokens, expiration dates (`expiresAt`), usage status (`usedAt`), and associated user email index.
*   [products_seed_data.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/products_seed_data.ts): Static database seed configuration listing core products, tags, and category keys.
*   [reviews_seed_data.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/reviews_seed_data.ts): Imported review items matching specific product keys.
*   [extract_reviews.py](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/extract_reviews.py): Python data extraction script to process external feedback worksheets into TypeScript objects.
*   [seed.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/seed.ts): Cleans the Postgres tables and seeds them with baseline configurations, loyalty settings, product catalogs, categories, tags, product images, reviews, and delivery rates.
*   [set_admin.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/set_admin.ts): Utility database execution script checking if the default admin account exists, creating it if missing (or resetting its password and role if present).
*   [sync_custom.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/sync_custom.ts): Targeted synchronization script that sets the shipping base fee to 0 VND and upserts the test product without clearing existing user, order, or webhook tables.

---

### 3. `src/lib/` — Core Modules and Utilities
Acts as the central point for shared modules, API fetch instances, and global stores:

*   [db.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/db.ts): Manages server connection pools with Neon Postgres using Prisma's pg adapter (`@prisma/adapter-pg`). Maintains client singleton patterns in development modes.
*   [auth.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/auth.ts): NextAuth v5 central authentication configuration supporting email Credentials (bcrypt comparison) and Google OAuth providers, mapping callbacks to attach user metadata (`role`, `phone`, `loyaltyTierId`).
*   [caseStudies.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/caseStudies.ts): Standard database for before-and-after skin improvement evaluations, categorizing treatments (e.g., *Mỏng yếu*, *Thâm nám*, *Viêm mụn*) alongside image references.
*   [cloudinary.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/cloudinary.ts): Configures Cloudinary SDK v2 credentials, provides `extractPublicId()` URL parser, and exports `deleteCloudinaryImage()` for automatic asset destruction on Cloudinary upon DB record deletion.
*   [useImageUpload.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/useImageUpload.ts): Custom React hook managing local device image file selection, client-side validation (MIME types & 5MB size limit), upload state, and API streaming to `/api/admin/upload`.
*   [data.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/data.ts): Local fallback file storing static information such as products list, blog posts, reviews, and categories.
*   [sepay.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/sepay.ts): Orchestrates communication with SePay API v2 (automatically routing requests to sandbox or live endpoints based on API Key prefix) and generates VietQR endpoints for client banking transfers.
*   [notifications.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/notifications.ts): Developer alerts system stub supporting console reporting of critical payment failures or mismatch errors.
*   [email.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/email.ts): Wraps **Nodemailer (Gmail SMTP)** to construct and transmit order confirmation HTML emails, welcome notes, password reset links, order pending notices, loyalty rank upgrades, and admin alerts.
*   [token-cleanup.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/token-cleanup.ts): Database cleanup function (`cleanupExpiredTokens()`) removing expired tokens from `PasswordResetToken`.
*   [use-content-protection.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/use-content-protection.ts): React client hook implementing anti-dev-tools detection (via viewport dimensions) and event handlers to block copy commands, right clicks, and source view keystrokes.
*   [utils.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/utils.ts): Shared layout utilities like `cn` (clsx + tailwind-merge) to cleanly join classnames together.
*   `store/`:
    *   [useCart.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/store/useCart.ts): **Zustand** client-side cart manager. Handles items additions, deductions, calculations, and cart drawer visibility toggles.
    *   [useFavorites.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/store/useFavorites.ts): **Zustand** client-side wishlist state manager. Handles optimistic toggling, API synchronization, and state updates across catalog card/details pages.

---

### 4. `src/app/` — Router, Routing & Layouts
Standard Next.js App Router structure. Each subfolder maps to a page endpoint:

*   [globals.css](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/globals.css): Declares Tailwind CSS v4 inputs, CSS variables, and keyframe animations.
*   [layout.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/layout.tsx): Top-level layout declaring HTML structures, font family loadings, announcement bars, standard header, footer, and chat widget wrapper components. Injected with `AuthProvider` and `ContentProtectionProvider` wrappers.
*   [middleware.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/middleware.ts): Edge-compatible routing pass-through middleware, protecting sessions without database conflicts at the edge.
*   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/page.tsx): Main landing page. Combines hero carousel, scientific information highlights, monthly deals, product carousels, and client testimonials.
*   [robots.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/robots.ts) / [sitemap.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/sitemap.ts): Dynamic SEO metadata generators for search engine crawling.

#### Client Pages & Views
*   `blog/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/page.tsx) / [BlogView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/BlogView.tsx): Displays published articles list.
    *   `[slug]/`: Dynamic routes displaying full details of individual articles ([page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/[slug]/page.tsx) / [BlogDetailView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/[slug]/BlogDetailView.tsx)).
*   `chung-chi/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/chung-chi/page.tsx) / [ChungChiView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/chung-chi/ChungChiView.tsx): Displays full certification profiles, registration documents, and SPF/skin irritation test results.
*   `ket-qua/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ket-qua/page.tsx) / [ResultsView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ket-qua/ResultsView.tsx): Landing point displaying success banners after transactions.
*   `khach-hang-than-thiet/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/khach-hang-than-thiet/page.tsx) / [LoyaltyView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/khach-hang-than-thiet/LoyaltyView.tsx): Renders the customer loyalty dashboard, program tier information, points calculations, and benefit lists.
*   `san-pham/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/page.tsx) / [ProductsContent.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/ProductsContent.tsx): Main catalog display with filter sidebar, product grid, sorting mechanisms, and search capabilities.
    *   `[slug]/`: Dynamic routes detailing specific products, volumes, ingredients, features, and certifications ([page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/[slug]/page.tsx) / [ProductDetailView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/[slug]/ProductDetailView.tsx)).
*   `tai-khoan/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/tai-khoan/page.tsx) / [AccountView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/tai-khoan/AccountView.tsx): User authentication tabs (login/signup, Google OAuth, forgot password modal) and member dashboard featuring overview tier progress, orders, addresses CRUD, wishlist, and profile details.
    *   `reset-password/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/tai-khoan/reset-password/page.tsx): Secure reset password entry page validating token query parameters.
*   `thanh-toan/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/thanh-toan/page.tsx): Interactive checkout page pre-filled automatically with details from the user's active session and default address, supporting unauthenticated guest checkout.
*   `ve-chung-toi/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ve-chung-toi/page.tsx) / [AboutView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ve-chung-toi/AboutView.tsx): Documents the brand's history and scientific foundations.

#### Admin Dashboard Views (`src/app/admin/`)
*   [layout.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/layout.tsx): Admin shell loader protecting dashboard subpaths under explicit checks for user sessions carrying the `"admin"` role.
*   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/loading.tsx): Core analytics homepage compiling statistics feeds (sales charts, summaries).
*   `customers/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/customers/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/customers/loading.tsx): Lists customer names, loyalty states, total purchase amounts.
    *   `[id]/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/customers/[id]/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/customers/[id]/loading.tsx): Complete customer timeline, profile fields, address directory, and order histories.
*   `orders/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/orders/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/orders/loading.tsx): Main orders list supporting filters by status.
    *   `[id]/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/orders/[id]/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/orders/[id]/loading.tsx): Details of individual sales orders, custom transfer verification claims, bank logs, and completion toggles.
*   `products/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/products/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/products/loading.tsx): Relational table catalog management view with inline quick-edits.
    *   [new/page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/products/new/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/products/new/loading.tsx): React Hook form page to compile and create new inventory objects.
    *   `[id]/edit/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/products/[id]/edit/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/products/[id]/edit/loading.tsx): Interactive view to edit product properties and modify image gallery layouts.
*   `settings/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/settings/page.tsx) / [loading.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/admin/settings/loading.tsx): Interactive tab dashboard to adjust shipping zones, basic rates, loyalty points brackets, tier margins, and benefit lists.

#### API Route Handlers
*   `api/auth/`:
    *   `[...nextauth]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/auth/[...nextauth]/route.ts): NextAuth API catch-all handler.
    *   `register/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/auth/register/route.ts): Registration controller creating user account and hashing password.
    *   `forgot-password/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/auth/forgot-password/route.ts): Generates reset token and dispatches reset email via Nodemailer.
    *   `reset-password/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/auth/reset-password/route.ts): Validates reset token and updates user password in database.
    *   `cleanup-tokens/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/auth/cleanup-tokens/route.ts): Endpoint executing expired password reset token purge.
*   `api/checkout/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/checkout/route.ts): Initiates and constructs database `Order` records, calculates totals and shipping fees, fetches bank details from SePay, and supplies transaction credentials back to client.
*   `api/claim-transfer/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/claim-transfer/route.ts): Processes user-initiated manual verification claims if an order is unpaid. Sends notification email to admin system.
*   `api/loyalty/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/loyalty/route.ts): Backend route handler returning loyalty details and config mappings.
*   `api/payment-status/` -> `[transferCode]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/payment-status/[transferCode]/route.ts): Pollable status endpoint enabling the checkout page to detect transaction progression (`pending` to `completed`/`expired`).
*   `api/products/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/products/route.ts): Queries and returns all active products including relational tags, images, and reviews.
*   `api/products/[slug]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/products/[slug]/route.ts): Queries and returns details of a single product based on its unique slug.
*   `api/sepay-webhook/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/sepay-webhook/route.ts): Processes incoming SePay payment notifications. Employs timing-safe cryptographic SHA256 HMAC verification (with timestamp drift prevention) or bearer-auth matching, transitioning corresponding order rows to `completed`.
*   `api/shipping/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/shipping/route.ts): Queries and returns current national flat-rate shipping policies.
*   `api/user/` -> Contains customer profile handlers (`/api/user/profile`), addresses CRUD operations (`/api/user/addresses`), favorites wishlist toggles (`/api/user/favorites`), and order history query feeds (`/api/user/orders`).
*   `api/admin/` (Secured REST controller endpoints):
    *   `upload/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/upload/route.ts): Accepts multipart image files, validates MIME types & size (≤ 5MB), and streams directly to Cloudinary folder `almadungduong/products/`.
    *   `stats/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/stats/route.ts): Gathers dashboard statistics aggregates (sales, volume, active consumers list).
    *   `orders/[id]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/orders/[id]/route.ts): Updates specific order records or changes order state indicators manually.
    *   `products/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/products/route.ts): Queries products catalog or creates new item structures.
    *   `products/[id]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/products/[id]/route.ts): Retrieves individual product entries, updates existing fields, or removes records completely.
    *   `products/[id]/images/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/products/[id]/images/route.ts): Handles image uploads for product galleries.
    *   `products/[id]/images/[imageId]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/products/[id]/images/[imageId]/route.ts): Deletes specific photo items from PostgreSQL and automatically purges the asset from Cloudinary storage, or manages layout reordering inside the database.
    *   `settings/loyalty/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/settings/loyalty/route.ts): Reads or updates configuration tier parameters.
    *   `settings/shipping/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/admin/settings/shipping/route.ts): Reads or updates national flat-rate policies.

---

### 5. `src/components/` — User Interface Components
Components are sorted by subdirectories reflecting their application context:

#### Layout Components (`src/components/layout/`)
Global visual layouts wrap around multiple views:
*   [AnnouncementBar.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/AnnouncementBar.tsx): Top promotion banner.
*   [Header.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/Header.tsx): Fixed top navigation bar. Includes store logo, routing menus, search bars, user profiles (displaying user initials or Google avatars when logged in), and interactive shopping cart status indicator.
*   [Footer.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/Footer.tsx): Bottom page layout with site links, copyright details, and social channels.
*   [ChatWidget.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/ChatWidget.tsx): Sticky floating live chat component.

#### Cart Components (`src/components/cart/`)
*   [CartDrawer.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/cart/CartDrawer.tsx): A slide-out sidebar from the right displaying items currently added to the cart, options to increment/decrement quantities, total pricing, and quick buttons to proceed to the checkout route.

#### Checkout Components (`src/components/checkout/`)
*   [CheckoutModal.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/checkout/CheckoutModal.tsx): Interactive overlay modal rendered during order completion. Renders dynamic bank transfer QR codes, counts down a 10-minute validity window, listens to transaction changes via status polling, handles user claim submissions, and executes cancellation behaviors.

#### Home Components (`src/components/home/`)
Widgets designed specifically for the front landing page:
*   [HeroCarousel.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/HeroCarousel.tsx): Banner carousels driven by Framer Motion animations.
*   [HeroSection.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/HeroSection.tsx): Static backup banner structure.
*   [Certifications.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/Certifications.tsx): Guaranteed badge highlights.
*   [CustomerFeedback.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/CustomerFeedback.tsx): Horizontal grid for buyer testimonials.
*   [MicrobialHighlights.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/MicrobialHighlights.tsx): Educates users about core microbiotics.
*   [MicrobialScienceBanner.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/MicrobialScienceBanner.tsx): Science-based cosmetics introduction banner.
*   [MonthlyDeal.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/MonthlyDeal.tsx): Dynamic monthly sales promotion section.
*   [ProductCarousel.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/ProductCarousel.tsx): Slider listing top products.
*   [ProductsFeatures.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/ProductsFeatures.tsx): General summaries of core product advantages.
*   [TrustStrip.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/TrustStrip.tsx): Details on shipping, return terms, and safety certifications.

#### Product Components (`src/components/products/`)
*   [FilterSidebar.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/products/FilterSidebar.tsx): Sidebar checklist allowing filtering by categories or skin concern types.
*   [MobileFilter.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/products/MobileFilter.tsx): Mobile-optimized filter slide-up panel.
*   [ReviewCard.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/products/ReviewCard.tsx): Standardized card displaying ratings, client reviewer names, dates, and comments.

#### Providers (`src/components/providers/`)
*   [AuthProvider.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/providers/AuthProvider.tsx): React Client Component wrapper for NextAuth `<SessionProvider>`, sharing session context across the DOM.
*   [ContentProtectionProvider.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/providers/ContentProtectionProvider.tsx): Listens to user interactions and blocks unauthorized copying, drag operations, context-menus, and triggers overlays when web inspect consoles are opened.

#### UI Primitives (`src/components/ui/`)
Standard design system modules reusable across the whole app:
*   [BeforeAfterSlider.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/BeforeAfterSlider.tsx): Interactive slider to compare before-and-after skin recovery results.
*   [Button.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/Button.tsx): General customized CTA button.
*   [DevToolsOverlay.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/DevToolsOverlay.tsx): Standardized full-screen prompt blocking user views when DevTools is detected.
*   [Input.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/Input.tsx): Interactive input fields.
*   [ProductCard.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/ProductCard.tsx): Displays individual items, tags, rating indicators, standard pricing, and wishlist favorite heart toggles.
*   [ToastNotification.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/ToastNotification.tsx): Toast banner warnings and success statuses.

#### Admin Panels Components (`src/components/admin/`)
*   [AdminBreadcrumb.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/AdminBreadcrumb.tsx): Page indicator display showing route levels.
*   [AdminShell.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/AdminShell.tsx): Outer layout block managing responsive views.
*   [AdminSidebar.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/AdminSidebar.tsx): Desktop/mobile sidebar listing settings, order queues, products, and customers.
*   [DataTable.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/DataTable.tsx): Reusable dashboard data grid rendering search boxes, column header sorting, and page switches.
*   [ImageEditor.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/ImageEditor.tsx): Product gallery files editor supporting additions, deletion, main image assignment, and drag-and-drop ordering.
*   [MarkCompletedButton.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/MarkCompletedButton.tsx): Quick status transition button for orders.
*   [ProductDeleteButton.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/ProductDeleteButton.tsx): Catalog delete button with confirmation drawer checks.
*   [ProductForm.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/ProductForm.tsx): Zod/React Hook Form mapping fields for product details updates.
*   [ProductInlineEditor.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/ProductInlineEditor.tsx): Table-row input components allowing immediate pricing/stock edits.
*   [SettingsForm.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/SettingsForm.tsx): Interface displaying tab views for custom rates, shipping thresholds, and tier programs.
*   [StatCard.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/StatCard.tsx): Displays numerical dashboard items (e.g. total revenue) side-by-side with icon widgets.
*   [StatusBadge.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/admin/StatusBadge.tsx): Renders custom badges (e.g. pending state yellow, completed state green).

---

### 6. `src/__tests__/` — Quality Assurance & Unit Testing
Uses **Vitest** for frontend element integration and backend logic testing:

*   [setup.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/__tests__/setup.ts): Extends standard matchers using `@testing-library/jest-dom`.
*   [email.test.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/__tests__/email.test.ts): Unit tests verifying Gmail SMTP Nodemailer email generation, template rendering, and mock transmission.
*   [loyalty.test.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/__tests__/loyalty.test.tsx): Tests the `LoyaltyView` components. Validates state transition behaviors from loading state spinners up to successful mock API resolutions.

---

### 7. `documentation/` — Quality Assurance & Audit Trails
Contains system execution plans, migration steps, architectural decisions, and development progress reports:

*   [task_report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/task_report.md): Summary report documenting connection configurations, seeding strategies, API development, and unit test logs for Phase 2/3/4 of the Loyalty Program.
*   `2-6-26/`: Date-stamped implementation blueprints detailing exact steps for database migration, schema synchronization, image normalizations, and product data cleaning logs:
    *   [category_tag_normalization.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-6-26/category_tag_normalization.md)
    *   [database_migration_seeding.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-6-26/database_migration_seeding.md)
    *   [frontend_integration_routing.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-6-26/frontend_integration_routing.md)
    *   [product_image_normalization.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-6-26/product_image_normalization.md)
    *   [product_reviews_normalization.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-6-26/product_reviews_normalization.md)
*   `4-6-26/`: Date-stamped reports covering all 10 phases of the User Account feature (dependency management, NextAuth configuration, addresses and favorites APIs, dashboard tabs, layout headers, and autofill checkout):
    *   [phase-1-2-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/4-6-26/phase-1-2-report.md)
    *   [phase-3-4-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/4-6-26/phase-3-4-report.md)
    *   [phase-5-6-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/4-6-26/phase-5-6-report.md)
    *   [phase-7-8-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/4-6-26/phase-7-8-report.md)
    *   [phase-9-10-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/4-6-26/phase-9-10-report.md)
*   `6-6-26/`:
    *   [sepay-integration-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/6-6-26/sepay-integration-report.md): Architectural guides covering the SePay payment system integration (VietQR generation, webhook security with HMAC-SHA256 timing validation, multi-channel admin alerts, and manual claiming mechanisms).
*   `19-6-26/`:
    *   [content-protection-report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/19-6-26/content-protection-report.md): Technical report detailing anti-copy restrictions, event listeners configuration, F12 inspector blocks, and verification testing logs.
*   `26-06-26/` (Admin Panel features implementation spec phases):
    *   [phase-0-schema-auth.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-0-schema-auth.md): Specifications for setting up NextAuth authorization role layers and database schema support.
    *   [phase-1-dashboard.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-1-dashboard.md): Details of the admin homepage metrics aggregation and visual shell components.
    *   [phase-2-orders.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-2-orders.md): Queue management lists and details viewer requirements for orders.
    *   [phase-3-customers.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-3-customers.md): Accounts records overview specifications.
    *   [phase-4-products.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-4-products.md): Forms and list grids requirements for product records.
    *   [phase-5-settings.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-5-settings.md): Dynamic shipping and loyalty configuration specs.
    *   [phase-6-ui-shell.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/26-06-26/phase-6-ui-shell.md): General layout integration guidelines.
*   `01-07-26/`:
    *   [adr-email-services.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/01-07-26/adr-email-services.md): Architectural Decision Record (ADR) detailing design decisions for full lifecycle email services, password reset flow, and expired token cleanup mechanics.
*   `22-07-26/`:
    *   [adr-003-gmail-smtp-migration.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/22-07-26/adr-003-gmail-smtp-migration.md): Architectural Decision Record (ADR-003) covering migration from Resend to Nodemailer Gmail SMTP.
    *   [adr-004-cloudinary-image-upload.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/22-07-26/adr-004-cloudinary-image-upload.md): Architectural Decision Record (ADR-004) covering direct local device image upload to Cloudinary, server-side streaming, max 10 images limit, and automated asset cleanup upon DB deletion.
    *   [adr-004-brevo-smtp-migration.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-8-26/adr-004-brevo-smtp-migration.md): Architectural Decision Record (ADR-004) covering migration from Gmail SMTP to Brevo SMTP Relay via Nodemailer.
    *   [adr-005-checkout-address-book-and-email-optimization.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-8-26/adr-005-checkout-address-book-and-email-optimization.md): Architectural Decision Record (ADR-005) covering pending order email removal, checkout address book integration, and auth waterfall performance optimization.
    *   [adr-006-email-verification-on-registration.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/2-8-26/adr-006-email-verification-on-registration.md): Architectural Decision Record (ADR-006) covering email verification on user registration, 1-hour verification tokens, NextAuth login gating, and Google OAuth auto-verification.
    *   [master-architecture.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/master-architecture.md): Complete master Mermaid diagram connecting all UI pages, state stores, middleware, API handlers, core libraries, database models, and cloud services into one unified map.
    *   [database-erd.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/database-erd.md): Standalone Mermaid code block for 19-entity relational database ERD.
    *   [system-architecture.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/system-architecture.md): Standalone Mermaid code block for 5-layer system component architecture diagram.
    *   [checkout-sequence.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/checkout-sequence.md): Standalone Mermaid sequence diagram for Order Checkout & SePay Webhook processing.
    *   [auth-sequence.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/auth-sequence.md): Standalone Mermaid sequence diagram for User Auth & Password Reset flow.
    *   [cloudinary-sequence.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/cloudinary-sequence.md): Standalone Mermaid sequence diagram for Admin Product Upload & Cloudinary storage operations.
    *   [file-exclusion.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/02-08-26/file-exclusion.md): Technical file exclusion matrix table.

---

### 8. `scratch/` — Developer Scratchpad Diagnostics
Contains utilities and diagnostic scripts tracked in the source repository:

*   [check_db_version.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/scratch/check_db_version.ts): Diagnostic utility confirming active PostgreSQL engine features and connection speed.
*   [check_tokens.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/scratch/check_tokens.ts): Diagnostic script inspecting active password reset tokens in database.
*   [convert_to_relative.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/scratch/convert_to_relative.ts): Utility that cleanses Cloudinary database values, updating absolute image URLs into relative references.
*   [test_all_email_workflows.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/scratch/test_all_email_workflows.ts): Comprehensive script testing all Nodemailer email templates (order pending, order completed, welcome, password reset).
*   [test_real_email.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/scratch/test_real_email.ts): Diagnostic script performing live Nodemailer SMTP dispatch testing.
