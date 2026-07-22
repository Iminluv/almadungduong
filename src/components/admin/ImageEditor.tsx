"use client";

import React, { useState, useEffect, useRef } from "react";
import { getImageUrl } from "@/lib/utils";
import { useImageUpload } from "@/lib/useImageUpload";

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

  // Upload hooks & refs
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isUploading: isUploadingFile } = useImageUpload();
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // Handle uploading main cover image from device
  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);

    const url = await uploadFile(file);
    if (url) {
      onMainImageChange(url);
    }
    if (mainFileInputRef.current) {
      mainFileInputRef.current.value = "";
    }
  };

  // Handle uploading gallery images from device (multiple, max 10)
  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setErrorMsg(null);

    // Limit check: total images cannot exceed 10
    if (images.length + files.length > 10) {
      setErrorMsg(`Tổng số ảnh thư viện không được vượt quá 10 ảnh. (Hiện tại: ${images.length}, Đã chọn: ${files.length})`);
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
      return;
    }

    setIsUploadingGallery(true);
    let successCount = 0;

    for (const file of files) {
      const url = await uploadFile(file);
      if (!url) continue;

      try {
        const res = await fetch(`/api/admin/products/${productId}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setImages((prev) => [...prev, data.image].sort((a, b) => a.sortOrder - b.sortOrder));
          successCount++;
        } else {
          setErrorMsg(data.error || `Lỗi lưu ảnh "${file.name}" vào thư viện`);
        }
      } catch (err: any) {
        console.error(err);
        setErrorMsg(`Lỗi kết nối khi lưu ảnh "${file.name}"`);
      }
    }

    setIsUploadingGallery(false);
    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
  };

  // Drag and drop states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Lightbox & Zoom states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const changeLightboxImage = (newIndex: number) => {
    setLightboxIndex(newIndex);
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 0.15;
    const direction = e.deltaY < 0 ? 1 : -1;
    setZoomLevel((prev) => Math.min(Math.max(prev + direction * zoomFactor, 0.5), 5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Sort and set initial images
  useEffect(() => {
    const sorted = [...initialImages].sort((a, b) => a.sortOrder - b.sortOrder);
    setImages(sorted);
  }, [initialImages]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Handle keyboard events in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
      } else if (e.key === "ArrowRight") {
        if (lightboxIndex < images.length - 1) {
          changeLightboxImage(lightboxIndex + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (lightboxIndex > 0) {
          changeLightboxImage(lightboxIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, images.length]);

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
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-[#8A8680]">URL Ảnh Đại Diện</label>
              <div className="flex items-center gap-2">
                <input
                  ref={mainFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  onChange={handleMainFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => mainFileInputRef.current?.click()}
                  disabled={isUploadingFile}
                  className="px-2.5 py-1 bg-[#1A4331] hover:bg-[#1A4331]/90 text-white text-[11px] font-bold rounded-[2px] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  {isUploadingFile ? "Đang tải..." : "Tải ảnh từ máy"}
                </button>
              </div>
            </div>

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
            <h3 className="font-semibold text-sm text-[#1C1C1A] flex items-center gap-2">
              Thư viện ảnh phụ
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[2px] ${images.length >= 10 ? "bg-amber-100 text-amber-800 font-bold" : "bg-[#FAF8F5] text-[#8A8680] border border-[#F0EDE8]"}`}>
                {images.length}/10 ảnh
              </span>
            </h3>
            <p className="text-[10px] text-[#8A8680] mt-0.5">Kéo thả để sắp xếp vị trí hiển thị</p>
          </div>
          {isSavingOrder && (
            <span className="text-[10px] text-[#1A4331] animate-pulse font-medium">
              Đang lưu thứ tự...
            </span>
          )}
          {isUploadingGallery && (
            <span className="text-[10px] text-[#1A4331] animate-pulse font-medium">
              Đang tải ảnh từ máy lên Cloudinary...
            </span>
          )}
        </div>

        {/* Action row: File upload + URL add */}
        <div className="space-y-2.5">
          {/* File picker button */}
          <input
            ref={galleryFileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            onChange={handleGalleryFilesChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => {
              if (images.length >= 10) {
                setErrorMsg("Thư viện đã đạt tối đa 10 ảnh. Vui lòng xóa bớt ảnh trước khi thêm mới.");
                return;
              }
              galleryFileInputRef.current?.click();
            }}
            disabled={isUploadingGallery || images.length >= 10}
            className="w-full py-2.5 bg-[#1A4331] hover:bg-[#1A4331]/90 text-white text-xs font-bold rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            {isUploadingGallery ? "Đang tải ảnh từ máy lên..." : "Tải ảnh từ máy (Tối đa 10 ảnh)"}
          </button>

          {/* URL Input sub-row */}
          <div className="flex items-center gap-2 min-w-0">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (images.length >= 10) {
                    setErrorMsg("Thư viện đã đạt tối đa 10 ảnh.");
                    return;
                  }
                  handleAddImage();
                }
              }}
              placeholder="Hoặc dán URL ảnh vào đây..."
              className="min-w-0 flex-1 text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
              disabled={isAdding || isUploadingGallery || images.length >= 10}
            />
            <button
              type="button"
              onClick={() => {
                if (images.length >= 10) {
                  setErrorMsg("Thư viện đã đạt tối đa 10 ảnh.");
                  return;
                }
                handleAddImage();
              }}
              disabled={isAdding || isUploadingGallery || !newImageUrl.trim() || images.length >= 10}
              className="shrink-0 px-3 py-2 bg-[#FAF8F5] border border-[#F0EDE8] hover:border-[#1A4331] text-[#1C1C1A] text-xs font-bold rounded-[2px] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? "Đang thêm..." : "Thêm URL"}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-[#F0EDE8] rounded-[2px] bg-[#FAF8F5]">
            <p className="text-xs text-[#8A8680]">Thư viện ảnh trống. Hãy dán URL để thêm ảnh đầu tiên.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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
                  className={`relative flex flex-col border rounded-[2px] overflow-hidden bg-white select-none transition-all duration-200 cursor-grab active:cursor-grabbing ${
                    isDragSource ? "opacity-30 border-dashed border-[#8A8680]" : "border-[#F0EDE8]"
                  } ${isDragTarget ? "border-[#1A4331] ring-2 ring-[#1A4331]/20 scale-95" : ""}`}
                >
                  {/* Image container */}
                  <div
                    onClick={() => changeLightboxImage(index)}
                    className="relative w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={getImageUrl(img.url)}
                      alt={`Gallery ${index + 1}`}
                      className="object-cover w-full h-full pointer-events-none transition-transform duration-300 hover:scale-105"
                    />

                    {/* Order indicator */}
                    <div className="absolute top-2 left-2 bg-[#1C1C1A]/70 text-white text-[10px] font-mono w-6 h-6 flex items-center justify-center rounded-full z-10 font-bold">
                      {index + 1}
                    </div>

                    {/* Subtle hover icon hint */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-white drop-shadow-sm">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                      </svg>
                    </div>

                    {deletingId === img.id && (
                      <div className="absolute inset-0 bg-[#FAF8F5]/80 flex items-center justify-center z-20">
                        <span className="text-[11px] text-[#8A8680] animate-pulse font-medium">Đang xóa...</span>
                      </div>
                    )}
                  </div>

                  {/* Action row (always visible) */}
                  <div className="flex border-t border-[#F0EDE8] bg-[#FAF8F5] text-xs divide-x divide-[#F0EDE8]">
                    <button
                      type="button"
                      onClick={() => changeLightboxImage(index)}
                      className="flex-1 py-2.5 text-center text-[#8A8680] hover:text-[#1C1C1A] hover:bg-[#F0EDE8]/30 transition-colors font-medium cursor-pointer"
                      title="Xem ảnh thực tế"
                    >
                      Xem ảnh
                    </button>
                    <button
                      type="button"
                      onClick={() => onMainImageChange(img.url)}
                      className={`flex-1 py-2.5 text-center transition-colors font-semibold cursor-pointer ${
                        mainImage === img.url
                          ? "text-[#1A4331] bg-[#1A4331]/5 font-bold"
                          : "text-[#8A8680] hover:text-[#1A4331] hover:bg-[#1A4331]/5"
                      }`}
                      title="Chọn làm ảnh đại diện chính"
                    >
                      {mainImage === img.url ? "★ Ảnh bìa" : "⭐ Bìa"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.id)}
                      disabled={deletingId === img.id}
                      className="px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer flex items-center justify-center"
                      title="Xóa hình ảnh"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between select-none"
          onClick={() => {
            setLightboxIndex(null);
            setZoomLevel(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          {/* Top Status & Control Bar */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full text-white text-xs font-mono backdrop-blur-md border border-white/10">
              <span>
                Ảnh {lightboxIndex + 1} / {images.length}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span>{Math.round(zoomLevel * 100)}%</span>
            </div>

            <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full text-white backdrop-blur-md border border-white/10">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 hover:text-[#1A4331] transition-colors cursor-pointer text-white/70 hover:text-white"
                title="Thu nhỏ"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                className="text-xs px-2 py-0.5 hover:bg-white/10 rounded transition-colors cursor-pointer font-medium text-white/70 hover:text-white"
                title="Vừa màn hình"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 hover:text-[#1A4331] transition-colors cursor-pointer text-white/70 hover:text-white"
                title="Phóng to"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setLightboxIndex(null);
                setZoomLevel(1);
                setPan({ x: 0, y: 0 });
              }}
              className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer border border-white/10"
              title="Đóng (Esc)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main View Area */}
          <div
            className="flex-1 flex items-center justify-center p-4 overflow-hidden relative cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <div
              className="transition-transform duration-75 ease-out select-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(images[lightboxIndex].url)}
                alt={`Gallery ${lightboxIndex + 1}`}
                className="max-w-[90vw] max-h-[80vh] object-contain pointer-events-none select-none animate-fade-in"
              />
            </div>
          </div>

          {/* Footer Navigation Area */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                if (lightboxIndex > 0) {
                  changeLightboxImage(lightboxIndex - 1);
                }
              }}
              disabled={lightboxIndex === 0}
              className="bg-black/50 hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors cursor-pointer border border-white/10"
              title="Ảnh trước (←)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                if (lightboxIndex < images.length - 1) {
                  changeLightboxImage(lightboxIndex + 1);
                }
              }}
              disabled={lightboxIndex === images.length - 1}
              className="bg-black/50 hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors cursor-pointer border border-white/10"
              title="Ảnh sau (→)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
