# Task Report: User Account Feature - Phase 5 & 6 (API Routes & Account Dashboard Integration)

**Date:** June 4, 2026  
**Status:** Completed  
**Objective:** Create API routes for credentials registration, profile retrieval, shipping address CRUD, and favorites wishlist. Rewrite the account page to provide login/register forms (with Google OAuth) and an integrated 5-tab member dashboard.

---

## 1. Executive Summary

This phase bridges database models and the user interface by implementing backend endpoints and a comprehensive account view:
1. **API Endpoints Created**:
   * `/api/auth/register` (POST): Securely hashes passwords with `bcryptjs` and defaults new users to the entry-level `LoyaltyTier`.
   * `/api/user/profile` (GET/PUT): Exposes user details (plus loyalty tier benefits) and allows profile/password updates.
   * `/api/user/addresses` (GET/POST/PUT/DELETE): Standard CRUD for shipping addresses with default-override validation.
   * `/api/user/favorites` (GET/POST/DELETE): Wishlist controller that queries/modifies favorites and returns joined `Product` data.
2. **Dashboard UI Rewrite**: Replaced the mock login/register UI in `src/app/tai-khoan/AccountView.tsx` with credentials authentication, Google OAuth login, and a premium 5-tab dashboard.
3. **Loyalty Tracking**: Added dynamic logic calculating relative months of membership, formatted accumulated spending, and rendered a progress bar tracking progress toward the next membership tier.
4. **Interactive Modals & Grid Layouts**: Integrated animated addresses CRUD forms (using Framer Motion) and an asynchronous wishlist rendering existing `ProductCard` components.

---

## 2. API Endpoints Reference

All endpoints query active NextAuth sessions via `auth()` to secure operations. If no session is active, they return `401 Chuyên gia / Chưa đăng nhập`.

| Path | Method | Request Payload | Response Success (200 / 201) |
|:---|:---|:---|:---|
| `/api/auth/register` | `POST` | `{ name, email, phone?, password }` | `{ message: string, user: { id, name, email } }` |
| `/api/user/profile` | `GET` | *None* | `{ user: { id, name, email, phone, image, totalSpent, loyaltyTier } }` |
| `/api/user/profile` | `PUT` | `{ name?, phone?, currentPassword?, newPassword? }` | `{ message: string, user: { id, name, email, phone } }` |
| `/api/user/addresses` | `GET` | *None* | `{ addresses: Address[] }` (Sorted by default status) |
| `/api/user/addresses` | `POST` | `{ label?, fullName, phone, street, ward?, district, city, isDefault }` | `{ message: string, address: Address }` |
| `/api/user/addresses` | `PUT` | `{ id, label?, fullName?, phone?, street?, ward?, district?, city?, isDefault? }` | `{ message: string, address: Address }` |
| `/api/user/addresses` | `DELETE` | *Query string:* `?id=uuid` | `{ message: string }` |
| `/api/user/favorites` | `GET` | *None* | `{ favorites: Favorite[] }` (Includes product relation) |
| `/api/user/favorites` | `POST` | `{ productId }` | `{ message: string, favorite: Favorite }` |
| `/api/user/favorites` | `DELETE` | `{ productId }` or `?productId=uuid` | `{ message: string }` |

---

## 3. Account Dashboard UI Details

The rewritten **[AccountView.tsx](file:///Users/iminluv/Documents/GitHub/almadungduong/src/app/tai-khoan/AccountView.tsx)** features:

* **Logged-Out Screen**:
  * Clean toggle tabs between "Đăng nhập" and "Đăng ký" utilizing minimalist inputs.
  * Direct OAuth integration via the **Đăng nhập bằng Google** button.
  * Autologin upon successful credentials registration.
* **Logged-In Member Dashboard Tabs**:
  1. **Tổng quan (Overview)**: Displays the active loyalty tier (with custom colors matching `uom-mam`, `dung-duong`, and `no-ro`), accumulated spending, and a progress bar with custom milestone calculations.
  2. **Đơn hàng (Orders)**: Displays a log of recent transactions with a note notifying users that online order tracking is under development.
  3. **Địa chỉ (Addresses)**: Renders a card deck of saved addresses. Includes a sliding Address Form Modal to add/edit addresses and set defaults.
  4. **Yêu thích (Favorites)**: Fetches and displays favorited items in a responsive grid. Uses product cards matching the store catalog.
  5. **Hồ sơ (Profile)**: Edit personal parameters (name, phone) and password changes. Google-authenticated users receive an inline safety badge.

---

## 4. Verification

1. **Production Compilation**:
   ```bash
   npm run build
   ```
   *Result:* Compiled successfully in 1437ms. Zero TypeScript errors across all routes and views.

---

## 5. Next Steps

The next phase is **Phase 7 & 8: Header Update & Checkout Auto-Fill**. We will:
1. Update `src/components/layout/Header.tsx` to read the active NextAuth session and display the user's name/avatar.
2. Update the checkout form at `src/app/thanh-toan/page.tsx` to pre-populate information and default addresses for logged-in members.
