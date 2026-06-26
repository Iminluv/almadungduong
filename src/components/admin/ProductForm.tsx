"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: CategoryOption[];
  initialData?: {
    id: string;
    title: string;
    englishName?: string | null;
    categoryId: string;
    price: number;
    originalPrice?: number | null;
    volume?: string | null;
    description: string;
    fullDescription?: string | null;
    ingredients?: string | null;
    certifications?: string | null;
    usage?: string | null;
    tagline?: string | null;
    gift?: string | null;
    image: string;
    sortOrder: number;
    showOnHomepage: boolean;
    isPublished: boolean;
    tags?: { name: string }[];
    images?: { url: string }[];
  };
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [englishName, setEnglishName] = useState(initialData?.englishName || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || "");
  const [price, setPrice] = useState(initialData?.price !== undefined ? initialData.price.toString() : "");
  const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice?.toString() || "");
  const [volume, setVolume] = useState(initialData?.volume || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [gift, setGift] = useState(initialData?.gift || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder !== undefined ? initialData.sortOrder.toString() : "0");
  const [showOnHomepage, setShowOnHomepage] = useState(initialData?.showOnHomepage || false);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished !== undefined ? initialData.isPublished : true);

  const [description, setDescription] = useState(initialData?.description || "");
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || "");
  const [ingredients, setIngredients] = useState(initialData?.ingredients || "");
  const [certifications, setCertifications] = useState(initialData?.certifications || "");
  const [usage, setUsage] = useState(initialData?.usage || "");

  // Tag comma list
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags ? initialData.tags.map((t) => t.name).join(", ") : ""
  );

  // Gallery inputs (up to 4)
  const initialGallery = initialData?.images ? initialData.images.map((img) => img.url) : [];
  const [gallery1, setGallery1] = useState(initialGallery[0] || "");
  const [gallery2, setGallery2] = useState(initialGallery[1] || "");
  const [gallery3, setGallery3] = useState(initialGallery[2] || "");
  const [gallery4, setGallery4] = useState(initialGallery[3] || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !categoryId || !price || !image || !description) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    setIsLoading(true);

    // Format tags & gallery array
    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedGallery = [gallery1, gallery2, gallery3, gallery4]
      .map((url) => url.trim())
      .filter(Boolean);

    const payload = {
      title,
      englishName: englishName.trim() || null,
      categoryId,
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : null,
      volume: volume.trim() || null,
      description: description.trim(),
      fullDescription: fullDescription.trim() || null,
      ingredients: ingredients.trim() || null,
      certifications: certifications.trim() || null,
      usage: usage.trim() || null,
      tagline: tagline.trim() || null,
      gift: gift.trim() || null,
      image: image.trim(),
      images: parsedGallery,
      tags: parsedTags,
      sortOrder: parseInt(sortOrder, 10) || 0,
      showOnHomepage,
      isPublished,
    };

    try {
      const url = isEditMode ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(isEditMode ? "Đã cập nhật sản phẩm thành công!" : "Đã tạo sản phẩm mới thành công!");
        router.push("/admin/products");
        router.refresh();
      } else {
        alert(data.error || "Thao tác lưu sản phẩm thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ khi lưu sản phẩm.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main form column (span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Base attributes block */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-2 border-b border-[#F0EDE8]">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Nước dưỡng vi sinh Hoa Ngân"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Tên tiếng Anh (hoặc phụ)</label>
                <input
                  type="text"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  placeholder="Ví dụ: Hoa Ngan Microbiome Toner"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Dung tích / Kích thước</label>
                <input
                  type="text"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Ví dụ: 100ml"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">
                  Giá bán (VND) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ví dụ: 350000"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Giá gốc / Giá cũ (VND)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Ví dụ: 420000"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">
                  Danh mục sản phẩm <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] cursor-pointer"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Mã thứ tự sắp xếp</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] font-mono"
                />
              </div>
            </div>
          </div>

          {/* Description blocks */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-2 border-b border-[#F0EDE8]">
              Mô tả chi tiết sản phẩm
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">
                  Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Mô tả tóm tắt tính năng sản phẩm..."
                  className="w-full text-xs bg-white border border-[#F0EDE8] p-3 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] resize-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Mô tả đầy đủ</label>
                <textarea
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  rows={5}
                  placeholder="Mô tả chi tiết về cách hoạt động, công dụng..."
                  className="w-full text-xs bg-white border border-[#F0EDE8] p-3 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Thành phần</label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  rows={3}
                  placeholder="Danh sách các thành phần dưỡng chất..."
                  className="w-full text-xs bg-white border border-[#F0EDE8] p-3 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Chứng nhận chất lượng</label>
                <textarea
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  rows={2}
                  placeholder="Chứng nhận kiểm nghiệm hữu cơ, vi sinh..."
                  className="w-full text-xs bg-white border border-[#F0EDE8] p-3 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">Hướng dẫn sử dụng</label>
                <textarea
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                  rows={3}
                  placeholder="Hướng dẫn thoa dưỡng, massage..."
                  className="w-full text-xs bg-white border border-[#F0EDE8] p-3 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column sidebar form (span 1) */}
        <div className="space-y-6">
          {/* Images block */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-2 border-b border-[#F0EDE8]">
              Hình ảnh sản phẩm (URL)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#1C1C1A]">
                  Ảnh đại diện chính <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="URL ảnh Unsplash/Cloudinary..."
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331]"
                  required
                />
                {image && (
                  <div className="mt-2 w-20 h-20 border border-[#F0EDE8] rounded-[2px] overflow-hidden bg-[#FAF8F5]">
                    <img src={image} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#F0EDE8] space-y-2">
                <label className="font-semibold text-[#1C1C1A]">Thư viện ảnh phụ (tối đa 4)</label>
                <input
                  type="text"
                  value={gallery1}
                  onChange={(e) => setGallery1(e.target.value)}
                  placeholder="URL thư viện ảnh 1"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-1.5 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
                <input
                  type="text"
                  value={gallery2}
                  onChange={(e) => setGallery2(e.target.value)}
                  placeholder="URL thư viện ảnh 2"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-1.5 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
                <input
                  type="text"
                  value={gallery3}
                  onChange={(e) => setGallery3(e.target.value)}
                  placeholder="URL thư viện ảnh 3"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-1.5 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
                <input
                  type="text"
                  value={gallery4}
                  onChange={(e) => setGallery4(e.target.value)}
                  placeholder="URL thư viện ảnh 4"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-1.5 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Marketing & Tags block */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-2 border-b border-[#F0EDE8]">
              Nhãn & Tiếp thị
            </h3>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#1C1C1A]">Dòng mô tả tiếp thị (Tagline)</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Ví dụ: Nuôi dưỡng làn da căng mọng"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1C1C1A]">Ghi chú quà tặng (Gift note)</label>
                <input
                  type="text"
                  value={gift}
                  onChange={(e) => setGift(e.target.value)}
                  placeholder="Ví dụ: Tặng kèm bông tẩy trang"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1C1C1A]">Các nhãn (Tags - Phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Ví dụ: Deal tháng, Bán chạy nhất"
                  className="w-full bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none"
                />
                <span className="text-[10px] text-[#8A8680] block leading-relaxed mt-1">
                  Nhãn hiện có: Deal tháng, Bán chạy nhất, Deal tốt nhất, Được yêu thích
                </span>
              </div>
            </div>
          </div>

          {/* Visibility states block */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-2 border-b border-[#F0EDE8]">
              Hiển thị & Bán hàng
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#1C1C1A] block">Hiển thị trên Trang chủ</span>
                  <span className="text-[10px] text-[#8A8680]">Ghim sản phẩm nổi bật</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOnHomepage(!showOnHomepage)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    showOnHomepage ? "bg-[#1A4331]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                      showOnHomepage ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#1C1C1A] block">Kích hoạt bán (Published)</span>
                  <span className="text-[10px] text-[#8A8680]">Cho phép khách hàng xem và mua</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isPublished ? "bg-[#1A4331]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                      isPublished ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions block */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/products"
              className="px-4 py-2 border border-[#F0EDE8] hover:bg-[#FAF8F5] text-xs font-bold text-[#1C1C1A] rounded-[2px] transition-colors uppercase tracking-wider text-center"
            >
              Hủy
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-xs font-bold text-white rounded-[2px] border transition-colors uppercase tracking-wider cursor-pointer ${
                isLoading
                  ? "bg-[#1A4331]/70 border-[#1A4331] cursor-wait"
                  : "bg-[#1A4331] border-[#1A4331] hover:bg-[#1A4331]/90"
              }`}
            >
              {isLoading ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
