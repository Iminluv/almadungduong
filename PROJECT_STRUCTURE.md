# Project Structure - Alma Dungduong E-commerce

This document provides a comprehensive overview of the file structure and folder architecture of the **Alma Dungduong** e-commerce website. The project is built using **Next.js 16 (App Router)** with **React 19**, styled using **Tailwind CSS v4**, and connected to a serverless **Neon PostgreSQL** database using **Prisma 7**.

---

## 📂 Directory Tree Overview

Below is the directory tree highlighting the key source files and configurations:

```
almadungduong/
├── .github/                  # GitHub actions and CI/CD workflows
├── .husky/                   # Git hooks for linting & pre-commits
├── documentation/            # Implementation details, migrations, specs and reports
│   ├── task_report.md        # Comprehensive report of completed tasks
│   ├── 2-6-26/               # Design & migration docs for products and loyalty configuration
│   ├── 4-6-26/               # Design & migration docs for User Account feature (Phases 1-10)
│   ├── 6-6-26/               # Integration docs for SePay payment gateway, webhook validation, and checkout
│   ├── 19-6-26/              # Content protection (right-click / F12 blocker) system design
│   ├── 26-06-26/             # Admin panel specs for dashboard, orders, products, settings, etc.
│   └── 01-07-26/             # Architectural Decision Records (ADRs) for email and password reset services
├── prisma/                   # Prisma ORM schema and database seeding
│   ├── schema.prisma         # Relational database schema definition
│   ├── products_seed_data.ts # Normalized products list data for seeding
│   ├── reviews_seed_data.ts  # Normalized product reviews data for seeding
│   ├── extract_reviews.py    # Python helper script to extract spreadsheet reviews
│   ├── seed.ts               # Database seed script for loyalty, categories, and products
│   ├── set_admin.ts          # Seed script to create/reset the admin user account details
│   └── sync_custom.ts        # Database custom sync script for free shipping & test product
├── public/                   # Public static assets
│   └── images/               # Image resources (e.g., hero banners)
├── scratch/                  # Scratchpad diagnostic and migration scripts
│   ├── check_db_version.ts   # Check database engine version and settings
│   └── convert_to_relative.ts# Converts absolute Cloudinary URLs to relative paths
├── src/                      # Application Source Code
│   ├── __tests__/            # Unit testing suite (Vitest)
│   │   ├── setup.ts          # Test setup & configuration
│   │   └── loyalty.test.tsx  # Loyalty program frontend tests
│   ├── app/                  # Next.js App Router pages and API routes
│   │   ├── admin/            # Admin Panel frontend views (dashboard, orders, products, etc.)
│   │   │   ├── customers/    # Customer list & detail views
│   │   │   ├── orders/       # Orders queue & detail viewer
│   │   │   ├── products/     # Catalog editor, creator and modifier forms
│   │   │   ├── settings/     # Global configurations tabs (shipping, loyalty)
│   │   │   └── layout.tsx    # Admin dashboard sidebar and shell layout
│   │   ├── api/              # Route handlers / backend endpoints
│   │   │   ├── admin/        # Admin restricted REST API endpoints (stats, products, settings)
│   │   │   ├── auth/         # NextAuth registration and catch-all authentication routes
│   │   │   ├── checkout/     # Order creation and SePay checkout initiation API
│   │   │   ├── claim-transfer/ # Manual checkout claim notifications
│   │   │   ├── loyalty/      # Loyalty Program API endpoints
│   │   │   ├── payment-status/ # Dynamic status checker API by transaction code
│   │   │   ├── products/     # Product listing and filter API endpoints
│   │   │   │   └── [slug]/   # Dynamic product detail API by slug
│   │   │   ├── sepay-webhook/# Secure callback endpoint validating HMAC signatures
│   │   │   ├── shipping/     # Shipping rates API endpoint
│   │   │   └── user/         # Customer profile, addresses, favorites, and orders API routes
│   │   ├── blog/             # Brand blog page & article details
│   │   ├── chung-chi/         # Quality certifications and reports page
│   │   ├── ket-qua/          # Checkout results / order status
│   │   ├── khach-hang-than-thiet/ # Loyalty program views
│   │   ├── san-pham/         # Product catalog and detail views
│   │   │   ├── ProductsContent.tsx # Client component for product grids and filters
│   │   │   ├── page.tsx      # Main products listing server page
│   │   │   └── [slug]/       # Dynamic product detail views by slug
│   │   ├── tai-khoan/        # Customer account dashboard and auth views
│   │   ├── thanh-toan/       # Checkout/payment forms
│   │   ├── ve-chung-toi/     # "About Us" and brand history page
│   │   ├── globals.css       # Global styles & Tailwind configuration
│   │   ├── layout.tsx        # Application root layout with components wrappers
│   │   ├── middleware.ts     # Edge-compatible routing pass-through middleware
│   │   └── page.tsx          # Homepage view entry point
│   ├── components/           # Reusable React UI Components
│   │   ├── admin/            # Admin Panel controls (forms, grids, editors, sidebars)
│   │   ├── cart/             # Shopping cart components (drawer, badge)
│   │   ├── checkout/         # SePay payment QR & polling modal components
│   │   ├── home/             # Homepage-specific components
│   │   ├── layout/           # Shared page wrappers (Header, Footer, Chat widget)
│   │   ├── products/         # Product listing filters, review cards
│   │   ├── providers/        # Context providers (AuthProvider, ContentProtectionProvider)
│   │   └── ui/               # Core design system atomic elements (button, inputs, product cards)
│   └── lib/                  # Application core services & shared utilities
│       ├── store/            # Client state stores (Zustand)
│       │   ├── useCart.ts    # Cart state store
│       │   └── useFavorites.ts # Wishlist state store
│       ├── auth.ts           # NextAuth central authentication config
│       ├── caseStudies.ts    # Scientific skin treatment case studies dataset
│       ├── data.ts           # Mock & fallback static product data
│       ├── db.ts             # Prisma Client Postgres singleton adapter
│       ├── email.ts          # Resend transaction email utilities & templates
│       ├── notifications.ts  # Centralized developer logging/notification service stubs
│       ├── sepay.ts          # SePay API v2 client integration & QR generator
│       ├── use-content-protection.ts # Client hooks managing anti-dev-tools & click restrictions
│       └── utils.ts          # Tailwind styling helpers
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
| `package.json` | [package.json](file:///d:/Projects/almadungduong/package.json) | Lists dependencies (React 19, Next.js 16, Prisma 7, Zustand, Tailwind 4) and custom scripts (`dev`, `build`, `db:seed`, `vitest`). |
| `next.config.ts` | [next.config.ts](file:///d:/Projects/almadungduong/next.config.ts) | Next.js execution parameters and image domain whitelist configurations. |
| `tsconfig.json` | [tsconfig.json](file:///d:/Projects/almadungduong/tsconfig.json) | Dictates compile options and path aliases (e.g. `@/*` mapping to `./src/*`). |
| `vitest.config.ts` | [vitest.config.ts](file:///d:/Projects/almadungduong/vitest.config.ts) | Custom test runner setup targeting React hooks and DOM renderings. |
| `prisma.config.ts` | [prisma.config.ts](file:///d:/Projects/almadungduong/prisma.config.ts) | Standard Prisma 7 datasource file configuration. |
| `eslint.config.mjs` | [eslint.config.mjs](file:///d:/Projects/almadungduong/eslint.config.mjs) | ESLint linter configuration rules. |
| `prettier.config.js` | [prettier.config.js](file:///d:/Projects/almadungduong/prettier.config.js) | Defines code style standards and spacing formatting. |
| `postcss.config.mjs` | [postcss.config.mjs](file:///d:/Projects/almadungduong/postcss.config.mjs) | Configures CSS preprocessing rules. |
| `commitlint.config.js` | [commitlint.config.js](file:///d:/Projects/almadungduong/commitlint.config.js) | Defines rules for standardizing Git commit messages. |
| `test-prisma.ts` | [test-prisma.ts](file:///d:/Projects/almadungduong/test-prisma.ts) | Quick test diagnostic script verifying Prisma client connectivity. |
| `README.md` | [README.md](file:///d:/Projects/almadungduong/README.md) | Standard documentation covering local setup and build options. |

---

### 2. `prisma/` — Database Operations & Schema
Responsible for schema definitions, migrations, and test data seed populations.

*   [schema.prisma](file:///d:/Projects/almadungduong/prisma/schema.prisma): Outlines the relational models for the database:
    *   `LoyaltyTier`: Tracks customer tiers (e.g. *Ươm mầm*, *Dung dưỡng*, *Nở rộ*) along with order rules.
    *   `LoyaltyBenefit`: Specific benefits assigned to each tier.
    *   `LoyaltyConfig`: Global key-value store for static loyalty configuration.
    *   `Product`: Represents items in the catalog (pricing, ratings, slug, etc.) and tracks favorites.
    *   `Category`: Hierarchical product category classification (parent/children relationships).
    *   `Tag`: Labels for products (e.g., *Deal tháng*, *Bán chạy nhất*).
    *   `ProductImage`: Product gallery photo URLs with display ordering.
    *   `Review`: Customer ratings, verified purchase status, and reviews comments.
    *   `ShippingZone`: Regional groups (e.g., National `VN` zone) for shipping rates.
    *   `ShippingRate`: Base delivery costs, free tier eligibility threshold, and active states.
    *   `User`: Customer profile details, total accumulated spend, and loyalty tier bounds.
    *   `Account` / `Session`: OAuth credentials links and server-side user authentication tracking.
    *   `Address`: User-owned shipping addresses for auto-filling and checkout.
    *   `Favorite`: Wishlist tracking correlating users and catalog products.
    *   `Order`: Represents buyer transaction sessions, status indicators (pending/completed/expired), tracking codes, pricing fields, and snapshot shipping/bank logs.
    *   `OrderItem`: Relates purchased products, prices, and quantities to parent orders.
    *   `WebhookLog`: Records incoming raw transaction payloads from payment gateway webhooks for HMAC check and idempotent processing.
*   [products_seed_data.ts](file:///d:/Projects/almadungduong/prisma/products_seed_data.ts): Static database seed configuration listing core products, tags, and category keys.
*   [reviews_seed_data.ts](file:///d:/Projects/almadungduong/prisma/reviews_seed_data.ts): Imported review items matching specific product keys.
*   [extract_reviews.py](file:///d:/Projects/almadungduong/prisma/extract_reviews.py): Python data extraction script to process external feedback worksheets into TypeScript objects.
*   [seed.ts](file:///d:/Projects/almadungduong/prisma/seed.ts): Cleans the Postgres tables and seeds them with baseline configurations, loyalty settings, product catalogs, categories, tags, product images, reviews, and delivery rates.
*   [set_admin.ts](file:///d:/Projects/almadungduong/prisma/set_admin.ts): Utility database execution script checking if the default admin account exists, creating it if missing (or resetting its password and role if present).
*   [sync_custom.ts](file:///d:/Projects/almadungduong/prisma/sync_custom.ts): Targeted synchronization script that sets the shipping base fee to 0 VND and upserts the 3,000 VND test product without clearing existing user, order, or webhook tables.

---

### 3. `src/lib/` — Core Modules and Utilities
Acts as the central point for shared modules, API fetch instances, and global stores:

*   [db.ts](file:///d:/Projects/almadungduong/src/lib/db.ts): Manages server connection pools with Neon Postgres using Prisma's pg adapter (`@prisma/adapter-pg`). Maintains client singleton patterns in development modes.
*   [auth.ts](file:///d:/Projects/almadungduong/src/lib/auth.ts): NextAuth v5 central authentication configuration supporting email Credentials (bcrypt comparison) and Google OAuth providers, mapping callbacks to attach user metadata.
*   [caseStudies.ts](file:///d:/Projects/almadungduong/src/lib/caseStudies.ts): Standard database for before-and-after skin improvement evaluations, categorizing treatments (e.g., *Mỏng yếu*, *Thâm nám*, *Viêm mụn*) alongside drive references.
*   [data.ts](file:///d:/Projects/almadungduong/src/lib/data.ts): Local fallback file storing static information such as products list, blog posts, reviews, and categories.
*   [sepay.ts](file:///d:/Projects/almadungduong/src/lib/sepay.ts): Orchestrates communication with SePay API v2 (automatically routing requests to sandbox or live endpoints based on API Key prefix) and generates VietQR endpoints for client banking transfers.
*   [notifications.ts](file:///d:/Projects/almadungduong/src/lib/notifications.ts): Developer alerts system stub supporting console reporting of critical payment failures or mismatch errors.
*   [email.ts](file:///d:/Projects/almadungduong/src/lib/email.ts): Wraps the **Resend API** to construct transaction invoices and transmit HTML order completion notifications.
*   [use-content-protection.ts](file:///d:/Projects/almadungduong/src/lib/use-content-protection.ts): React client hook implementing anti-dev-tools detection (via viewport dimensions) and event handlers to block copy commands, right clicks, and source view keystrokes.
*   [utils.ts](file:///d:/Projects/almadungduong/src/lib/utils.ts): Shared layout utilities like `cn` to cleanly join classnames together.
*   `store/`:
    *   [useCart.ts](file:///d:/Projects/almadungduong/src/lib/store/useCart.ts): **Zustand** client-side cart manager. Handles items additions, deductions, calculations, and cart drawer visibility toggles.
    *   [useFavorites.ts](file:///d:/Projects/almadungduong/src/lib/store/useFavorites.ts): **Zustand** client-side wishlist state manager. Handles optimistic toggling, API synchronization, and state updates across catalog card/details pages.

---

### 4. `src/app/` — Router, Routing & Layouts
Standard Next.js App Router structure. Each subfolder maps to a page endpoint:

*   [globals.css](file:///d:/Projects/almadungduong/src/app/globals.css): Declares Tailwind CSS inputs, CSS variables, and keyframe animations.
*   [layout.tsx](file:///d:/Projects/almadungduong/src/app/layout.tsx): Top-level layout declaring HTML structures, font family loadings, announcement bars, standard header, footer, and chat widget wrapper components. Injected with `AuthProvider` and `ContentProtectionProvider` wrappers.
*   [middleware.ts](file:///d:/Projects/almadungduong/src/middleware.ts): Edge-compatible routing pass-through middleware, protecting sessions without database conflicts at the edge.
*   [page.tsx](file:///d:/Projects/almadungduong/src/app/page.tsx): Main landing page. Combines hero carousel, scientific information highlights, monthly deals, product carousels, and client testimonials.

#### Client Pages & Views
*   `blog/`:
    *   [page.tsx](file:///d:/Projects/almadungduong/src/app/blog/page.tsx) / [BlogView.tsx](file:///d:/Projects/almadungduong/src/app/blog/BlogView.tsx): Displays published articles list.
    *   `[slug]/`: Dynamic routes displaying full details of individual articles ([page.tsx](file:///d:/Projects/almadungduong/src/app/blog/%5Bslug%5D/page.tsx) / [BlogDetailView.tsx](file:///d:/Projects/almadungduong/src/app/blog/%5Bslug%5D/BlogDetailView.tsx)).
*   `chung-chi/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/chung-chi/page.tsx) / [ChungChiView.tsx](file:///d:/Projects/almadungduong/src/app/chung-chi/ChungChiView.tsx): Displays full certification profiles, registration documents, and SPF/skin irritation test results.
*   `ket-qua/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/ket-qua/page.tsx) / [ResultsView.tsx](file:///d:/Projects/almadungduong/src/app/ket-qua/ResultsView.tsx): Landing point displaying success banners after transactions.
*   `khach-hang-than-thiet/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/khach-hang-than-thiet/page.tsx) / [LoyaltyView.tsx](file:///d:/Projects/almadungduong/src/app/khach-hang-than-thiet/LoyaltyView.tsx): Renders the customer loyalty dashboard, program tier information, points calculations, and benefit lists.
*   `san-pham/`:
    *   [page.tsx](file:///d:/Projects/almadungduong/src/app/san-pham/page.tsx) / [ProductsContent.tsx](file:///d:/Projects/almadungduong/src/app/san-pham/ProductsContent.tsx): Main catalog display with filter sidebar, product grid, sorting mechanisms, and search capabilities.
    *   `[slug]/`: Dynamic routes detailing specific products, volumes, ingredients, features, and certifications ([page.tsx](file:///d:/Projects/almadungduong/src/app/san-pham/%5Bslug%5D/page.tsx) / [ProductDetailView.tsx](file:///d:/Projects/almadungduong/src/app/san-pham/%5Bslug%5D/ProductDetailView.tsx)).
*   `tai-khoan/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/tai-khoan/page.tsx) / [AccountView.tsx](file:///d:/Projects/almadungduong/src/app/tai-khoan/AccountView.tsx): User authentication tabs (login/signup, Google OAuth) and member dashboard featuring overview tier progress, orders, addresses CRUD, wishlist, and profile details.
*   `thanh-toan/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/thanh-toan/page.tsx): Interactive checkout page pre-filled automatically with details from the user's active session and default address, supporting unauthenticated guest checkout.
*   `ve-chung-toi/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/ve-chung-toi/page.tsx) / [AboutView.tsx](file:///d:/Projects/almadungduong/src/app/ve-chung-toi/AboutView.tsx): Documents the brand's history and scientific foundations.

#### Admin Dashboard Views (`src/app/admin/`)
*   [layout.tsx](file:///d:/Projects/almadungduong/src/app/admin/layout.tsx): Admin shell shell loader protecting dashboard subpaths under explicit checks for user sessions carrying the `"admin"` role.
*   [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/page.tsx): Core analytics homepage compiling statistics feeds (sales charts, summaries).
*   `customers/`:
    *   [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/customers/page.tsx): Lists customer names, loyalty states, total purchase amounts.
    *   `[id]/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/customers/%5Bid%5D/page.tsx): Complete customer timeline, associated profile fields, default address directories, and order ledger histories.
*   `orders/`:
    *   [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/orders/page.tsx): Main orders list supporting filters by state.
    *   `[id]/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/orders/%5Bid%5D/page.tsx): Details of individual sales orders, custom transfer verification claims, bank logs, and completion toggles.
*   `products/`:
    *   [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/products/page.tsx): Relational table catalog management view with inline quick-edits.
    *   [new/page.tsx](file:///d:/Projects/almadungduong/src/app/admin/products/new/page.tsx): React Hook form page to compile and create new inventory objects.
    *   `[id]/edit/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/products/%5Bid%5D/edit/page.tsx): Interactive view to edit product properties and modify image gallery layouts.
*   `settings/` -> [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/settings/page.tsx): Interactive tab dashboard to adjust shipping zones, basic rates, loyalty points brackets, tier margins, and benefit lists.

#### API Route Handlers
*   `api/auth/` -> Contains registration controller (`/api/auth/register`) and NextAuth API catch-all handler (`/api/auth/[...nextauth]`).
*   `api/checkout/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/checkout/route.ts): Initiates and constructs database `Order` records, calculates totals and shipping fees, fetches bank details from SePay, and supplies the transaction credentials back to the client.
*   `api/claim-transfer/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/claim-transfer/route.ts): Processes user-initiated manual verification claims if an order is unpaid. Sends notifications to the admin system.
*   `api/loyalty/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/loyalty/route.ts): Backend route handler returning loyalty details and config mappings.
*   `api/payment-status/` -> `[transferCode]/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/payment-status/%5BtransferCode%5D/route.ts): Pollable status endpoint enabling the checkout page to detect transaction progression (pending to completed/expired).
*   `api/products/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/products/route.ts): Queries and returns all active products including relational tags, images, and reviews.
*   `api/products/[slug]/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/products/%5Bslug%5D/route.ts): Queries and returns details of a single product based on its unique slug.
*   `api/sepay-webhook/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/sepay-webhook/route.ts): Processes incoming SePay payment notifications. Employs timing-safe cryptographic SHA256 HMAC verification (with timestamp drift prevention) or bearer-auth matching, transitioning corresponding order rows to `completed`.
*   `api/shipping/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/shipping/route.ts): Queries and returns current national flat-rate shipping policies.
*   `api/user/` -> Contains secure customer profile handlers (`/api/user/profile`), addresses CRUD operations (`/api/user/addresses`), favorites wishlist toggles (`/api/user/favorites`), and order history query feeds (`/api/user/orders/route.ts`).
*   `api/admin/` (Secured REST controller endpoints):
    *   `stats/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/stats/route.ts): Gathers dashboard statistics aggregates (sales, volume, active consumers list).
    *   `orders/[id]/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/orders/%5Bid%5D/route.ts): Updates specific order records or changes order state indicators manually.
    *   `products/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/products/route.ts): Queries products catalog or creates new item structures.
    *   `products/[id]/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/products/%5Bid%5D/route.ts): Retrieves individual product entries, updates existing fields, or removes records completely.
    *   `products/[id]/images/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/products/%5Bid%5D/images/route.ts): Handles image uploads for product galleries.
    *   `products/[id]/images/[imageId]/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/products/%5Bid%5D/images/%5BimageId%5D/route.ts): Deletes specific photo items or manages layout reordering inside the database.
    *   `settings/loyalty/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/settings/loyalty/route.ts): Reads or updates configuration tiers parameters.
    *   `settings/shipping/` -> [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/settings/shipping/route.ts): Reads or updates national flat-rate policies.

---

### 5. `src/components/` — User Interface Components
Components are sorted by subdirectories reflecting their application context:

#### Layout Components (`src/components/layout/`)
Global visual layouts wrap around multiple views:
*   [AnnouncementBar.tsx](file:///d:/Projects/almadungduong/src/components/layout/AnnouncementBar.tsx): Top promotion banner.
*   [Header.tsx](file:///d:/Projects/almadungduong/src/components/layout/Header.tsx): Fixed top navigation bar. Includes store logo, routing menus, search bars, user profiles (displaying user initials or Google avatars when logged in), and interactive shopping cart status indicator.
*   [Footer.tsx](file:///d:/Projects/almadungduong/src/components/layout/Footer.tsx): Bottom page layout with site links, copyright details, and social channels.
*   [ChatWidget.tsx](file:///d:/Projects/almadungduong/src/components/layout/ChatWidget.tsx): Sticky floating live chat component.

#### Cart Components (`src/components/cart/`)
*   [CartDrawer.tsx](file:///d:/Projects/almadungduong/src/components/cart/CartDrawer.tsx): A slide-out sidebar from the right displaying items currently added to the cart, options to increment/decrement quantities, total pricing, and quick buttons to proceed to the checkout route.

#### Checkout Components (`src/components/checkout/`)
*   [CheckoutModal.tsx](file:///d:/Projects/almadungduong/src/components/checkout/CheckoutModal.tsx): Interactive overlay modal rendered during order completion. Renders dynamic bank transfer QR codes, counts down a 10-minute validity window, listens to transaction changes via status polling, handles user claim submissions, and executes cancellation behaviors.

#### Home Components (`src/components/home/`)
Widgets designed specifically for the front landing page:
*   [HeroCarousel.tsx](file:///d:/Projects/almadungduong/src/components/home/HeroCarousel.tsx): Banner carousels driven by Framer Motion animations.
*   [HeroSection.tsx](file:///d:/Projects/almadungduong/src/components/home/HeroSection.tsx): Static backup banner structure.
*   [Certifications.tsx](file:///d:/Projects/almadungduong/src/components/home/Certifications.tsx): Guaranteed badge highlights.
*   [CustomerFeedback.tsx](file:///d:/Projects/almadungduong/src/components/home/CustomerFeedback.tsx): Horizontal grid for buyer testimonials.
*   [MicrobialHighlights.tsx](file:///d:/Projects/almadungduong/src/components/home/MicrobialHighlights.tsx): Educates users about core microbiotics.
*   [MicrobialScienceBanner.tsx](file:///d:/Projects/almadungduong/src/components/home/MicrobialScienceBanner.tsx): Science-based cosmetics introduction banner.
*   [MonthlyDeal.tsx](file:///d:/Projects/almadungduong/src/components/home/MonthlyDeal.tsx): Dynamic monthly sales promotion section.
*   [ProductCarousel.tsx](file:///d:/Projects/almadungduong/src/components/home/ProductCarousel.tsx): Slider listing top products.
*   [ProductsFeatures.tsx](file:///d:/Projects/almadungduong/src/components/home/ProductsFeatures.tsx): General summaries of core product advantages.
*   [TrustStrip.tsx](file:///d:/Projects/almadungduong/src/components/home/TrustStrip.tsx): Details on shipping, return terms, and safety certifications.

#### Product Components (`src/components/products/`)
*   [FilterSidebar.tsx](file:///d:/Projects/almadungduong/src/components/products/FilterSidebar.tsx): Sidebar checklist allowing filtering by categories or skin concern types.
*   [MobileFilter.tsx](file:///d:/Projects/almadungduong/src/components/products/MobileFilter.tsx): Mobile-optimized filter slide-up panel.
*   [ReviewCard.tsx](file:///d:/Projects/almadungduong/src/components/products/ReviewCard.tsx): Standardized card displaying ratings, client reviewer names, dates, and comments.

#### Providers (`src/components/providers/`)
*   [AuthProvider.tsx](file:///d:/Projects/almadungduong/src/components/providers/AuthProvider.tsx): React Client Component wrapper for NextAuth `<SessionProvider>`, sharing session context across the DOM.
*   [ContentProtectionProvider.tsx](file:///d:/Projects/almadungduong/src/components/providers/ContentProtectionProvider.tsx): Listens to user interactions and blocks unauthorized copying, drag operations, context-menus, and triggers overlays when web inspect consoles are opened.

#### UI Primitives (`src/components/ui/`)
Standard design system modules reusable across the whole app:
*   [BeforeAfterSlider.tsx](file:///d:/Projects/almadungduong/src/components/ui/BeforeAfterSlider.tsx): Interactive slider to compare before-and-after skin recovery results.
*   [Button.tsx](file:///d:/Projects/almadungduong/src/components/ui/Button.tsx): General customized CTA button.
*   [DevToolsOverlay.tsx](file:///d:/Projects/almadungduong/src/components/ui/DevToolsOverlay.tsx): Standardized full-screen prompt blocking user views when DevTools is detected.
*   [Input.tsx](file:///d:/Projects/almadungduong/src/components/ui/Input.tsx): Interactive input fields.
*   [ProductCard.tsx](file:///d:/Projects/almadungduong/src/components/ui/ProductCard.tsx): Displays individual items, tags, rating indicators, standard pricing, and wishlist favorite heart toggles.
*   [ToastNotification.tsx](file:///d:/Projects/almadungduong/src/components/ui/ToastNotification.tsx): Bottom or top toast banner warnings and success statuses.

#### Admin Panels Components (`src/components/admin/`)
*   [AdminBreadcrumb.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminBreadcrumb.tsx): Page indicator display showing route levels.
*   [AdminShell.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminShell.tsx): Outer layout block managing responsive views.
*   [AdminSidebar.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminSidebar.tsx): Desktop/mobile sidebar listing settings, order queues, products, and customers.
*   [DataTable.tsx](file:///d:/Projects/almadungduong/src/components/admin/DataTable.tsx): Reusable dashboard data grid rendering search boxes, column header sorting, and page switches.
*   [ImageEditor.tsx](file:///d:/Projects/almadungduong/src/components/admin/ImageEditor.tsx): Product gallery files editor supporting additions, deletion, main image assignment, and drag-and-drop ordering.
*   [MarkCompletedButton.tsx](file:///d:/Projects/almadungduong/src/components/admin/MarkCompletedButton.tsx): Quick status transition button for orders.
*   [ProductDeleteButton.tsx](file:///d:/Projects/almadungduong/src/components/admin/ProductDeleteButton.tsx): Catalog delete button with confirmation drawer checks.
*   [ProductForm.tsx](file:///d:/Projects/almadungduong/src/components/admin/ProductForm.tsx): Zod/React Hook Form mapping fields for product details updates.
*   [ProductInlineEditor.tsx](file:///d:/Projects/almadungduong/src/components/admin/ProductInlineEditor.tsx): Table-row input components allowing immediate pricing/stock edits.
*   [SettingsForm.tsx](file:///d:/Projects/almadungduong/src/components/admin/SettingsForm.tsx): Interface displaying tab views for custom rates, shipping thresholds, and tier programs.
*   [StatCard.tsx](file:///d:/Projects/almadungduong/src/components/admin/StatCard.tsx): Displays numerical dashboard items (e.g. total revenue) side-by-side with icon widgets.
*   [StatusBadge.tsx](file:///d:/Projects/almadungduong/src/components/admin/StatusBadge.tsx): Renders custom badges (e.g. pending state yellow, completed state green).

---

### 6. `src/__tests__/` — Quality Assurance & Unit Testing
Uses **Vitest** for frontend element integration testing:

*   [setup.ts](file:///d:/Projects/almadungduong/src/__tests__/setup.ts): Extends standard matchers using `@testing-library/jest-dom`.
*   [loyalty.test.tsx](file:///d:/Projects/almadungduong/src/__tests__/loyalty.test.tsx): Tests the `LoyaltyView` components. Validates state transition behaviors from loading state spinners up to successful mock API resolutions.

---

### 7. `documentation/` — Quality Assurance & Audit Trails
Contains system execution plans, migration steps, and development progress reports:

*   [task_report.md](file:///d:/Projects/almadungduong/documentation/task_report.md): Summary report documenting connection configurations, seeding strategies, API development, and unit test logs for Phase 2/3/4 of the Loyalty Program.
*   `2-6-26/`: Date-stamped implementation blueprints detailing exact steps for schema synchronization, image normalizations, and product data cleaning logs.
*   `4-6-26/`: Date-stamped reports covering all 10 phases of the User Account feature (dependency management, NextAuth configuration, addresses and favorites APIs, dashboard tabs, layout headers, and autofill checkout).
*   `6-6-26/`: Date-stamped architectural guides covering the SePay payment system integration (VietQR generation, webhook security with HMAC-SHA256 timing validation, multi-channel admin alerts, and manual claiming mechanisms).
*   `19-6-26/`:
    *   [content-protection-report.md](file:///d:/Projects/almadungduong/documentation/19-6-26/content-protection-report.md): Technical report detailing anti-copy restrictions, event listeners configuration, F12 inspector blocks, and verification testing logs.
*   `26-06-26/` (Admin Panel features implementation spec phases):
    *   [phase-0-schema-auth.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-0-schema-auth.md): Specifications for setting up NextAuth authorization role layers and database schema support.
    *   [phase-1-dashboard.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-1-dashboard.md): Details of the admin homepage metrics aggregation and visual shell components.
    *   [phase-2-orders.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-2-orders.md): Queue management lists and details viewer requirements for orders.
    *   [phase-3-customers.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-3-customers.md): Accounts records overview specifications.
    *   [phase-4-products.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-4-products.md): Forms and list grids requirements for product records.
    *   [phase-5-settings.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-5-settings.md): Dynamic shipping and loyalty configuration specs.
    *   [phase-6-ui-shell.md](file:///d:/Projects/almadungduong/documentation/26-06-26/phase-6-ui-shell.md): General layout integration guidelines.
*   `01-07-26/`:
    *   [adr-email-services.md](file:///d:/Projects/almadungduong/documentation/01-07-26/adr-email-services.md): Architectural Decision Record (ADR) detailing design decisions for full lifecycle email services, password reset flow, and expired token cleanup mechanics.

---

### 8. `scratch/` — Developer Scratchpad Diagnostics
Contains utilities and one-off diagnostic scripts tracked in the source repository:

*   [check_db_version.ts](file:///d:/Projects/almadungduong/scratch/check_db_version.ts): Diagnostic utility confirming active PostgreSQL engine features and connection speed.
*   [convert_to_relative.ts](file:///d:/Projects/almadungduong/scratch/convert_to_relative.ts): Utility that cleanses Cloudinary database values, updating absolute image URLs into relative references.
