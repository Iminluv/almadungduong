import { useState, useCallback } from "react";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

interface UseImageUploadReturn {
  uploadFile: (file: File) => Promise<string | null>;
  isUploading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    setError(null);

    // Validate type client-side
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Định dạng file không hợp lệ. Chỉ chấp nhận JPG, PNG, WEBP, GIF, AVIF");
      return null;
    }

    // Validate size client-side
    if (file.size > MAX_FILE_SIZE) {
      setError(`Ảnh "${file.name}" vượt quá dung lượng cho phép (tối đa 5MB)`);
      return null;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Tải ảnh lên máy chủ thất bại");
      }

      return data.url as string;
    } catch (err: any) {
      console.error("Image upload error:", err);
      setError(err.message || "Lỗi mạng khi tải ảnh lên");
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    uploadFile,
    isUploading,
    error,
    setError,
  };
}
