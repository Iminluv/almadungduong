import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dxb8eoyf3";
  const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPath}`;
}
