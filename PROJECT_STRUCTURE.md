# Project Structure - Alma Dungduong E-commerce

This document provides a comprehensive overview of the file structure and folder architecture of the **Alma Dungduong** e-commerce website. The project is built using **Next.js 16 (App Router)** with **React 19**, styled using **Tailwind CSS v4**, and connected to a serverless **Neon PostgreSQL** database using **Prisma 7**.

---

## 📂 Directory Tree Overview

Below is the directory tree highlighting the key source files and configurations:

```text
almadungduong/
├── .github/                  # GitHub actions and CI/CD workflows
├── .husky/                   # Git hooks for linting & pre-commits
├── documentation/            # Implementation details, migrations, and reports
│   ├── task_report.md        # Comprehensive report of completed tasks
│   └── 2-6-26/               # Phase-specific design & migration documentations
│   └── 4-6-26/               
├── prisma/                   # Prisma ORM schema and database seeding
│   ├── schema.prisma         # Database schema definition
│   ├── products_seed_data.ts # Normalized products list data for seeding
│   ├── reviews_seed_data.ts  # Normalized product reviews data for seeding
│   ├── extract_reviews.py    # Python helper script to extract spreadsheet reviews
│   └── seed.ts               # Database seed script for loyalty configuration, categories, and products
├── public/                   # Public static assets
│   └── images/               # Image resources (e.g., hero banners)
├── src/                      # Application Source Code
│   ├── __tests__/            # Unit testing suite (Vitest)
│   │   ├── setup.ts          # Test setup & configuration
│   │   └── loyalty.test.tsx  # Loyalty program frontend tests
│   ├── app/                  # Next.js App Router pages and API routes
│   │   ├── api/              # Route handlers / backend endpoints
│   │   │   ├── loyalty/      # Loyalty Program API endpoints
│   │   │   ├── products/     # Product listing and filter API endpoints
│   │   │   │   └── [slug]/   # Dynamic product detail API by slug
│   │   │   └── shipping/     # Shipping rates API endpoint
│   │   ├── blog/             # Brand blog page & article details
│   │   ├── chung-chi/         # Quality certifications and reports page
│   │   ├── ket-qua/          # Checkout results / order status
│   │   ├── khach-hang-than-thiet/ # Loyalty program views
│   │   ├── san-pham/         # Product catalog and detail views
│   │   │   ├── ProductsContent.tsx # Client component for product grids and filters
│   │   │   ├── page.tsx      # Main products listing server page
│   │   │   └── [slug]/       # Dynamic product detail views by slug
│   │   ├── tai-khoan/        # Customer account dashboard
│   │   ├── thanh-toan/       # Checkout/payment forms
│   │   ├── ve-chung-toi/     # "About Us" and brand history page
│   │   ├── globals.css       # Global styles & Tailwind configuration
│   │   ├── layout.tsx        # Application root layout with components wrappers
│   │   └── page.tsx          # Homepage view entry point
│   ├── components/           # Reusable React UI Components
│   │   ├── cart/             # Shopping cart components (drawer, badge)
│   │   ├── home/             # Homepage-specific components
│   │   ├── layout/           # Shared page wrappers (Header, Footer, Chat widget)
│   │   ├── products/         # Product listing filters, review cards
│   │   └── ui/               # Core design system atomic elements (button, inputs)
│   └── lib/                  # Application core services & shared utilities
│       ├── store/            # Client state stores (Zustand)
│       ├── caseStudies.ts    # Scientific skin treatment case studies dataset
│       ├── data.ts           # Mock & fallback static product data
│       ├── db.ts             # Prisma Client Postgres singleton adapter
│       └── utils.ts          # Tailwind styling helpers
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
| `package.json` | [package.json](file:///Users/iminluv/Documents/GitHub/almadungduong/package.json) | Lists dependencies (React 19, Next.js 16, Prisma 7, Zustand, Tailwind 4) and custom scripts (`dev`, `build`, `db:seed`, `vitest`). |
| `next.config.ts` | [next.config.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/next.config.ts) | Next.js execution parameters and image domain whitelist configurations. |
| `tsconfig.json` | [tsconfig.json](file:///Users/iminluv/Documents/GitHub/almadungduong/tsconfig.json) | Dictates compile options and path aliases (e.g. `@/*` mapping to `./src/*`). |
| `vitest.config.ts` | [vitest.config.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/vitest.config.ts) | Custom test runner setup targeting React hooks and DOM renderings. |
| `prisma.config.ts` | [prisma.config.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma.config.ts) | Standard Prisma 7 datasource file configuration. |
| `eslint.config.mjs` | [eslint.config.mjs](file:///Users/iminluv/Documents/GitHub/almadungduong/eslint.config.mjs) | ESLint linter configuration rules. |
| `prettier.config.js` | [prettier.config.js](file:///Users/iminluv/Documents/GitHub/almadungduong/prettier.config.js) | Defines code style standards and spacing formatting. |
| `postcss.config.mjs` | [postcss.config.mjs](file:///Users/iminluv/Documents/GitHub/almadungduong/postcss.config.mjs) | Configures CSS preprocessing rules. |
| `test-prisma.ts` | [test-prisma.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/test-prisma.ts) | Quick test diagnostic script verifying Prisma client connectivity. |

---

### 2. `prisma/` — Database Operations & Schema
Responsible for schema definitions, migrations, and test data seed populations.

*   [schema.prisma](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/schema.prisma): Outlines the relational models for the database:
    *   `LoyaltyTier`: Tracks customer tiers (e.g. *Ươm mầm*, *Dung dưỡng*, *Nở rộ*) along with order rules.
    *   `LoyaltyBenefit`: Specific benefits assigned to each tier.
    *   `LoyaltyConfig`: Global key-value store for static loyalty configuration.
    *   `Product`: Represents items in the catalog (pricing, ratings, slug, etc.).
    *   `Category`: Hierarchical product category classification (parent/children relationships).
    *   `Tag`: Labels for products (e.g., *Deal tháng*, *Bán chạy nhất*).
    *   `ProductImage`: Product gallery photo URLs with display ordering.
    *   `Review`: Customer ratings, verified purchase status, and reviews comments.
    *   `ShippingZone`: Regional groups (e.g., National `VN` zone) for shipping rates.
    *   `ShippingRate`: Base delivery costs, free tier eligibility threshold, and active states.
*   [products_seed_data.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/products_seed_data.ts): Static database seed configuration listing core products, tags, and category keys.
*   [reviews_seed_data.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/reviews_seed_data.ts): Imported review items matching specific product keys.
*   [extract_reviews.py](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/extract_reviews.py): Python data extraction script to process external feedback worksheets into TypeScript objects.
*   [seed.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/prisma/seed.ts): Cleans the Postgres tables and seeds them with baseline configurations, loyalty settings, product catalogs, categories, tags, product images, reviews, and delivery rates.

---

### 3. `src/lib/` — Core Modules and Utilities
Acts as the central point for shared modules, API fetch instances, and global stores:

*   [db.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/db.ts): Manages server connection pools with Neon Postgres using Prisma's pg adapter (`@prisma/adapter-pg`). Maintains client singleton patterns in development modes.
*   [caseStudies.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/caseStudies.ts): Standard database for before-and-after skin improvement evaluations, categorizing treatments (e.g., *Mỏng yếu*, *Thâm nám*, *Viêm mụn*) alongside drive references.
*   [data.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/data.ts): Local fallback file storing static information such as products list, blog posts, reviews, and categories.
*   [utils.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/utils.ts): Shared layout utilities like `cn` to cleanly join classnames together.
*   `store/`:
    *   [useCart.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/lib/store/useCart.ts): **Zustand** client-side cart manager. Handles items additions, deductions, calculations, and cart drawer visibility toggle toggles.

---

### 4. `src/app/` — Router, Routing & Layouts
Standard Next.js App Router structure. Each subfolder maps to a page endpoint:

*   [globals.css](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/globals.css): Declares Tailwind CSS inputs, CSS variables, and keyframe animations.
*   [layout.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/layout.tsx): Top-level layout declaring HTML structures, font family loadings, announcement bars, standard header, footer, and chat widget wrapper components.
*   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/page.tsx): Main landing page. Combines hero carousel, scientific information highlights, monthly deals, product carousels, and client testimonials.
*   `api/`:
    *   `loyalty/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/loyalty/route.ts): Backend route handler returning loyalty details and structured config mappings for tier rewards display.
    *   `products/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/products/route.ts): Queries and returns all active products including relational tags, images, and reviews.
    *   `products/[slug]/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/products/[slug]/route.ts): Queries and returns details of a single product based on its unique slug.
    *   `shipping/` -> [route.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/shipping/route.ts): Queries and returns current national flat-rate shipping policies.
*   `blog/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/page.tsx) / [BlogView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/BlogView.tsx): Displays published articles list.
    *   `[slug]/`: Dynamic routes displaying full details of individual articles ([page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/[slug]/page.tsx) / [BlogDetailView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/blog/[slug]/BlogDetailView.tsx)).
*   `chung-chi/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/chung-chi/page.tsx) / [ChungChiView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/chung-chi/ChungChiView.tsx): Displays full certification profiles, registration documents, and SPF/skin irritation test results.
*   `ket-qua/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ket-qua/page.tsx) / [ResultsView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ket-qua/ResultsView.tsx): Landing point displaying success banners after transactions.
*   `khach-hang-than-thiet/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/khach-hang-than-thiet/page.tsx) / [LoyaltyView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/khach-hang-than-thiet/LoyaltyView.tsx): Renders the customer loyalty dashboard, program tier information, points calculations, and benefit lists.
*   `san-pham/`:
    *   [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/page.tsx) / [ProductsContent.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/ProductsContent.tsx): Main catalog display with filter sidebar, product grid, sorting mechanisms, and search capabilities.
    *   `[slug]/`: Dynamic routes detailing specific products, volumes, ingredients, features, and certifications ([page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/[slug]/page.tsx) / [ProductDetailView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/[slug]/ProductDetailView.tsx)).
*   `tai-khoan/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/tai-khoan/page.tsx) / [AccountView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/tai-khoan/AccountView.tsx): User profile setup, purchase histories, and rewards status.
*   `thanh-toan/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/thanh-toan/page.tsx): Interactive checkout page gathering customer address, shipping choices, and discount voucher inputs.
*   `ve-chung-toi/` -> [page.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ve-chung-toi/page.tsx) / [AboutView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/ve-chung-toi/AboutView.tsx): Documents the brand's history and scientific foundations.

---

### 5. `src/components/` — User Interface Components
Components are sorted by subdirectories reflecting their application context:

#### Layout Components (`src/components/layout/`)
Global visual layouts wrap around multiple views:
*   [AnnouncementBar.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/AnnouncementBar.tsx): Top promotion banner.
*   [Header.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/Header.tsx): Fixed top navigation bar. Includes store logo, routing menus, search bars, user profiles, and interactive shopping cart status indicator.
*   [Footer.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/Footer.tsx): Bottom page layout with site links, copyright details, and social channels.
*   [ChatWidget.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/layout/ChatWidget.tsx): Sticky floating live chat component.

#### Cart Components (`src/components/cart/`)
*   [CartDrawer.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/cart/CartDrawer.tsx): A slide-out sidebar from the right displaying items currently added to the cart, options to increment/decrement quantities, total pricing, and quick buttons to proceed to the checkout route.

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

#### UI Primitives (`src/components/ui/`)
Standard design system modules reusable across the whole app:
*   [BeforeAfterSlider.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/BeforeAfterSlider.tsx): Interactive slider to compare before-and-after skin recovery results.
*   [Button.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/Button.tsx): General customized CTA button.
*   [Input.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/Input.tsx): Interactive input fields.
*   [ProductCard.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/ProductCard.tsx): Displays individual items, tags, rating indicators, standard pricing, and "Add to Cart" hooks.
*   [ToastNotification.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/ToastNotification.tsx): Bottom or top toast banner warnings and success statuses.

---

### 6. `src/__tests__/` — Quality Assurance & Unit Testing
Uses **Vitest** for frontend element integration testing:

*   [setup.ts](file:///Users/iminluv/Documents/GitHub/almadungduong/src/__tests__/setup.ts): Extends standard matchers using `@testing-library/jest-dom`.
*   [loyalty.test.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/__tests__/loyalty.test.tsx): Tests the `LoyaltyView` components. Validates state transition behaviors from loading state spinners up to successful mock API resolutions.

---

### 7. `documentation/` — Quality Assurance & Audit Trails
Contains system execution plans, migration steps, and development progress reports:

*   [task_report.md](file:///Users/iminluv/Documents/GitHub/almadungduong/documentation/task_report.md): Summary report documenting connection configurations, seeding strategies, API development, and unit test logs for Phase 2/3/4 of the Loyalty Program.
*   `2-6-26/`: Date-stamped implementation blueprints detailing exact steps for schema synchronization, image normalizations, and product data cleaning logs.
