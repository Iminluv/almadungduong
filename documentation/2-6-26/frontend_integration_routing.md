# Task Report: Frontend Integration & Dynamic Routing (Phase 3)

**Date:** June 2, 2026  
**Status:** Completed  
**Objective:** Integrate the new database catalog fields (`slug`, `showOnHomepage`, `isPublished`) and database-driven shipping fee models (`ShippingZone`, `ShippingRate`) into the website's Next.js pages, API endpoints, and components.

---

## 1. Executive Summary

With the database schema successfully migrated and seeded in Phase 2, this phase focused on activating the new capabilities within the Next.js application layer:
1.  **Dynamic Curated Homepage**: Replaced the wholesale product fetch on the homepage with a query filtering by `showOnHomepage: true` and `isPublished: true`, ordered by `sortOrder`.
2.  **Catalog Publication Check**: Added publication filters (`isPublished: true`) to the product listing page and the products list API endpoint.
3.  **SEO Dynamic Routing Transition**: Renamed dynamic folder structures and transitioned the dynamic details route and product API handler from ID-based parameters (`[id]`) to SEO slug-based parameters (`[slug]`).
4.  **Frontend Link Decoupling**: Updated card and discount components to target the product's `slug` instead of database `id` for page routing.
5.  **Dynamic Shipping Calculators**: Designed a `/api/shipping` endpoint to fetch the active standard rate dynamically, and refactored the checkout flow to retrieve and apply database rates instead of relying on hardcoded constants.

---

## 2. Technical Architecture & Component Mappings

The diagram below details the data flow between client components, Next.js server-side page/API routes, and the database:

```mermaid
graph TD
    subgraph Client-Side Components
        A["CheckoutPage (thanh-toan/page.tsx)"] -- "fetch('/api/shipping')" --> B["Shipping API Route"]
        C["ProductCard / MonthlyDeal"] -- "Link href='/san-pham/[slug]'" --> D["ProductDetailPage ([slug]/page.tsx)"]
    end

    subgraph Next.js App Router (Backend)
        B -- "findFirst({ zone: 'VN' })" --> E["Neon Postgres DB"]
        D -- "findUnique({ slug })" --> E
        F["api/products/[slug]"] -- "findUnique({ slug })" --> E
        G["san-pham/page.tsx"] -- "findMany({ isPublished: true })" --> E
        H["page.tsx (Home)"] -- "findMany({ showOnHomepage: true })" --> E
    end
```

---

## 3. Implementation Details

### 3.1 Folder Renaming
The dynamic routing directories were renamed in the workspace to transition parameters:
*   `src/app/san-pham/[id]` ──> `src/app/san-pham/[slug]`
*   `src/app/api/products/[id]` ──> `src/app/api/products/[slug]`

### 3.2 Product Page Queries & Listing Filters
*   **[page.tsx (Home)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/page.tsx)**: Mapped queries to filter by `showOnHomepage: true` and `isPublished: true`:
    ```typescript
    dbProducts = await prisma.product.findMany({
      where: { showOnHomepage: true, isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
    ```
*   **[page.tsx (Shop)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/page.tsx)**: Mapped queries to only fetch published items:
    ```typescript
    dbProducts = await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
    ```
*   **[route.ts (List API)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/products/route.ts)**: Added publication check for general product queries:
    ```typescript
    const where: any = { isPublished: true };
    if (category) {
      where.category = category;
    }
    ```

### 3.3 Dynamic Routing & Details Page
*   **[page.tsx (Product Details)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/[slug]/page.tsx)**:
    - Updated props signature to expect `Promise<{ slug: string }>`.
    - Modified `generateStaticParams()` to fetch `slug` for only published products.
    - Updated `findUnique` filter to check the `slug` index:
      ```typescript
      dbProduct = await prisma.product.findUnique({
        where: { slug }
      });
      ```
*   **[route.ts (Detail API)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/products/[slug]/route.ts)**:
    - Updated route handler params and `findUnique` database queries to query by `slug` instead of `id`.

### 3.4 Decoupling Component Links
*   **[ProductCard.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/ui/ProductCard.tsx)**:
    - Added `slug` to `ProductCardProps`.
    - Modified opening `<Link>` tags to point to `/san-pham/${slug ?? id}` to support routing.
*   **[ProductCarousel.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/ProductCarousel.tsx)** and **[ProductsContent.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/san-pham/ProductsContent.tsx)**:
    - Passed `slug={product.slug}` to `<ProductCard>` instantiations.
*   **[MonthlyDeal.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/components/home/MonthlyDeal.tsx)**:
    - Mapped `slug: p.slug` in the memoized `comboDeals` array.
    - Modified redirection links to target `deal.slug ?? deal.id`.

### 3.5 Database-Driven Shipping Fees
*   **[route.ts (Shipping API)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/api/shipping/route.ts)**:
    - Created an endpoint `GET /api/shipping` to fetch the active shipping rate for the nationwide zone:
      ```typescript
      const rate = await prisma.shippingRate.findFirst({
        where: { isActive: true, zone: { code: 'VN' } },
        include: { zone: true }
      });
      ```
*   **[page.tsx (Checkout Page)](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/thanh-toan/page.tsx)**:
    - Replaced the hardcoded constants (`FREESHIP_THRESHOLD` and `STANDARD_SHIPPING_FEE`) with dynamic state loaded via a client-side `fetch("/api/shipping")` inside a `useEffect` hook.
    - Added component props to `ShippingStep` to transfer `freeThreshold` and `baseFee` parameters.
    - Made the warning banner, price breakdowns, and shipping rate tables dynamic based on the active rate fetched from the database:
      ```typescript
      <p className="text-[10px] text-muted/70 italic">
        Freeship với đơn hàng trên {formatPrice(freeThreshold)} • Đồng giá {formatPrice(baseFee)} toàn quốc
      </p>
      ```

---

## 4. Verification and Testing

### 4.1 Unit Testing
Ran the Vitest suite to ensure no code regressions:
```bash
npx vitest run
```
*Result:* All 2 tests passed successfully.

### 4.2 Production Build Verification
Ran the production compiler:
```bash
npm run build
```
*Result:* Next.js compiled successfully and prerendered the static files:
*   Generated 66 static pages (including `/san-pham/[slug]` details pages, e.g., `/san-pham/tinh-chat-tai-sinh-2-0`, `/san-pham/duong-mat-mia-tho`, `/san-pham/cao-bo-phoi`).
*   Prisma generated client queries check out with TypeScript.
*   Zero compilation errors.

---

## 5. Command Reference Guide

| Command | Purpose |
|---|---|
| `mv 'src/app/san-pham/[id]' 'src/app/san-pham/[slug]'` | Rename the product details route folder |
| `mv 'src/app/api/products/[id]' 'src/app/api/products/[slug]'` | Rename the product details API route folder |
| `npx vitest run` | Execute unit test scripts |
| `npm run build` | Compile the Next.js production builds and verify paths/types |
