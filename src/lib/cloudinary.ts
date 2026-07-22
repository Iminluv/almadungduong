import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Extract Cloudinary public_id from a full secure URL or path.
 * e.g. "https://res.cloudinary.com/dxb8eoyf3/image/upload/v1720000000/almadungduong/products/my_photo.jpg"
 * returns "almadungduong/products/my_photo"
 */
export function extractPublicId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("res.cloudinary.com")) return null;

  try {
    // URL pattern: .../upload/(v\d+/)?(path/to/public_id).(jpg|png|webp|...)
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    let path = url.substring(uploadIndex + "/upload/".length);

    // Strip optional version prefix e.g. "v1712345678/"
    if (/^v\d+\//.test(path)) {
      path = path.replace(/^v\d+\//, "");
    }

    // Remove file extension
    const lastDotIndex = path.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      path = path.substring(0, lastDotIndex);
    }

    return path || null;
  } catch (error) {
    console.error("Error extracting Cloudinary public_id:", error);
    return null;
  }
}

/**
 * Deletes an image from Cloudinary given its URL or public_id.
 * Safe to call even if the URL is not a Cloudinary image (will just return false).
 */
export async function deleteCloudinaryImage(urlOrPublicId: string): Promise<boolean> {
  try {
    const publicId = urlOrPublicId.includes("http")
      ? extractPublicId(urlOrPublicId)
      : urlOrPublicId;

    if (!publicId) {
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Failed to delete Cloudinary image:", error);
    return false;
  }
}
