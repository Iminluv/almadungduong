# ADR-004: Direct Local Device Image Upload to Cloudinary & Automated Lifecycle Cleanup

## Status
Accepted

## Date
2026-07-22

## Context
Previously, store administrators had to manually upload product images to third-party image hosts or CDNs, copy the public URL, and paste it into text input fields within the admin dashboard. This workflow was error-prone, friction-heavy, and provided no validation or automatic cleanup.

Key requirements:
1. Allow admins to select and upload single cover photos or up to 10 gallery photos directly from local devices.
2. Upload image assets securely to Cloudinary and store returned URLs in the database.
3. Automatically delete Cloudinary image assets whenever an image record is deleted from the product gallery.
4. Maintain full backward compatibility with manual URL paste inputs.
5. Enforce a strict max limit of 10 gallery photos per product and 5MB max file size per image.

## Decision

1. **Server-Side Streaming Upload Route (`POST /api/admin/upload`)**:
   - Implemented a Next.js App Router API route handling `multipart/form-data`.
   - Uses `cloudinary.v2.uploader.upload_stream` to stream image buffers directly to Cloudinary folder `almadungduong/products/`.
   - Protects route with admin authorization check (`session.user.role === "admin"`).
   - Validates file MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/avif`) and file sizes (≤ 5MB).

2. **Automated Asset Cleanup on Deletion**:
   - Created `src/lib/cloudinary.ts` providing `extractPublicId(url)` and `deleteCloudinaryImage(url)`.
   - When deleting product gallery image records via `DELETE /api/admin/products/[id]/images/[imageId]`, the server invokes `deleteCloudinaryImage()` to destroy the corresponding Cloudinary asset, preventing orphaned files on Cloudinary.

3. **React Upload Hook & Component UX**:
   - Built reusable client hook `useImageUpload()` in `src/lib/useImageUpload.ts`.
   - Updated `ProductForm.tsx` (create mode) and `ImageEditor.tsx` (edit mode) with **"Tải ảnh từ máy"** file picker buttons.
   - Enforced stacked flex layout (`space-y-2.5` + `min-w-0`) in `ImageEditor.tsx` to ensure action controls fit inside narrow sidebar grid columns without horizontal layout overflow.

4. **Environment Configuration**:
   - `CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: `dxb8eoyf3`
   - `CLOUDINARY_API_KEY`: Cloudinary API Key
   - `CLOUDINARY_API_SECRET`: Cloudinary API Secret

## Alternatives Considered

### 1. Client-Side Unsigned Cloudinary Upload Presets
- **Pros:** Bypasses Next.js server route entirely.
- **Cons:** Exposes upload preset names; enables untrusted clients to upload arbitrary files to Cloudinary; cannot enforce server-side admin role checks.
- **Rejected:** Server-side upload streaming keeps API keys and upload authorization secure.

### 2. AWS S3 / Vercel Blob
- **Pros:** Native cloud object storage.
- **Cons:** Cloudinary was already integrated across the codebase and configured with existing asset paths.
- **Rejected:** Cloudinary provides built-in image optimization and transformations at zero additional migration cost.

## Consequences
- **Security:** Cloudinary API secret remains server-side only.
- **Data Hygiene:** Deleting gallery photos purges the file from both PostgreSQL and Cloudinary.
- **User Experience:** Admins can upload up to 10 photos simultaneously from local devices with instant feedback, while URL paste remains supported.
