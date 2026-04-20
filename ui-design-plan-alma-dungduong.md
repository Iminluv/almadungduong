# UI Design Plan — Alma Dungduong
### Mỹ phẩm Vi sinh Hoa Ngân · Minimalist Edition

---

## 1. Thông Tin Dự Án

| Hạng mục | Chi tiết |
|---|---|
| **Tên thương hiệu** | Alma Dungduong |
| **Sản phẩm** | Đại lý Mỹ phẩm Vi sinh Hoa Ngân · Dụng cụ làm đẹp · Dưỡng sinh |
| **Mục tiêu** | Bán hàng (cart + online + COD) · Dẫn về mạng xã hội |
| **Dev** | Tự code — Next.js 14 |
| **Target user** | Nữ 20–50 tuổi, quan tâm da khỏe tự nhiên |
| **Phong cách** | Minimalism · Không icon · Typography-driven · Whitespace rộng |
| **Tone** | Tự nhiên · Khoa học tin cậy · Chân thực · Tĩnh lặng |

### 1.1 Tech Stack & State Management

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: **Zustand** (Ultra-lightweight state management for Cart and UI lifecycle)
- **Persistance**: LocalStorage (via Zustand middleware)


---

## 2. Sitemap

```
ALMA DUNGDUONG
│
├── TRANG CHỦ
├── SẢN PHẨM
│   ├── Mỹ phẩm vi sinh Hoa Ngân
│   │   ├── Xịt dưỡng
│   │   ├── Vi sinh
│   │   ├── Sữa rửa mặt
│   │   ├── Kem chống nắng
│   │   └── Ưu đãi combo
│   ├── Dụng cụ làm đẹp
│   └── Sản phẩm dưỡng sinh
│       └── [Trang chi tiết sản phẩm]
├── KẾT QUẢ KHÁCH HÀNG
├── KHUYẾN MÃI
├── VỀ CHÚNG TÔI
│   ├── Câu chuyện làn da
│   ├── Mỹ phẩm vi sinh là gì?
│   ├── Hành trình 20 năm
│   └── 7 Cam kết
├── SHARING IS CARING
├── BLOG (ưu tiên thấp)
├── LIÊN HỆ
└── TÀI KHOẢN
    ├── Đăng nhập / Đăng ký
    └── Dashboard
```

---

## 3. Hệ Thống Màu — Tối Giản 6 Màu

> Triết lý: Whitespace là màu chủ đạo. Màu chỉ xuất hiện khi cần truyền nghĩa.

| Token | Hex | Vai trò |
|---|---|---|
| `--bg` | `#FAF8F5` | Nền toàn trang — kem trắng ấm |
| `--surface` | `#F0EDE8` | Nền section xen kẽ, card, input |
| `--text` | `#1C1C1A` | Mọi text chính |
| `--muted` | `#8A8680` | Caption, placeholder, label phụ, giá gốc |
| `--accent` | `#2E6B4F` | CTA button, link active, underline hover |
| `--navy` | `#00347D` | Trust — announcement bar, footer, badge chứng nhận |

**Không dùng thêm màu nào khác.** Tạo độ phân cấp bằng:
- Opacity của `--text`: 100% / 60% / 30%
- Font weight: 400 / 500 / 600 / 700
- Kích thước chữ
- Khoảng trống (whitespace)

**Màu trạng thái (dùng đúng lúc, đúng chỗ):**
- Lỗi / Hết hàng: `#C0392B`
- Thành công / Còn hàng: dùng lại `--accent`

---

## 4. Typography

> Không icon — Typography gánh toàn bộ vai trò truyền thông.

| Cấp độ | Font | Mobile | Desktop | Weight |
|---|---|---|---|---|
| Display | Playfair Display | 38px | 68px | 700 |
| H1 | Playfair Display | 30px | 48px | 600 |
| H2 | Playfair Display | 24px | 36px | 600 |
| H3 | Inter | 17px | 20px | 600 |
| Body | Inter | 15px | 16px | 400 |
| Small | Inter | 13px | 13px | 400 |
| Label | Inter | 11px | 12px | 500, uppercase, letter-spacing 0.08em |
| Quote | Lora | 18px | 22px | 400 italic |
| Button | Inter | 14px | 14px | 600, uppercase, letter-spacing 0.06em |

**Google Fonts:** `Playfair+Display:wght@600;700` · `Inter:wght@400;500;600` · `Lora:ital,wght@1,400`

**Quy tắc thay icon bằng text/ký tự:**
- Mũi tên điều hướng → ký tự `→` `↗` `←`
- Đóng → `×`
- Menu hamburger → chữ `MENU`
- Giỏ hàng → `GIỎ (2)`
- Tài khoản → `TK` hoặc `TÀI KHOẢN`
- Dấu cộng thêm sản phẩm → `+`
- Rating → Unicode `★` `☆` (không dùng icon library)
- Check → `✓`

---

## 5. Spacing & Layout

- **Base unit:** 8px
- **Container:** max-width 1200px · padding `0 20px` (mobile) / `0 48px` (desktop)
- **Section padding:** `80px 0` (desktop) / `56px 0` (mobile)
- **Grid:** 12 cột · gutter 24px (desktop) / 16px (mobile)
- **Border radius:** `4px` input/tag · `8px` card · `2px` button (gần vuông — minimalist)
- **Border:** `1px solid rgba(28,28,26,0.10)` — thay cho shadow hoàn toàn
- **Shadow:** Không dùng. Ngoại lệ duy nhất: modal `0 32px 64px rgba(0,0,0,0.12)`
- **Divider:** `1px solid var(--surface)`

---

## 6. Components — Layout, Hover & Animation Chi Tiết

---

### 6.1 Announcement Bar

```
┌────────────────────────────────────────────────────────────────┐
│  bg: #00347D                                                    │
│  FREE SHIP cho đơn từ 1.000.000đ  ·  Đồng hành 1:1 miễn phí  [×] │
└────────────────────────────────────────────────────────────────┘
```

**Specs:** height 40px · text white Inter 400 13px · căn giữa.

**Animation:**
- Xuất hiện lần đầu: `height 0→40px` + `opacity 0→1`, 400ms, `ease-out`, delay 800ms.
- Đóng (click `×`): `height 40px→0` + `opacity 1→0`, 250ms, `ease-in`. Lưu vào `sessionStorage`.
- Mobile text dài: CSS `animation: marquee 18s linear infinite`. Pause khi `hover`.

---

### 6.2 Header / Navigation

```
DESKTOP:
┌────────────────────────────────────────────────────────────────────┐
│  ALMA DUNGDUONG    Trang chủ  Sản phẩm  Kết quả  Về chúng tôi    │
│                                              Blog  GIỎ (0)  TK    │
└────────────────────────────────────────────────────────────────────┘

MOBILE:
┌────────────────────────────────────────────┐
│  ALMA DUNGDUONG                GIỎ (0)  MENU │
└────────────────────────────────────────────┘
```

**Specs:**
- Height: 64px desktop / 56px mobile.
- Logo: "ALMA" Playfair Display 700 20px + "DUNGDUONG" Inter 400 14px letter-spacing 0.15em. Không hình.
- Nav links: Inter 500 14px, letter-spacing 0.04em, `--text` 70%.
- "GIỎ (n)" và "TK": Inter 600 13px, letter-spacing 0.06em.
- Background mặc định: `transparent`.
- Sticky sau scroll >60px: `rgba(250,248,245,0.94)` + `backdrop-filter: blur(12px)` + border-bottom `1px solid var(--surface)`.

**Hover — Nav links:**
- Color: `--text` 70% → 100%, 150ms.
- Underline: `border-bottom: 1px solid var(--text)`, `width: 0→100%` từ trái sang phải, 200ms `ease`.

**Hover — GIỎ / TK:**
- Background: `transparent → var(--surface)`, border-radius 4px, 150ms.

**Sticky transition:** background + border + backdrop-filter, 200ms `ease`.

**Dropdown "Sản phẩm" (Desktop):**
```
┌──────────────────────────────────────────────────────┐
│  Mỹ phẩm vi sinh Hoa Ngân                            │
│  Xịt dưỡng          Kem chống nắng                   │
│  Vi sinh             Ưu đãi combo                    │
│  Sữa rửa mặt                                         │
│  ────────────────────────────────────────────────── │
│  Dụng cụ làm đẹp         Sản phẩm dưỡng sinh         │
└──────────────────────────────────────────────────────┘
```
- Mở: `opacity 0→1` + `translateY(-8px→0)`, 200ms `ease-out`.
- Đóng: `opacity 1→0` + `translateY(0→-6px)`, 150ms.
- bg `--bg` · border `1px solid var(--surface)` · border-radius 8px.
- Link hover: background `var(--surface)`, 120ms.

**Mobile drawer:**
- Mở: overlay `rgba(0,0,0,0.3)` fade 200ms + drawer `translateX(100%→0)`, 320ms, `cubic-bezier(0.25,0.46,0.45,0.94)`.
- Đóng: translateX ngược lại, 250ms.
- Width: `min(360px, 85vw)`. bg `--bg`. Border-left `1px solid var(--surface)`. Không shadow.
- Nav items stagger: mỗi item `opacity 0→1` + `translateX(12px→0)`, delay tăng 40ms/item, 300ms `ease-out`.

---

### 6.3 Hero Section

```
┌──────────────────────────────────────────────────────────────────┐
│  [Ảnh nền: da/thảo dược, tone kem, sáng, tối giản]              │
│  Overlay: linear-gradient(to right,                              │
│    rgba(250,248,245,0.92) 45%, transparent 85%)                  │
│                                                                  │
│  Khoa Học Vi Sinh              ┌────────────────────────┐        │
│  Cho Làn Da                    │                        │        │
│  Nguyên Bản.                   │  [Ảnh sản phẩm Hoa     │        │
│                                │   Ngân — nền --surface]│        │
│  4 sản phẩm · 28 vấn đề da.   │                        │        │
│  Không hóa chất độc hại.       └────────────────────────┘        │
│                                                                  │
│  [Mua ngay]    Tìm hiểu thêm →                                   │
│                                                                  │
│  ─────  Cuộn để khám phá  ─────                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Specs:**
- min-height: `100svh` (mobile) / `90vh` (desktop).
- Heading: Playfair 700, ngắt dòng chủ động.
- Tagline: Inter 400 16px, `--muted`, margin-top 16px.
- "Mua ngay": bg `--accent`, white, padding `14px 32px`, border-radius 2px.
- "Tìm hiểu thêm →": text-only, color `--navy`, `border-bottom: 1px solid var(--navy)`.
- Ảnh sản phẩm: max-width 340px, bg `--surface`, border-radius 4px.
- "Cuộn để khám phá": Inter 11px uppercase letter-spacing 0.12em, `--muted`, absolute bottom 32px.

**Animation — Entrance (page load):**
- Heading dòng 1: `opacity 0→1` + `translateY(20px→0)`, delay 100ms, 600ms, `ease-out`.
- Heading dòng 2: delay 200ms.
- Heading dòng 3: delay 300ms.
- Tagline: delay 450ms, 500ms.
- Buttons: delay 600ms, 400ms.
- Ảnh sản phẩm: `opacity 0→1` + `translateX(24px→0)`, delay 350ms, 700ms, `ease-out`.
- "Cuộn để khám phá": `opacity 0→0.5`, delay 1400ms, 600ms. Sau đó: `translateY(0→6px→0)` loop 2s infinite.

**Hover — "Mua ngay":** bg `--accent → #25573F`, 180ms. Không scale.

**Hover — "Tìm hiểu thêm →":**
- Text opacity `0.7→1.0`, 150ms.
- Ký tự `→`: `translateX(0→4px)`, 200ms `ease`.

---

### 6.4 Trust Strip

```
┌──────────────────────────────────────────────────────────────────┐
│  bg: --surface                                                    │
│  Khoa học vi sinh  ·  Thảo dược Việt Nam  ·  Kiểm nghiệm lâm    │
│  sàng  ·  Chứng nhận EWG/FDA  ·  COD toàn quốc                   │
└──────────────────────────────────────────────────────────────────┘
```

**Specs:** padding `20px 0`. Các mục cách nhau bằng `·` `--muted`. Text Inter 500 13px letter-spacing 0.05em, `--text` 80%.

**Animation:**
- Scroll vào viewport: `opacity 0→1`, 500ms `ease-out` (IntersectionObserver threshold 0.3).
- Mobile: CSS marquee `18s linear infinite` nếu nội dung vượt width.

---

### 6.5 Section "4 Sản Phẩm · 28 Vấn Đề Da"

**Layout:** 2 cột 50/50 (desktop) / Stack (mobile).

```
CỘT TRÁI:                         CỘT PHẢI (accordion):
Chỉ 4 sản phẩm.                   + Độ ẩm                  1
Giải quyết 28                      + Viêm & Mụn             8
vấn đề về da.                      + Da nhạy cảm            5
                                   + Sắc tố da              5
Nhờ cơ chế tác động của Hệ         + Lão hóa                4
Lợi Khuẩn và Tinh Chất
Thảo Dược Việt Nam.

Xem sản phẩm →
```

**Accordion:**
- Expand: `grid-template-rows: 0fr→1fr`, 300ms `ease-out`.
- Ký tự `+` rotate `0→45deg`, 250ms `ease`.
- Exclusive — chỉ 1 item mở cùng lúc.
- Nội dung con stagger fade-in: 30ms/item.

**Scroll-triggered:**
- Cột trái: `opacity 0→1` + `translateX(-20px→0)`, 600ms `ease-out`.
- Cột phải: `opacity 0→1` + `translateX(20px→0)`, delay 150ms, 600ms.

**Hover "Xem sản phẩm →":**
- Underline `scaleX(0→1)`, transform-origin left, 200ms.
- `→`: `translateX(0→5px)`, 200ms.

---

### 6.6 Product Card

```
┌──────────────────────────────┐
│                              │
│  [Ảnh sản phẩm]              │
│  bg: --surface, aspect 4/5   │
│                              │
├──────────────────────────────┤
│  BESTSELLER                  │  ← Label 10px uppercase --accent
│                              │
│  Xịt Dưỡng Vi Sinh Hoa Ngân  │  ← H3 Inter 600
│                              │
│  ★★★★★  4.8 · 256 đánh giá   │  ← Inter 13px --muted
│                              │
│  285.000₫                    │  ← Inter 700 18px --text
│  350.000₫                    │  ← Inter 400 14px --muted line-through
│                              │
│  [Thêm vào giỏ]              │  ← xuất hiện khi hover card
└──────────────────────────────┘
```

**Hover (toàn card):**
- Border: `1px solid transparent → 1px solid rgba(28,28,26,0.15)`, 200ms.
- Ảnh: `scale(1→1.04)`, 400ms `ease-out` (overflow hidden).
- Button "Thêm vào giỏ": `opacity 0→1` + `translateY(8px→0)`, 250ms `ease-out`.
- Không lift card, không shadow.

**Click "Thêm vào giỏ":**
- Text → "Đã thêm ✓", cross-fade 150ms. Revert sau 1.5s.
- Badge GIỎ header: `scale 1→1.3→1`, 300ms `cubic-bezier(0.34,1.56,0.64,1)`.

**Skeleton loader:**
- Shimmer: `background-position: -200%→200%`, 1.5s linear infinite.
- 3 dải text: width 60% / 40% / 30%, cùng shimmer + stagger delay.

---

### 6.7 Product Listing Page (PLP)

**Desktop:** Sidebar 240px sticky + Main grid.
**Mobile:** "Lọc & Sắp xếp" button → bottom sheet.

**Sidebar Filter:**
```
DANH MỤC
─────────────────────────────────
Mỹ phẩm vi sinh Hoa Ngân
  Xịt dưỡng · Vi sinh · Sữa rửa mặt
  Kem chống nắng · Ưu đãi combo
Dụng cụ làm đẹp
Sản phẩm dưỡng sinh

VẤN ĐỀ DA
─────────────────────────────────
[ ] Mụn & viêm
[ ] Da nhạy cảm
[ ] Thâm nám
[ ] Lão hóa
[ ] Độ ẩm

GIÁ
─────────────────────────────────
[══════●════] 100k — 600k

Xoá bộ lọc
```

**Filter item hover:** bg `transparent→--surface`, 120ms. Text `--muted→--text`, 120ms.

**Checkbox:** `border: 1.5px solid var(--muted)`. Khi check: border-color + bg → `--accent`, dấu `✓` trắng fade in, 150ms `ease`.

**Range slider:** Track `--surface`, filled `--accent`. Thumb: 18px circle, bg `--bg`, border `2px solid --accent`. Thumb hover: `scale(1.15)`, 150ms.

**Apply filter:**
- Grid: `filter: blur(2px) opacity(0.5)`, 150ms `ease-in`.
- Load xong: blur→0 opacity→1, 300ms `ease-out`. Cards stagger 40ms.

**Bottom sheet (Mobile):**
- Mở: `translateY(100%→0)`, 350ms `cubic-bezier(0.25,0.46,0.45,0.94)`. Overlay fade 300ms.
- Handle: 40×4px bg `--muted` 40%, căn giữa top. Swipe down để đóng.

**Toolbar:**
```
Hiển thị 24 trong 48 sản phẩm         Sắp xếp: Phổ biến nhất ▾
```

---

### 6.8 Product Detail Page (PDP)

**Layout:** 2 cột 55/45 (desktop) / Stack (mobile).

**Gallery (cột trái):**
```
┌──────────────────────────────────┐
│  [Ảnh chính — aspect 1:1]        │
│  bg: --surface                   │
└──────────────────────────────────┘
[thumb1]  [thumb2]  [thumb3]
```

- Hover ảnh chính: `cursor: zoom-in`. Click → lightbox: overlay `rgba(28,28,26,0.88)` fade 200ms, ảnh `scale(0.85→1.0)` + fade 250ms.
- Thumbnail hover: `opacity 0.6→1.0`, border-bottom `2px solid --text`, 150ms.
- Thumbnail active: border-bottom `2px solid --accent`.
- Mobile swipe: `translateX(100%→0)` / `(0→-100%)`, 280ms `ease-out`.

**Info (cột phải):**
```
Trang chủ / Sản phẩm / Xịt dưỡng   ← 12px --muted

Xịt Dưỡng Vi Sinh Hoa Ngân
★★★★★  4.8 · 256 đánh giá · Còn hàng

─────────────────────────────────────

Dung tích
[30ml]   [60ml]   [100ml]

─────────────────────────────────────

Số lượng
[−]  [  1  ]  [+]

─────────────────────────────────────

285.000₫
350.000₫ (tiết kiệm 19%)

[Thêm vào giỏ hàng]
[Mua ngay / COD]

─────────────────────────────────────

FREE SHIP đơn từ 1.000.000đ
Đồng hành 1:1 miễn phí đến khi da đẹp
Đổi trả trong 7 ngày
[Chứng nhận EWG · FDA]
```

**Badge "Chứng nhận EWG · FDA":** bg `--navy`, white, Inter 11px letter-spacing 0.08em, padding `4px 10px`, border-radius 2px.

**Variant selector:**
- Default: border `1.5px solid --surface`, bg `--bg`.
- Hover: border-color `rgba(28,28,26,0.4)`, 150ms.
- Selected: border + bg `--text`, color `--bg`, 150ms `ease`.

**[−] [+]:**
- Hover: bg `--surface`, 120ms.

**Button "Thêm vào giỏ hàng":** bg `--accent`, white, 100%, padding `16px`, border-radius 2px. Hover: darken 8%. Loading: text fade out → 3 dot pulse → text "Đã thêm ✓" fade in.

**Button "Mua ngay / COD":** border `1.5px solid --navy`, color `--navy`, transparent bg. Hover: bg `--navy`, color white, 200ms `ease`.

**Sticky bottom bar (Mobile, xuất hiện khi scroll qua button gốc):**
```
┌────────────────────────────────────────────────────┐
│  285.000₫        [Thêm vào giỏ]    [Mua ngay]     │
└────────────────────────────────────────────────────┘
```
Xuất hiện: `translateY(100%→0)`, 250ms `ease-out`.

**Tabs:**
```
Mô tả   Thành phần   Hướng dẫn dùng   Đánh giá (256)
```
- Active: border-bottom `2px solid --text`, Inter 600.
- Inactive: `--muted`, border-bottom `2px solid transparent`.
- Hover: color `--text`, 150ms.
- Content switch: `opacity 0→1`, 250ms. Không slide.

**Tư vấn sidebar (Desktop, fade in sau scroll >300px):**
```
┌────────────────────────────┐
│  Tư vấn miễn phí 1:1       │
│  Phân tích da · Routine     │
│                            │
│  [Nhắn Zalo]               │
│  [Nhắn Messenger]          │
└────────────────────────────┘
```
Fade in `opacity 0→1`, 300ms. Border `1px solid --surface`.

---

### 6.9 Cart — Slide-over Drawer

```
┌────────────────────────────────────────┐
│  Giỏ hàng  (2)                    [×] │
│  ────────────────────────────────────  │
│  [Ảnh]  Xịt Dưỡng Vi Sinh 60ml        │
│          285.000₫    [−] [1] [+]  [×] │
│  [Ảnh]  Sữa Rửa Mặt Vi Sinh           │
│          250.000₫    [−] [1] [+]  [×] │
│  ────────────────────────────────────  │
│  Mã giảm giá:                          │
│  [_____________________] [Áp dụng]    │
│  ────────────────────────────────────  │
│  Tạm tính          535.000₫            │
│  Phí vận chuyển    Miễn phí            │
│  TỔNG              535.000₫            │
│                                        │
│  [Tiến hành thanh toán]               │
│  Tiếp tục mua sắm →                    │
└────────────────────────────────────────┘
```

**Mở:** overlay `rgba(0,0,0,0.3)` fade 200ms + `translateX(100%→0)`, 320ms `cubic-bezier(0.25,0.46,0.45,0.94)`.

**Đóng:** `translateX(0→100%)`, 250ms.

**Xoá item:** `opacity 1→0` + `height→0` + `marginBottom→0`, 300ms `ease-in`. Item bên dưới trượt lên mượt.

**Số lượng thay đổi → giá tổng:** cross-fade, 200ms.

---

### 6.10 Checkout — 3 Bước

**Progress stepper (text only, không icon):**
```
1. Thông tin  ─────  2. Vận chuyển  ─────  3. Thanh toán
```
- Active: Inter 600 `--text`, underline `2px solid --accent`.
- Completed: Inter 400 `--muted`.
- Connector line fill: `--accent`, `width: 0→100%`, 400ms khi step hoàn thành.
- Chuyển bước: `opacity 0→1` + `translateX(20px→0)`, 250ms.

**Input fields (underline style):**
- Default: `border-bottom: 1.5px solid var(--surface)`. bg transparent. Không border trái/phải/trên.
- Focus: border-bottom `1.5px solid --accent`, 150ms.
- Error: border-bottom `1.5px solid #C0392B`, error text `opacity 0→1` + `translateY(-4px→0)`, 200ms.
- Label: 12px uppercase `--muted` letter-spacing 0.08em.

**Thanh toán:**
```
( ) COD — Thanh toán khi nhận hàng
( ) Chuyển khoản ngân hàng
( ) MoMo
( ) ZaloPay
```
- Radio: circle 20px, border `1.5px solid --muted`. Selected: inner circle `--accent` `scale 0→0.6`, 200ms `cubic-bezier(0.34,1.56,0.64,1)`.

---

### 6.11 Trang Kết Quả Khách Hàng

**Filter bar:**
```
Tất cả  ·  Mụn  ·  Thâm nám  ·  Da nhạy cảm  ·  Lão hóa
```
- Active: Inter 600, border-bottom `1.5px solid --text`.
- Inactive: `--muted`. Hover: color `--text`, 150ms.
- Filter change: cards `opacity 0.4→1`, 300ms.

**Before/After slider:**
```
┌─────────────────────────────────────────┐
│  [TRƯỚC │ SAU]   ← drag divider         │
└─────────────────────────────────────────┘
Chị Lan · 35 tuổi · Mụn + thâm · 6 tuần
```
- Divider: `2px solid --bg`. Handle: `4×32px` bg `--bg`, border-radius 2px, `cursor: col-resize`.
- Hover handle: `width 4px→6px`, 150ms.
- Label "TRƯỚC/SAU": Inter 10px uppercase white, bg `rgba(28,28,26,0.5)`.
- Drag: throttle 16ms (60fps).

**Review card:**
```
★★★★★
"Trích dẫn từ khách hàng..."
Chị Minh Anh · TP.HCM · Da nhạy cảm
```
- Border `1px solid --surface`. Hover: border-color `rgba(28,28,26,0.2)`, 200ms.
- Rating `★`: color `--text` (không vàng — tối giản).
- Grid scroll vào: stagger 60ms, `opacity 0→1` + `translateY(16px→0)`, 450ms `ease-out`.

---

### 6.12 Trang Về Chúng Tôi

**Section 1 — Hero nhỏ:**
```
Thuần Tự Nhiên.
Từ Khoa Học Vi Sinh.
```
Playfair 700, căn giữa, padding `120px 0 80px`. Dòng 2 delay 200ms.

**Section 2 — Câu Chuyện Làn Da:**
- Mỗi pain point: 1 đoạn text, max-width 640px, căn giữa.
- Scroll vào: `opacity 0→1` + `translateY(20px→0)`, 600ms. Stagger 100ms/đoạn.
- Font: Lora italic 18px cho pain point. Inter 400 cho giải pháp.
- Quote kết thúc: Playfair lớn, nền `--surface`.

**Section 3 — Vi sinh là gì:**
- 2 cột: text trái + table Probiotics/Prebiotics/Postbiotics phải.
- Table: chỉ border-bottom, không màu nền.

**Section 4 — Hành trình 20 năm (timeline dọc):**
- Line: `1px solid --surface` dọc trái.
- Milestone: dot `8px circle` bg `--accent` + năm Inter 600 13px `--accent` + mô tả.
- Scroll vào: dot `scale 0→1`, line height grow từ trên, nội dung fade-in, stagger 200ms.

**Section 5 — 7 Cam Kết (không icon):**
```
─────────────────────────────────────────────────────────
01  Không hóa chất độc hại
02  Không chất bảo quản độc hại
03  Không gây kích ứng da
04  Không Paraben và dầu khoáng
05  Không hương liệu và chất tạo màu
06  Không cồn xấu
07  Không Sulfate (SLS/SLES)
─────────────────────────────────────────────────────────
```
- Số thứ tự: Inter 700 32px, `--accent` opacity 20% (trang trí thuần).
- Text: Inter 500 16px.
- Scroll vào stagger 60ms/dòng: `opacity 0→1` + `translateX(-12px→0)`, 400ms.
- Hover dòng: số `--accent` opacity `20%→60%`, 150ms.

---

### 6.13 Trang Sharing Is Caring

**Hero:**
```
Chia sẻ · Lan tỏa · Nhận quà.
```
Playfair 600 căn giữa. Tagline Lora italic bên dưới.

**Form (underline style):**
- Textarea: border-bottom only, min-height 120px, resize vertical.
- Upload ảnh: `border: 1.5px dashed --muted`, padding `20px`, text "Tải ảnh lên (không bắt buộc)". Hover: border-color `--text`, 200ms. Drag-over: bg `--surface`.

**Story cards (grid 3 cột):**
- Text only: quote + tên + tag + tháng.
- "Câu chuyện của tháng": border `1.5px solid --accent`. Label "Câu chuyện tháng [X]" Inter 11px uppercase `--accent`.

**Banner quà tháng:**
```
Câu chuyện của tháng nhận được
1 Xịt Dưỡng Vi Sinh Hoa Ngân 60ml
Hạn nộp: 31 / [tháng]
Gửi câu chuyện →
```
bg `--surface`, border-left `3px solid --accent`, padding `20px 24px`.

---

### 6.14 Chat Widget (Không icon, không bubble)

**Desktop — sticky bottom-right:**
```
┌──────────────────────────────┐
│  Tư vấn miễn phí          × │
│  Nhắn Zalo  ·  Messenger     │
└──────────────────────────────┘
```
- Xuất hiện sau 5s: `opacity 0→1` + `translateY(12px→0)`, 300ms.
- bg `--navy`, white, border-radius 4px, padding `16px 20px`.
- Link hover: underline đậm hơn, 120ms.
- Đóng: `opacity 1→0` + `scale 1→0.8`, 200ms.

**Mobile — fixed bottom bar:**
```
Tư vấn da miễn phí     [Zalo]  [Messenger]
```
Height 52px, bg `--navy`, white. Safe-area bottom padding.

---

### 6.15 Footer

```
┌──────────────────────────────────────────────────────────────┐
│  bg: #00347D · text: rgba(255,255,255,0.75)                   │
│                                                              │
│  ALMA DUNGDUONG                        Đại lý chính hãng    │
│  Mỹ phẩm Vi sinh Hoa Ngân             Hoa Ngân               │
│                                                              │
│  "Làn da khỏe không cần hoàn hảo,                           │
│   nhưng cần được yêu thương đúng cách."                      │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  Sản phẩm              Thông tin           Kết nối           │
│  Xịt dưỡng             Về chúng tôi        Instagram         │
│  Vi sinh               Blog                TikTok            │
│  Sữa rửa mặt           Liên hệ             Zalo              │
│  Kem chống nắng        Chính sách          Facebook          │
│  Dụng cụ làm đẹp       Đổi trả                               │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│  [email]  ·  [SĐT]  ·  Zalo: [SĐT]                         │
│  © 2025 Alma Dungduong · Website đã thông báo Bộ Công thương │
│  Thanh toán: COD · Chuyển khoản · MoMo · ZaloPay            │
└──────────────────────────────────────────────────────────────┘
```

**Typography:**
- "ALMA DUNGDUONG": Inter 700 18px letter-spacing 0.12em, white.
- Quote: Lora italic, `rgba(255,255,255,0.65)`.
- Column heading: Inter 500 12px uppercase letter-spacing 0.1em, white.
- Link: Inter 400 14px, `rgba(255,255,255,0.65)`. Hover: `→white` + underline, 150ms.

**Badge "Đại lý chính hãng Hoa Ngân":** bg white, color `--navy`, Inter 600 11px, padding `5px 12px`, border-radius 2px.

---

### 6.16 Dashboard Tài Khoản

```
Xin chào, Lan.

Đơn hàng    Địa chỉ    Yêu thích    ← tab text only

─────────────────────────────────────────────────────────
#DH00234  ·  15/06/2025  ·  570.000đ  ·  Đang giao
[Xem chi tiết]  [Theo dõi đơn]
─────────────────────────────────────────────────────────
```

Tab active: Inter 600, border-bottom `2px solid --text`.
Tab hover: border-bottom `2px solid --surface`, 150ms.


---


## 7. Animation & Interaction — Bảng Tổng Hợp

| Component | Trigger | Property | From → To | Duration | Easing |
|---|---|---|---|---|---|
| Announcement bar | Page load | height + opacity | 0→40px, 0→1 | 400ms | ease-out |
| Announcement bar | Đóng | height + opacity | 40px→0, 1→0 | 250ms | ease-in |
| Header bg | Scroll >60px | background + border | transparent→blur | 200ms | ease |
| Nav link | Hover | border-bottom width | 0→100% (L→R) | 200ms | ease |
| Dropdown | Hover | opacity + translateY | 0→1, -8px→0 | 200ms | ease-out |
| Dropdown | Mouse leave | opacity + translateY | 1→0, 0→-6px | 150ms | ease-in |
| Mobile drawer | Click MENU | translateX | 100%→0 | 320ms | cubic(.25,.46,.45,.94) |
| Drawer items | Drawer open | opacity + translateX | stagger 40ms | 300ms | ease-out |
| Hero heading | Page load | opacity + translateY | 0→1, 20px→0, stagger 100ms/dòng | 600ms | ease-out |
| Hero CTA | Page load | opacity | 0→1 delay 600ms | 400ms | ease-out |
| Hero product img | Page load | opacity + translateX | 0→1, 24px→0 delay 350ms | 700ms | ease-out |
| "Cuộn để khám phá" | Loop | translateY | 0→6px→0 | 2s ∞ | ease |
| Button solid | Hover | background | accent→#25573F | 180ms | ease |
| Button outline | Hover | background + color | transparent→navy | 200ms | ease |
| Text link "→" | Hover | translateX ký tự | 0→4px | 200ms | ease |
| Underline link | Hover | scaleX (underline) | 0→1 (L→R) | 200ms | ease |
| Section | Scroll vào | opacity + translateY | 0→1, 16px→0 | 500ms | ease-out |
| Product card | Hover | border-color | transparent→0.15 | 200ms | ease |
| Product card img | Hover | scale | 1→1.04 | 400ms | ease-out |
| "Thêm vào giỏ" | Card hover | opacity + translateY | 0→1, 8px→0 | 250ms | ease-out |
| Add to cart | Click | text + badge | swap/bounce | 150ms/300ms | ease/spring |
| Filter apply | Click | grid opacity/blur | 1→0.5, blur 2px | 150ms | ease-in |
| Filter done | Load | grid opacity | 0.5→1 stagger | 300ms | ease-out |
| Variant | Click | bg + color | bg→text | 150ms | ease |
| PDP sticky bar | Scroll | translateY | 100%→0 | 250ms | ease-out |
| Lightbox | Click ảnh | opacity + scale | 0→1, 0.85→1 | 250ms | ease-out |
| Thumbnail | Hover | opacity + border | 0.6→1 | 150ms | ease |
| Accordion | Click | grid-template-rows | 0fr→1fr | 300ms | ease-out |
| Accordion `+` | Click | rotate | 0→45deg | 250ms | ease |
| Checkout step | Next | opacity + translateX | 0→1, 20px→0 | 250ms | ease-out |
| Stepper line | Complete | width | 0→100% | 400ms | ease-out |
| Radio | Click | inner scale | 0→0.6 | 200ms | spring |
| Input | Focus | border-bottom | surface→accent | 150ms | ease |
| Input | Error | opacity + translateY | 0→1, -4px→0 | 200ms | ease |
| Cart drawer | Open | translateX + overlay | 100%→0 | 320ms | cubic |
| Cart item | Delete | opacity + height | 1→0, auto→0 | 300ms | ease-in |
| Before/After | Drag | position | smooth 60fps | — | linear |
| Timeline dot | Scroll | scale | 0→1 | 300ms | spring |
| Timeline line | Scroll | height | 0→100% | 600ms | ease-out |
| 7 cam kết | Scroll | opacity + translateX | stagger 60ms | 400ms | ease-out |
| Chat widget | Delay 5s | opacity + translateY | 0→1, 12px→0 | 300ms | ease-out |
| Skeleton | Loading | background-position | -200%→200% | 1.5s ∞ | linear |

**Quy tắc bắt buộc:**
- `will-change: transform, opacity` chỉ khi animation đang chạy, remove sau khi xong.
- Không dùng `transition: all` — chỉ specify đúng property.
- Scroll trigger: `IntersectionObserver` threshold `0.15`, rootMargin `0px 0px -40px 0px`.
- `@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }`

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile S | 320–374px | Font -10%, padding 12px, 1 cột |
| Mobile | 375–767px | 1–2 cột, bottom nav text-only, drawer |
| Tablet | 768–1023px | 2–3 cột, sidebar ẩn → bottom sheet |
| Desktop | 1024–1279px | 3 cột, sidebar hiện |
| Desktop L | 1280px+ | 4 cột, container max 1200px |

**Mobile-specific:**
- Bottom nav: `Trang chủ · Sản phẩm · Giỏ (n) · TK` — Inter 11px, border-top `1px solid --surface`. Text only.
- PDP: sticky bottom bar thay cho floating button.
- Chat: bottom bar cố định thay float.
- Gallery/carousel: swipe gesture.

---

## 9. Tech Stack

| Layer | Công nghệ | Ghi chú |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, SEO |
| Language | TypeScript | |
| Styling | Tailwind CSS + CSS Variables | Tokens trong `globals.css` |
| Animation complex | Framer Motion | Page transition, drawer, complex enter/exit |
| Animation đơn giản | CSS transitions + `@keyframes` | Hover, button, reveal |
| Scroll trigger | IntersectionObserver API | Không thêm thư viện |
| CMS | Payload CMS (self-host) | Sản phẩm, blog, order |
| E-commerce | Medusa.js hoặc custom API | Hỗ trợ COD |
| Payment | VNPay · MoMo · ZaloPay · COD | |
| Image | next/image | Auto optimize |
| Deploy | Vercel (free tier) | |
| DB | PostgreSQL — Supabase free | |
| Auth | NextAuth.js | OTP/SĐT |

---

## 10. SEO & Performance

- `<title>` + `meta description` riêng từng trang/sản phẩm
- Schema.org: `Product`, `Review`, `BreadcrumbList`, `Organization`
- `next/image` với `priority` cho LCP (hero, sản phẩm đầu)
- Font `display: swap` + `<link rel="preconnect">` Google Fonts
- Dynamic OG image mỗi sản phẩm
- `sitemap.xml` tự động
- Core Web Vitals: LCP <2.5s · CLS <0.1 · INP <200ms

---

## 11. Accessibility

- Contrast ≥ 4.5:1 (WCAG AA) — check `--muted` #8A8680 trên `--bg` #FAF8F5
- Focus ring: `outline: 2px solid var(--accent)`, `outline-offset: 3px`
- Không icon = text label rõ → tốt tự nhiên cho screen reader
- `aria-label` cho button có text ngắn mơ hồ
- Keyboard: Tab order logic, `Escape` đóng modal/drawer/dropdown
- `role="dialog"` + `aria-modal="true"` cho cart, lightbox

---

## 12. Dev Priority

| Sprint | Feature | Lý do |
|---|---|---|
| 1 | Design tokens + Button + Input + Card | Foundation |
| 1 | Header + Footer + Layout shell | Dùng mọi trang |
| 2 | Trang chủ (Hero + Trust + Products + 28-vấn-đề) | Traffic |
| 2 | PLP (listing + filter) | Core browse |
| 3 | PDP (gallery + info + tabs + tư vấn) | Core convert |
| 3 | Cart drawer + Checkout + COD | Monetization |
| 4 | Tài khoản + Tra cứu đơn | Retention |
| 4 | Kết quả khách hàng | Social proof |
| 5 | Về chúng tôi + Sharing Is Caring | Brand & community |
| 6 | Blog | SEO dài hạn |
