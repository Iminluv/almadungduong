# Phase 1 Documentation: Dashboard (Overview)

Completed on: **2026-06-26**

## Accomplishments

### 1. Dashboard API Route (`/api/admin/stats`)
- Created [route.ts](file:///d:/Projects/almadungduong/src/app/api/admin/stats/route.ts) which acts as a secure data pipeline:
  * Restricts access to authenticated `admin` sessions only.
  * Dynamically computes total revenue via database aggregations (`status: "completed"`).
  * Computes group counts for all order statuses (`pending`, `completed`, `expired`).
  * Fetches total user counts and product publication ratios.
  * Assembles the 5 most recent orders with associated customer emails and status tags.
  * Calculates daily completed revenue sums over the last 7 days to compile a trend sequence.

### 2. High-Fidelity Skeletons (`loading.tsx`)
- Created [loading.tsx](file:///d:/Projects/almadungduong/src/app/admin/loading.tsx) which serves a visual layout wrapper during async server-side data fetching:
  * Renders 4 `animate-pulse` stat card templates.
  * Provides a simulated bar-chart layout corresponding to the CSS chart shape.
  * Provides order table item layouts.

### 3. Server-Rendered Dashboard View (`page.tsx`)
- Replaced the simple dashboard placeholder with a full operational implementation at [page.tsx](file:///d:/Projects/almadungduong/src/app/admin/page.tsx):
  * Performs server-side queries directly in the page rendering path, minimizing database hops.
  * Calculates **rolling week-over-week trends** (growth percentages for revenue, orders, and customer registrations) by querying the current 7 days against the previous 7 days (7–14 days ago).
  * Implemented a **pure-CSS trend bar chart** that scales dynamically according to the maximum daily revenue in the set, featuring a custom CSS-only absolute-positioned hover tooltip displaying exact currency formats.
  * Integrated a mini-table displaying the last 5 order codes, status badges, and associated users with email lookups.

---

## Verification Status
- Validated with `npx tsc --noEmit` and completed successfully with **0 compilation errors**.
