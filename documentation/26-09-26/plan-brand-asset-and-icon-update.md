# Implementation Plan: Brand Assets & Icon Pipeline Update (Local & Production)

**Date:** September 26, 2026  
**Document ID:** PLAN-2026-09-26-BRAND-ASSETS  
**Status:** Ready for Review  
**Source Assets:**  
- `almadungduong/alma-dung-dưỡng.jpg` (1264 × 1264 px, Brand Identity Visual)  
- `almadungduong/web-icon.jpg` (1264 × 1264 px, Circular Brand Emblem)  

---

## 1. Executive Summary

This plan outlines the systematic update and optimization of Alma Dungduong's visual brand identity assets across both **Local Development** and **Production** environments. 

### Current State & Pain Points
1. **Default Bootstrap Favicon:** `src/app/favicon.ico` is currently the default 25.9 KB Next.js / Vercel black triangle icon from project initialization.
2. **Missing OpenGraph Image (404):** `src/app/layout.tsx` points to `/og-image.jpg` (`1200x630`), but the asset does not exist in `public/`, resulting in broken previews on Facebook, Zalo, iMessage, and Twitter.
3. **Missing Metadata Base:** `metadataBase` is not defined in `src/app/layout.tsx`, causing Next.js build warnings and relative URL resolution failures on social scrapers.
4. **PWA & Touch Icons Absent:** No `apple-touch-icon`, `icon.png`, or web app manifest icons exist for mobile and desktop bookmarks.
5. **Admin UI Logo Placeholder:** `AdminSidebar.tsx` currently renders a generic Unicode diamond symbol (`◆`) instead of the brand emblem.
6. **Raw Diacritic Filenames:** Files with Vietnamese diacritics (`alma-dung-dưỡng.jpg`) can cause POSIX URL encoding and CDN caching inconsistencies if deployed directly.

### Target State
- Fully automated Node/Sharp processing script generating multi-resolution favicons (`.ico`, `.png`, `.webp`), Apple touch icons, and perfectly composed 1200×630 OpenGraph banners.
- Native Next.js 15 metadata integration supporting both offline/local preview and production CDN delivery via Cloudinary.
- Upgraded Admin and Client UI navigation elements using official brand vector/raster emblems.
- Safe, zero-downtime deployment strategy with automated verification and rollback procedures.

---

## 2. Technical Architecture & Dependency Graph

```mermaid
graph TD
    subgraph RawAssets [Raw Source Assets]
        A["alma-dung-dưỡng.jpg (1264x1264)"]
        B["web-icon.jpg (1264x1264)"]
    end

    subgraph ProcessingPipeline [Automated Sharp Pipeline (scripts/generate-brand-assets.ts)]
        C["Canvas Composer & Resizer"]
        D["Multi-resolution ICO Generator"]
        E["Square & Circular WebP/PNG Exporter"]
    end

    subgraph LocalArtifacts [Local & Next.js Static Assets (public/ & src/app/)]
        F1["src/app/favicon.ico (16x16, 32x32, 48x48)"]
        F2["src/app/icon.png (32x32, 192x192)"]
        F3["src/app/apple-icon.png (180x180)"]
        F4["public/og-image.jpg (1200x630, letterboxed brand green)"]
        F5["public/brand/logo.png & logo.webp"]
        F6["src/app/manifest.ts (PWA manifest with 192/512 icons)"]
    end

    subgraph ProductionCloudinary [Production Cloudinary CDN (almadungduong/brand/)]
        G1["res.cloudinary.com/.../brand/web-icon.png"]
        G2["res.cloudinary.com/.../brand/og-image.jpg"]
        G3["res.cloudinary.com/.../brand/alma-dung-duong.jpg"]
    end

    subgraph ApplicationConsumer [Next.js App Runtime]
        H1["src/app/layout.tsx (Metadata & OG)"]
        H2["src/components/admin/AdminSidebar.tsx (Emblem UI)"]
        H3["src/components/layout/Header.tsx & Footer.tsx"]
    end

    A --> C
    B --> D
    B --> E
    C --> F4
    C --> F5
    D --> F1
    E --> F2
    E --> F3
    E --> F6
    F4 -.-> G2
    F5 -.-> G1
    A -.-> G3
    LocalArtifacts --> H1
    LocalArtifacts --> H2
    LocalArtifacts --> H3
    ProductionCloudinary -.-> H1
```

---

## 3. Environment Strategy: Local vs. Production

| Dimension | Local Development (`localhost:3000`) | Production (`almadungduong.vn` on Vercel) |
| :--- | :--- | :--- |
| **Asset Location** | `public/` and `src/app/` (filesystem) | Vercel Edge CDN + Cloudinary CDN |
| **OG Image URL** | Relative URL `/og-image.jpg` or localhost | Absolute canonical URL `https://almadungduong.vn/og-image.jpg` |
| **Network Dependency** | Completely offline / zero API dependency | Backed by Cloudinary CDN (`dxb8eoyf3`) for global fast edge delivery |
| **Cache Invalidation** | Next.js HMR + browser hard refresh (`Cmd+Shift+R`) | Cloudinary versioning (`v...`) + Vercel deployment immutable hash |
| **File Naming** | Normalized ASCII (`alma-dung-duong.jpg`, `web-icon.png`) | Normalized ASCII (prevents S3/Cloudinary/POSIX URL-encoding bugs) |
| **PWA Manifest** | Dynamic route `/manifest.webmanifest` | Cached at edge with `stale-while-revalidate` |

---

## 4. Key Architectural Decisions (ADR)

### ADR-1: Standardized 1200×630 OpenGraph Composition
- **Context:** `alma-dung-dưỡng.jpg` is a 1:1 square image (1264×1264). Social platforms (Facebook, Zalo, Twitter, LinkedIn) require 1.91:1 (1200×630). Directly forcing 1200×630 stretches or crops the typography.
- **Decision:** Sample the brand background color (`#6f8c80` / `#708d81`), create a 1200×630 canvas, and center the brand artwork with subtle padding. This preserves all logo typography ("ALMA DUNG DƯỠNG" & "HOA NGÂN") without distortion.

### ADR-2: Multi-Resolution File-Based Next.js Metadata
- **Context:** Next.js 15 App Router natively detects and generates metadata tags for special files: `favicon.ico`, `icon.png`, `apple-icon.png`, `opengraph-image.png`, and `manifest.ts`.
- **Decision:** Place core icon assets directly in `src/app/` and static backups in `public/`. This eliminates manual `<link rel="icon">` tags and lets Next.js handle cache-busting, MIME types, and responsive dimensions automatically.

### ADR-3: Dual-Mode Delivery (Local Static + Production Cloudinary Mirror)
- **Context:** In production, assets must load instantly globally and support direct Cloudinary asset transformations. In local dev, developers should not require Cloudinary credentials to view icons.
- **Decision:** Keep source-processed assets in `public/` and provide an idempotent upload script (`scripts/upload-brand-assets.ts`) to sync them to Cloudinary folder `almadungduong/brand/`. The application uses Next.js static serving by default with Cloudinary CDN fallback.

---

## 5. Detailed Task Breakdown

### Phase 1: Asset Preparation & Generation Pipeline (Foundations)

#### Task 1: Asset Normalization & Processing Script
- **Description:** Create `scripts/generate-brand-assets.ts` using `sharp` to process `almadungduong/alma-dung-dưỡng.jpg` and `almadungduong/web-icon.jpg` into all standard web formats and sizes.
- **Outputs generated:**
  - `src/app/favicon.ico` (multi-resolution 16x16, 32x32, 48x48)
  - `src/app/icon.png` (32x32, 192x192)
  - `src/app/apple-icon.png` (180x180)
  - `public/og-image.jpg` (1200x630, brand color letterbox)
  - `public/brand/web-icon-192.png` & `public/brand/web-icon-512.png`
  - `public/brand/alma-dung-duong.webp` (optimized 800px display)
- **Acceptance Criteria:**
  - [ ] All output dimensions match web specifications exactly.
  - [ ] No visual stretching or distortion occurs on letterboxed 1200x630 OG image.
  - [ ] File sizes are optimized (< 50 KB for icons, < 150 KB for OG image).
- **Verification:** `npx tsx scripts/generate-brand-assets.ts` executes with exit code 0 and files exist on disk.
- **Scope:** Small (1 script file + generated assets).

---

### Phase 2: Metadata & Web App Configuration

#### Task 2: Root Layout Metadata & OpenGraph Configuration
- **Description:** Update `src/app/layout.tsx` to set `metadataBase`, comprehensive OpenGraph image definitions, Twitter card specs, and explicit icon associations.
- **Files touched:**
  - `src/app/layout.tsx`
- **Acceptance Criteria:**
  - [ ] `metadataBase` set using `process.env.NEXT_PUBLIC_SITE_URL || 'https://almadungduong.vn'`.
  - [ ] OpenGraph image correctly references `/og-image.jpg` with `width: 1200`, `height: 630`, `alt: "Alma Dung Dưỡng - Mỹ phẩm Vi sinh Hoa Ngân"`.
  - [ ] Icons block includes `favicon.ico`, `icon.png`, and `apple-icon.png`.
- **Verification:** `npm run build` succeeds without `metadataBase` warnings.
- **Scope:** Small (1 file).

#### Task 3: PWA Web Manifest Integration
- **Description:** Implement `src/app/manifest.ts` providing standard PWA metadata, theme color (`#708d81`), background color (`#FAF8F5`), and references to the generated 192x192 and 512x512 icons.
- **Files touched:**
  - `src/app/manifest.ts`
- **Acceptance Criteria:**
  - [ ] Route `/manifest.webmanifest` returns valid JSON matching W3C Web App Manifest spec.
  - [ ] Theme color matches Alma brand palette.
- **Verification:** Unit test or curl to `/manifest.webmanifest` verifying HTTP 200 and JSON schema.
- **Scope:** Small (1 file).

---

### Phase 3: UI Brand Component Integration

#### Task 4: Admin Sidebar & Client Layout Brand Mark Update
- **Description:** Update `src/components/admin/AdminSidebar.tsx` to replace the placeholder Unicode `◆` with the brand emblem (`Image` component loading `/brand/web-icon-192.png` or an inline SVG mark). Optionally enhance `Header.tsx` brand logo mark.
- **Files touched:**
  - `src/components/admin/AdminSidebar.tsx`
  - `src/components/layout/Header.tsx` (optional subtle emblem)
- **Acceptance Criteria:**
  - [ ] Admin sidebar displays the authentic circular brand emblem.
  - [ ] Zero layout shift or styling regression on desktop and mobile drawer menus.
- **Verification:** Visual check in browser + component unit test.
- **Scope:** Small (1-2 files).

---

### Phase 4: Production Cloudinary Synchronization & CI/CD Safety

#### Task 5: Cloudinary Brand Asset Sync Script
- **Description:** Create `scripts/sync-brand-assets.ts` using the project's existing Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) to safely upload the brand assets to `almadungduong/brand/` on Cloudinary.
- **Files touched:**
  - `scripts/sync-brand-assets.ts`
  - `package.json` (add convenience script `npm run sync:brand`)
- **Acceptance Criteria:**
  - [ ] Uploads `web-icon.png`, `og-image.jpg`, and `alma-dung-duong.jpg` to folder `almadungduong/brand/`.
  - [ ] Overwrites/updates existing assets safely using idempotent `overwrite: true`.
  - [ ] Logs public URLs for easy verification.
- **Verification:** Dry-run or execute against test/staging Cloudinary environment.
- **Scope:** Small (1 script).

---

### Phase 5: Verification & Quality Assurance

#### Task 6: End-to-End Build & Validation
- **Description:** Execute test suites, verify production Next.js build, and validate metadata headers and image rendering.
- **Verification steps:**
  - [ ] `npx vitest run`: All existing tests continue to pass.
  - [ ] `npm run build`: Production bundle builds without errors or metadata warnings.
  - [ ] Static routes pre-render successfully.
  - [ ] Check `/favicon.ico`, `/og-image.jpg`, and `/manifest.webmanifest` respond with HTTP 200 and valid content types.
- **Scope:** Verification only.

---

## 6. Checkpoints & Quality Gates

```markdown
### Checkpoint 1 (After Tasks 1-3):
- [ ] Brand assets generated in all required formats.
- [ ] Favicon, Apple icon, and OG image present in public/ and src/app/.
- [ ] Next.js build succeeds with zero metadata warnings.

### Checkpoint 2 (After Tasks 4-5):
- [ ] UI components render brand logo and icons cleanly.
- [ ] Cloudinary sync script verified.
- [ ] Full Vitest suite passes.
```

---

## 7. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
| :--- | :---: | :---: | :--- |
| **Social Scraper Image Caching** | Med | High | Configure `og:image` with version query string or Cloudinary timestamped URL so Facebook/Zalo instantly pick up the new banner. |
| **Favicon Browser Cache Sticking** | Low | High | Browsers aggressively cache `/favicon.ico`. Next.js file-based icons generate hashed query params in HTML tags to force instant client refresh. |
| **1200×630 Image Distortion** | High | Low | Automated letterbox/padding script with exact brand green background `#708d81` guarantees zero aspect-ratio stretching. |
| **Build failure on Vercel** | High | Low | Keep all static assets in git (`public/` and `src/app/`), avoiding external network calls during `next build`. |

---

## 8. Rollback Strategy
If any regression or visual dissatisfaction occurs:
1. `git restore src/app/layout.tsx src/components/admin/AdminSidebar.tsx`
2. Remove generated files from `public/brand/` and `src/app/icon.png`.
3. Re-run `npm run build` to restore previous build state in under 60 seconds.
