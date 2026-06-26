# Phase 6 Documentation: UI Shell & Design System

Completed on: **2026-06-26**

## Accomplishments

### 1. Design System Tokens Addition
- Modified [globals.css](file:///d:/Projects/almadungduong/src/app/globals.css) inside the Tailwind `@theme` directive to add the following design tokens:
  * `--color-admin-sidebar`: `#1C1C1A` (inverted, matching existing page foreground)
  * `--color-admin-sidebar-fg`: `#FAF8F5` (inverted foreground, matching existing page background)
  * `--color-admin-active`: `#1A4331` (forest green, matching existing accent color)
  * `--color-admin-hover`: `rgba(250, 248, 245, 0.08)` (subtle overlay on dark items)
  * `--color-status-pending`: `#D97706` (amber for pending payment states)
  * `--color-status-completed`: `#1A4331` (forest green for completed states)
  * `--color-status-expired`: `#6B7280` (neutral gray for expired states)

### 2. Side Navigation Chrome (`AdminSidebar.tsx`)
- Created [AdminSidebar.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminSidebar.tsx):
  * **Layout**: Fixed `w-60` width and full-height on desktop (`lg+`), and dynamic backdrop-overlay drawer on mobile (`<lg`).
  * **Interactivity**: Tracks page transitions via Next.js `usePathname` to assign `aria-current="page"` and set correct highlighted state (e.g. `border-l-[3px] border-admin-active bg-white/10 text-white`).
  * **Actions**: Integrates client-side sign out using NextAuth's `signOut({ callbackUrl: "/tai-khoan" })`.
  * **Accessibility**: Fully keyboard closeable (listens to the `Escape` key) and structured under `<nav aria-label="Admin navigation">`.

### 3. Accessible Layout Frame (`AdminShell.tsx`)
- Updated [AdminShell.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminShell.tsx):
  * Renders the sidebar nav, a top header displaying status pulses, responsive menu toggles (`aria-expanded`), and desktop margins (`lg:pl-60`).
  * Integrated server-side email lookup, taking the logged-in email from layout sessions and feeding it to the sidebar component.

### 4. Shared Presentation Components
- Created [AdminBreadcrumb.tsx](file:///d:/Projects/almadungduong/src/components/admin/AdminBreadcrumb.tsx): semantic `<nav aria-label="Đường dẫn">` container that maps breadcrumb nodes dynamically.
- Created [StatCard.tsx](file:///d:/Projects/almadungduong/src/components/admin/StatCard.tsx): metric tile supporting arrow deltas (↑/↓/→), theme colors, hover transitions, and pulse skeletons (`aria-busy="true"`).
- Created [StatusBadge.tsx](file:///d:/Projects/almadungduong/src/components/admin/StatusBadge.tsx): maps status keys to clean borders, icons, and text labels (ensures status is never represented by color alone).
- Created [DataTable.tsx](file:///d:/Projects/almadungduong/src/components/admin/DataTable.tsx):
  * Built using semantic `<table>` elements with column headings (`<th scope="col">`), row headings (`<th scope="row">`), sticky layout headers, and full `Suspense` wrapping.
  * Links filter tabs, search submission form, and pagination buttons directly to URL query parameters (`searchParams`).
  * Collapses rows dynamically into stackable flex cards on mobile using content attributes (uses CSS `before:content-[attr(data-label)]` to display headers) to eliminate ugly horizontal scroll bars.

---

## Verification Status
- Validated with `npx tsc --noEmit` and completed successfully with **0 compilation errors**.
