"use client";

import React, { useState, useEffect } from "react";
import { getImageUrl } from "@/lib/utils";

interface ProductImage {
  id: string;
  url: string;
  sortOrder: number;
}

interface ImageEditorProps {
  productId: string;
  initialImages: ProductImage[];
  mainImage: string;
  onMainImageChange: (url: string) => void;
}

export default function ImageEditor({
  productId,
  initialImages,
  mainImage,
  onMainImageChange,
}: ImageEditorProps) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Drag and drop states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Sort and set initial images
  useEffect(() => {
    const sorted = [...initialImages].sort((a, b) => a.sortOrder - b.sortOrder);
    setImages(sorted);
  }, [initialImages]);

  // Handle adding new image
  const handleAddImage = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!newImageUrl.trim()) return;

    setIsAdding(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/admin/products/${productId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newImageUrl.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setImages((prev) => [...prev, data.image].sort((a, b) => a.sortOrder - b.sortOrder));
        setNewImageUrl("");
      } else {
        throw new Error(data.error || "Không thể thêm hình ảnh.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi hệ thống khi thêm hình ảnh.");
    } finally {
      setIsAdding(false);
    }
  };

  // Handle deleting image
  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa hình ảnh này khỏi thư viện?")) return;

    setDeletingId(imageId);
    setErrorMsg(null);

    // Optimistically update local UI
    const originalImages = [...images];
    setImages((prev) => prev.filter((img) => img.id !== imageId));

    try {
      const res = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Không thể xóa hình ảnh.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi hệ thống khi xóa hình ảnh.");
      // Rollback
      setImages(originalImages);
    } finally {
      setDeletingId(null);
    }
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDragOverIndex(null);
      return;
    }

    const newImages = [...images];
    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedItem);

    // Re-map sortOrder sequentially
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      sortOrder: idx,
    }));

    setImages(updatedImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsSavingOrder(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/admin/products/${productId}/images`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: updatedImages.map((img) => ({ id: img.id, sortOrder: img.sortOrder })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Không thể sắp xếp lại hình ảnh.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Lỗi lưu vị trí. Đang hoàn tác...");
      // Rollback to original order
      const sortedOriginal = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
      setImages(sortedOriginal);
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error message banner */}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[2px] flex items-center justify-between">
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-red-400 hover:text-red-600 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Cover Image Editor */}
      <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#F0EDE8]">
          <h3 className="font-semibold text-sm text-[#1C1C1A]">Ảnh đại diện chính</h3>
          <span className="text-[10px] uppercase font-bold text-[#1A4331] bg-[#1A4331]/10 px-2 py-0.5 rounded-[2px]">
            Ảnh Bìa
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-full sm:w-32 h-32 border border-[#F0EDE8] rounded-[2px] overflow-hidden bg-[#FAF8F5] flex-shrink-0 flex items-center justify-center relative group">
            {mainImage ? (
              <img
                src={getImageUrl(mainImage)}
                alt="Main product"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="text-xs text-[#8A8680] text-center px-2">Chưa chọn ảnh chính</span>
            )}
          </div>
          <div className="flex-1 w-full space-y-2">
            <label className="text-[11px] font-semibold text-[#8A8680]">URL Ảnh Đại Diện</label>
            <input
              type="text"
              value={mainImage}
              onChange={(e) => onMainImageChange(e.target.value)}
              placeholder="Nhập URL ảnh chính (Unsplash, Cloudinary...)"
              className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
            />
            <p className="text-[10px] text-[#8A8680] leading-relaxed">
              * Ảnh này sẽ hiển thị ở trang danh sách sản phẩm và là ảnh chính trong trang chi tiết.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Images List */}
      <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#F0EDE8]">
          <div>
            <h3 className="font-semibold text-sm text-[#1C1C1A]">Thư viện ảnh phụ</h3>
            <p className="text-[10px] text-[#8A8680] mt-0.5">Kéo thả để sắp xếp vị trí hiển thị</p>
          </div>
          {isSavingOrder && (
            <span className="text-[10px] text-[#1A4331] animate-pulse font-medium">
              Đang lưu thứ tự...
            </span>
          )}
        </div>

        {/* Input to add image */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddImage();
              }
            }}
            placeholder="Dán URL hình ảnh mới vào đây..."
            className="flex-1 text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
            disabled={isAdding}
          />
          <button
            type="button"
            onClick={() => handleAddImage()}
            disabled={isAdding || !newImageUrl.trim()}
            className="px-4 py-2 bg-[#1A4331] hover:bg-[#1A4331]/90 text-white text-xs font-bold rounded-[2px] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Đang thêm..." : "Thêm ảnh"}
          </button>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-[#F0EDE8] rounded-[2px] bg-[#FAF8F5]">
            <p className="text-xs text-[#8A8680]">Thư viện ảnh trống. Hãy dán URL để thêm ảnh đầu tiên.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {images.map((img, index) => {
              const isDragSource = draggedIndex === index;
              const isDragTarget = dragOverIndex === index;

              return (
                <div
                  key={img.id}
                  draggable={!isSavingOrder && deletingId === null}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragLeave={() => setDragOverIndex(null)}
                  className={`relative aspect-square border rounded-[2px] overflow-hidden bg-[#FAF8F5] group select-none transition-all duration-200 cursor-grab active:cursor-grabbing ${
                    isDragSource ? "opacity-30 border-dashed border-[#8A8680]" : "border-[#F0EDE8]"
                  } ${isDragTarget ? "border-[#1A4331] ring-2 ring-[#1A4331]/20 scale-95" : ""}`}
                >
                  <img
                    src={getImageUrl(img.url)}
                    alt={`Gallery ${index + 1}`}
                    className="object-cover w-full h-full pointer-events-none"
                  />

                  {/* Order indicator */}
                  <div className="absolute top-2 left-2 bg-[#1C1C1A]/70 text-white text-[9px] font-mono w-5 h-5 flex items-center justify-center rounded-full">
                    {index + 1}
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-[#1C1C1A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        disabled={deletingId === img.id}
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-[2px] transition-colors cursor-pointer"
                        title="Xóa hình ảnh"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0/0/24/24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => onMainImageChange(img.url)}
                        className="w-full bg-[#1A4331] hover:bg-[#1A4331]/90 text-white py-1 px-1.5 rounded-[2px] text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span className="text-xs">⭐</span> Chọn làm ảnh bìa
                      </button>
                    </div>
                  </div>

                  {deletingId === img.id && (
                    <div className="absolute inset-0 bg-[#FAF8F5]/80 flex items-center justify-center">
                      <span className="text-[10px] text-[#8A8680] animate-pulse">Đang xóa...</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
