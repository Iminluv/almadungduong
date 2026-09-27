# SEO Implementation Plan — Alma Dung Dưỡng (Hoa Ngân)

**Domain:** almadungduong.com
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Prisma 7 · Neon PostgreSQL · Cloudinary · Vercel
**Từ khóa chủ lực:** `mỹ phẩm vi sinh Hoa Ngân` · `mỹ phẩm vi sinh` · `mỹ phẩm thiên nhiên`
**Phạm vi:** Audit codebase thực tế + hạng mục còn thiếu — không phải hướng dẫn dựng mới từ đầu.

---

## 0. Mục tiêu & thước đo

| Mục tiêu | Chỉ số | Deadline đề xuất |
|---|---|---|
| Index đầy đủ sản phẩm/danh mục | Coverage report Search Console = 0 lỗi | Cuối Sprint 1 |
| Rich snippet xuất hiện trên SERP | Rich Results Test pass | Cuối Sprint 2 |
| Core Web Vitals "Good" | LCP < 2.5s · CLS < 0.1 · INP < 200ms (mobile) | Cuối Sprint 3 |
| Top 10 "mỹ phẩm vi sinh Hoa Ngân" | Rank tracking | 8–12 tuần sau go-live |

---

## Audit Hiện Trạng — Những Gì Đã Có

| Hạng mục | Trạng thái | File |
|---|---|---|
| `sitemap.ts` động (sản phẩm + blog) | ✅ Có, `revalidate = 86400` | `src/app/sitemap.ts` |
| `robots.ts` — disallow admin/api/checkout | ✅ Có | `src/app/robots.ts` |
| Root layout metadata (title + description + OG + Twitter) | ✅ Có | `src/app/layout.tsx` |
| `generateStaticParams` cho sản phẩm | ✅ Có, `revalidate = 60` | `src/app/san-pham/[slug]/page.tsx` |
| Blog page metadata tĩnh | ✅ Có | `src/app/blog/page.tsx` |
| Blog detail `generateMetadata` theo từng bài | ✅ Có | `src/app/blog/[slug]/page.tsx` |
| Product slug `@unique` trong schema | ✅ Có | `prisma/schema.prisma` |
| Metadata cho `/ve-chung-toi`, `/chung-chi`, `/khach-hang-than-thiet` | ✅ Có | các `page.tsx` tương ứng |
| Khu vực blog/kiến thức | ✅ Có (`/blog`) — dữ liệu tĩnh từ `data.ts` | `src/app/blog/` |

---

## Audit Hiện Trạng — Những Gì Còn Thiếu / Cần Sửa

### Lỗi nghiêm trọng

**1. OG URL trỏ sai domain** — `src/app/layout.tsx` L48:
```
url: "https://almadungduong.vn",   // SAI — domain thật là almadungduong.com
```
Google Search Console không xác minh được OG URL, rich preview Facebook/Zalo bị thiếu.

**2. `og-image.jpg` không tồn tại trong `public/`** — `src/app/layout.tsx` L52:
```
url: "/og-image.jpg",   // file này không tồn tại trong public/
```
Mọi trang chia sẻ mạng xã hội đều không có ảnh preview.

**3. Không có `generateMetadata` cho trang sản phẩm** — `src/app/san-pham/[slug]/page.tsx`:
Trang sản phẩm không export `generateMetadata`, dùng hoàn toàn title mặc định từ root layout:
`"Alma Dungduong | Mỹ phẩm Vi sinh Hoa Ngân"` — **mọi sản phẩm đều có title giống nhau**.
→ Duplicate title toàn bộ catalog → Google giảm xếp hạng, không có long-tail keyword trong SERP.

**4. Không có `generateMetadata` cho trang danh sách `/san-pham`** — `src/app/san-pham/page.tsx`:
Title fallback về root default, không chứa từ khóa cụ thể như "mỹ phẩm vi sinh Hoa Ngân".

**5. Không có Structured Data (JSON-LD) ở bất kỳ đâu trong codebase**:
Toàn bộ `src/` không có `@type`, `schema.org`, hay JSON-LD nào.
→ Không có Product rich snippet, không có Breadcrumb trên SERP, không có Organization Knowledge Panel.

**6. Không có `canonical` URL cho bất kỳ trang nào**:
`/san-pham?sort=price` và `/san-pham` bị Google coi là 2 trang riêng → duplicate content penalty.

### Cần cải thiện

**7. Từ khóa `mỹ phẩm thiên nhiên` hoàn toàn vắng trong mọi metadata**:
Keywords hiện tại trong `layout.tsx`:
```
["mỹ phẩm vi sinh", "alma dungduong", "chăm sóc da thảo dược", "phục hồi hệ vi sinh", "skincare thuần việt"]
```
Thiếu: `"mỹ phẩm vi sinh Hoa Ngân"` (từ khóa #1) và `"mỹ phẩm thiên nhiên"` (từ khóa #3).

**8. Schema `Product` thiếu field `metaTitle`/`metaDescription`**: Admin không thể override SEO text cho từng sản phẩm; mọi meta đều phải auto-generate.

**9. `Category` thiếu `description` dài**: Model chỉ có `name` + `slug`. Trang `/san-pham` chỉ có grid sản phẩm trơ, không có on-page content → khó rank từ khóa danh mục.

**10. `lastModified` static routes dùng `new Date()` (ngày build)** — `src/app/sitemap.ts`:
Mỗi lần rebuild, static route báo cáo "vừa cập nhật" dù không có gì thay đổi → Google mất tin tưởng crawl signal.

**11. Blog detail không truyền `post` data vào component** — `src/app/blog/[slug]/page.tsx` L45:
`return <BlogDetailView />` — không truyền `post`, `BlogDetailView` render nội dung hardcode.
`generateMetadata` hoạt động nhưng nội dung trang không match metadata → Google có thể flag mismatch.

---

## Phase 1 — Sửa lỗi khẩn cấp (Sprint 1 — Ưu tiên Cao)

### 1.1 Fix OG URL + Tạo og-image.jpg

**`src/app/layout.tsx`** — sửa `openGraph`:
```ts
openGraph: {
  url: "https://almadungduong.com",  // sửa từ .vn → .com
  images: [
    {
      url: "https://almadungduong.com/og-image.jpg",  // absolute URL
      width: 1200,
      height: 630,
      alt: "Mỹ phẩm Vi sinh Hoa Ngân — Alma Dung Dưỡng",
    },
  ],
},
```
Tạo `public/og-image.jpg` (1200×630px) với text "Mỹ phẩm Vi sinh Hoa Ngân" và logo thương hiệu.

### 1.2 Thêm `metadataBase` + Canonical URL

**`src/app/layout.tsx`** — thêm vào root metadata:
```ts
metadataBase: new URL("https://almadungduong.com"),
alternates: { canonical: "/" },
```
Tại từng route tĩnh (`ve-chung-toi`, `chung-chi`, `blog`, v.v.) thêm:
```ts
alternates: { canonical: "https://almadungduong.com/ve-chung-toi" },
```

### 1.3 Bổ sung từ khóa thiếu vào root metadata

**`src/app/layout.tsx`** — sửa `keywords`:
```ts
keywords: [
  "mỹ phẩm vi sinh Hoa Ngân",   // thêm — từ khóa #1
  "mỹ phẩm vi sinh",
  "mỹ phẩm thiên nhiên",         // thêm — từ khóa #3
  "alma dungduong",
  "chăm sóc da thảo dược",
  "phục hồi hệ vi sinh",
  "skincare thuần việt",
],
```

---

## Phase 2 — Metadata động theo từng trang (Sprint 1–2 — Ưu tiên Cao)

### 2.1 `generateMetadata` cho trang sản phẩm

**Thêm vào `src/app/san-pham/[slug]/page.tsx`** (trước `generateStaticParams`):

```ts
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });

  if (!product) return { title: "Sản phẩm không tồn tại" };

  const title = `${product.title} — Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng`;
  const description =
    product.description?.slice(0, 155) ??
    `${product.title} — mỹ phẩm vi sinh Hoa Ngân chính hãng tại Alma Dung Dưỡng.`;
  const ogImage = product.images[0]?.url ?? product.image;

  return {
    title,
    description,
    alternates: { canonical: `https://almadungduong.com/san-pham/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://almadungduong.com/san-pham/${slug}`,
      images: [{ url: ogImage, width: 800, height: 800, alt: product.title }],
      locale: "vi_VN",
      type: "website",
    },
  };
}
```

Pattern title: `[Tên sản phẩm] — Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng` (50–70 ký tự)

### 2.2 Metadata tĩnh cho trang danh sách `/san-pham`

**Thêm vào `src/app/san-pham/page.tsx`:**
```ts
export const metadata: Metadata = {
  title: "Mỹ phẩm Vi sinh Hoa Ngân — Toàn Bộ Sản Phẩm | Alma Dung Dưỡng",
  description:
    "Khám phá bộ sưu tập mỹ phẩm vi sinh Hoa Ngân chính hãng: nước dưỡng, serum, kem dưỡng và bộ liệu trình phục hồi hệ vi sinh tự nhiên cho làn da.",
  alternates: { canonical: "https://almadungduong.com/san-pham" },
  keywords: [
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm vi sinh",
    "mỹ phẩm thiên nhiên",
    "serum vi sinh",
    "kem dưỡng vi sinh",
  ],
};
```

### 2.3 Bổ sung từ khóa cho các trang hỗ trợ

| Trang | File | Thay đổi cần làm |
|---|---|---|
| `/ve-chung-toi` | `ve-chung-toi/page.tsx` | Thêm "mỹ phẩm vi sinh Hoa Ngân", "mỹ phẩm thiên nhiên" vào description |
| `/chung-chi` | `chung-chi/page.tsx` | Thêm "mỹ phẩm vi sinh Hoa Ngân chứng nhận" vào title |
| `/blog` | `blog/page.tsx` | Thêm "mỹ phẩm vi sinh", "mỹ phẩm thiên nhiên" vào description + canonical |
| Root layout | `layout.tsx` | Sửa description thêm "mỹ phẩm vi sinh thiên nhiên" |

---

## Phase 3 — Structured Data JSON-LD (Sprint 2 — Ưu tiên Cao)

Hiện tại **không có bất kỳ structured data nào** trong toàn bộ codebase. Đây là hạng mục tạo impact SERP lớn nhất (rich snippet sản phẩm, breadcrumb, organization knowledge panel).

### 3.1 Organization Schema — root layout

Thêm vào `src/app/layout.tsx` trong `<head>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Alma Dung Dưỡng",
      alternateName: "Mỹ phẩm Vi sinh Hoa Ngân",
      url: "https://almadungduong.com",
      logo: "https://almadungduong.com/og-image.jpg",
      sameAs: ["https://www.facebook.com/almadungduong"],
    }),
  }}
/>
```

### 3.2 Product Schema — trang chi tiết sản phẩm

Thêm vào `src/app/san-pham/[slug]/page.tsx` (server component, inject vào JSX):
```tsx
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  description: product.description,
  image: product.images.map((img: any) => img.url),
  brand: { "@type": "Brand", name: "Hoa Ngân" },
  offers: {
    "@type": "Offer",
    priceCurrency: "VND",
    price: product.price,
    availability: "https://schema.org/InStock",
    url: `https://almadungduong.com/san-pham/${product.slug}`,
  },
  // Chỉ thêm khi reviews thật tồn tại — không hardcode số giả
  ...(product.reviews.length > 0 && {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  }),
};
```

### 3.3 BreadcrumbList Schema — trang sản phẩm

```tsx
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://almadungduong.com" },
    { "@type": "ListItem", position: 2, name: "Sản phẩm", item: "https://almadungduong.com/san-pham" },
    { "@type": "ListItem", position: 3, name: product.title, item: `https://almadungduong.com/san-pham/${product.slug}` },
  ],
};
```

Sau mỗi lần thêm/sửa structured data: chạy Rich Results Test, không merge nếu còn lỗi field bắt buộc.

---

## Phase 4 — Schema DB & Admin Control (Sprint 2 — Ưu tiên Trung bình)

### 4.1 Migration: thêm field SEO vào Product và Category

```prisma
model Product {
  // ... field hiện có giữ nguyên ...
  metaTitle       String?   // override title tag; fallback về title nếu null
  metaDescription String?   // override meta description; fallback về description[:155]
}

model Category {
  // ... field hiện có giữ nguyên ...
  description     String?   // rich text on-page content cho trang danh mục
  metaTitle       String?
  metaDescription String?
}
```

Sau migration: cập nhật `generateMetadata` trang sản phẩm để ưu tiên `metaTitle`/`metaDescription` từ DB trước khi fallback auto-generate.

### 4.2 Admin UI: section SEO trong ProductForm

Thêm vào `src/components/admin/ProductForm.tsx`:
- Input `Meta Title` (max 70 ký tự, character counter)
- Textarea `Meta Description` (max 155 ký tự, character counter)
- Preview SERP giả lập (hiển thị title + URL + description như trên Google)

---

## Phase 5 — Content & Blog (Sprint 2–3 — Ưu tiên Trung bình)

### 5.1 Fix blog detail không truyền data vào component

**`src/app/blog/[slug]/page.tsx` L45** — sửa:
```tsx
// Hiện tại (sai — BlogDetailView không nhận post):
return <BlogDetailView />;

// Sửa thành:
return <BlogDetailView post={post} />;
```
Cập nhật `BlogDetailView` để nhận và render `post.content` thật — đảm bảo nội dung khớp với metadata.

### 5.2 Gắn từ khóa chủ lực vào blog posts trong `data.ts`

| Bài blog | Từ khóa target |
|---|---|
| "Probiotics · Prebiotics · Postbiotics" | `mỹ phẩm vi sinh` |
| Bài mới: "mỹ phẩm thiên nhiên cho da nhạy cảm" | `mỹ phẩm thiên nhiên` |
| Bài mới: "review Hoa Ngân vi sinh" | `mỹ phẩm vi sinh Hoa Ngân` |

Cần một trang giới thiệu nêu rõ nguồn gốc công thức vi sinh, chứng nhận nếu có — ngành mỹ phẩm thuộc nhóm nội dung "ảnh hưởng sức khỏe" nên Google đánh giá khắt khe hơn về độ tin cậy của nguồn thông tin.

---

## Phase 6 — Sitemap & Robots Refinement (Sprint 1 — Ưu tiên Trung bình)

### 6.1 Sửa `lastModified` static routes

**`src/app/sitemap.ts`** — thay `new Date()` bằng ngày cố định thực tế:
```ts
// Sai: lastModified: new Date(),
// Đúng:
lastModified: new Date("2026-09-01"),  // ngày cập nhật thực tế cuối cùng
```

### 6.2 Priority phân tầng

Hiện `priority: 0.9` cho tất cả sản phẩm. Điều chỉnh về `0.8` để phân biệt với `/san-pham` (0.9) và homepage (1.0).

### 6.3 Xác nhận robots pattern

Robots hiện chặn `/tai-khoan` — xác nhận pattern chặn đủ toàn bộ `/tai-khoan/*` (kể cả `/tai-khoan/reset-password`). Không vô tình chặn route sản phẩm/danh mục.

---

## Phase 7 — Performance / Core Web Vitals (Sprint 3 — Ưu tiên Cao)

- Ảnh chính trên `ProductDetailView` (yếu tố LCP) cần `priority` prop của `next/image`
- Ảnh sản phẩm qua Cloudinary cần transformation tự động: `f_auto,q_auto,w_800`
- Kiểm tra layout shift từ HeroCarousel (Framer Motion animation trên mobile)
- Thiết lập Lighthouse CI trong `.github/workflows/` với ngưỡng Performance ≥ 85
- Kết nối Google Search Console cho domain, theo dõi CWV theo dữ liệu thực tế (CrUX), không chỉ số lab

---

## QA Checklist — Trạng Thái Triển Khai

- [x] `<title>` mỗi trang là duy nhất, chứa ít nhất 1 từ khóa chủ lực (Hoa Ngân, vi sinh, thiên nhiên)
- [x] `<meta name="description">` 120–155 ký tự, tối ưu riêng biệt giữa các trang
- [x] Canonical URL khớp với URL thực tế, có `metadataBase: https://almadungduong.com`
- [x] `og:url` trỏ đúng `almadungduong.com` (đã sửa toàn bộ `.vn` -> `.com`)
- [x] OG image tồn tại trong `public/og-image.jpg`, kích thước 1200×630px
- [x] Structured data JSON-LD: Organization, Product, Article, BreadcrumbList
- [x] Blog detail render `post` data thật được truyền từ server
- [x] Sản phẩm động & blog xuất hiện trong sitemap với lastModified và priority phân tầng

---

## Tổng Hợp Ưu Tiên Theo Impact

| Hạng mục | Phase | Ưu tiên | Lý do |
|---|---|---|---|
| Fix OG URL `.vn` → `.com` + tạo `og-image.jpg` | 1 | 🔴 Khẩn cấp | Preview mạng xã hội hỏng hoàn toàn |
| `generateMetadata` trang sản phẩm (từ khóa trong title) | 2 | 🔴 Cao | Duplicate title cho toàn bộ sản phẩm |
| Thêm canonical URL cho mọi trang | 1 | 🔴 Cao | Tránh duplicate content penalty |
| Thêm `mỹ phẩm thiên nhiên` vào keywords/descriptions | 1 | 🟠 Cao | Từ khóa #3 hoàn toàn vắng mặt |
| Structured data: Product + Breadcrumb + Organization | 3 | 🟠 Cao | Zero rich snippet hiện tại |
| Metadata tĩnh cho `/san-pham` | 2 | 🟠 Cao | Trang catalog chính không có keyword |
| Fix blog detail truyền `post` data vào component | 5 | 🟠 Trung bình | Content/metadata mismatch |
| Schema DB: `metaTitle`/`metaDescription` + admin UI | 4 | 🟡 Trung bình | Tối ưu thủ công cho sản phẩm quan trọng |
| Sửa `lastModified` static routes trong sitemap | 6 | 🟡 Trung bình | Crawl frequency signal |
| Sitemap priority refinement | 6 | 🟢 Thấp | Minor signal |
| Performance / Core Web Vitals | 7 | 🟠 Cao | Ảnh hưởng ranking mobile |
