"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/lib/data";
import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("mô tả");

  if (!product) return notFound();

  // Mock thumbnails if not present
  const images = product.images || [product.image, product.image, product.image];

  const formatPrice = (p: number) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <main className="min-h-screen bg-bg pt-20 pb-20">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="text-[12px] uppercase tracking-widest text-muted flex gap-2 mb-8">
          <a href="/" className="hover:text-text transition-colors">Trang chủ</a>
          <span>/</span>
          <a href="/san-pham" className="hover:text-text transition-colors">Sản phẩm</a>
          <span>/</span>
          <span className="text-text">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-surface overflow-hidden rounded-sm group cursor-zoom-in">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[activeImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 aspect-square bg-surface rounded-sm overflow-hidden border-b-2 transition-all ${
                    activeImage === idx ? "border-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.title} ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-display font-semibold leading-tight">{product.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex text-text text-sm">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} · {product.reviewsCount} đánh giá · <span className="text-accent">Còn hàng</span>
                </span>
              </div>
            </div>

            <div className="h-px bg-surface w-full" />

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Dung tích</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-2.5 text-sm font-medium border transition-all rounded-sm ${
                        selectedVariant === v 
                          ? "bg-text text-bg border-text" 
                          : "bg-bg text-text border-surface hover:border-text/40"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Inventory Perks */}
            <div className="space-y-6">
              <div className="flex items-center gap-8">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Số lượng</p>
                  <div className="flex items-center border border-surface rounded-sm w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-surface transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-surface transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                   <div className="flex items-baseline gap-3">
                      <p className="text-3xl font-bold text-text">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-lg text-muted line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                   </div>
                   {product.originalPrice && (
                     <p className="text-xs font-bold text-accent uppercase tracking-wider">Tiết kiệm {Math.round((1 - product.price/product.originalPrice)*100)}%</p>
                   )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => addItem({ id: product.id, title: product.title, price: product.price, image: product.image, variant: selectedVariant }, quantity)}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                >
                  Mua ngay / COD
                </Button>
              </div>

            </div>

            <div className="h-px bg-surface w-full" />

            {/* Trust Badges */}
            <div className="space-y-4">
               <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-5 text-accent text-center">✓</span>
                    <p className="text-text">FREE SHIP đơn từ 1.000.000đ</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-5 text-accent text-center">✓</span>
                    <p className="text-text">Đồng hành 1:1 miễn phí đến khi da đẹp</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-5 text-accent text-center">✓</span>
                    <p className="text-text">Đổi trả trong 7 ngày nếu không hiệu quả</p>
                  </div>
               </div>
               
               <div className="pt-4 flex gap-4">
                  <div className="bg-navy text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm">
                    Chứng nhận EWG
                  </div>
                  <div className="bg-navy text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-sm">
                    FDA Approved
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
          <div className="flex border-b border-surface overflow-x-auto scrollbar-hide">
            {["mô tả", "thành phần", "hướng dẫn dùng", `đánh giá (${product.reviewsCount})`].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-8 text-sm font-semibold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab ? "border-text text-text" : "border-transparent text-muted hover:text-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="py-12 max-w-4xl">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.2 }}
                 className="text-text/80 leading-relaxed space-y-6"
               >
                 {activeTab === "mô tả" && (
                   <div className="space-y-6">
                     <p className="text-lg font-serif italic text-text">Sản phẩm mỹ phẩm vi sinh tiên phong giúp cân bằng hệ vi sinh trên da, phục hồi hàng rào bảo vệ tự nhiên.</p>
                     <p>{product.description}</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                        <div className="bg-surface p-8 rounded-sm">
                           <h4 className="font-display font-bold text-xl mb-4">Công dụng chính</h4>
                           <ul className="space-y-3 list-disc pl-5 text-sm">
                              <li>Phục hồi da nhạy cảm, kích ứng</li>
                              <li>Cân bằng độ ẩm và dầu trên da</li>
                              <li>Tăng cường lợi khuẩn, ức chế hại khuẩn</li>
                              <li>Làm sáng da tự nhiên từ sâu bên trong</li>
                           </ul>
                        </div>
                        <div className="bg-accent/5 p-8 rounded-sm border border-accent/10">
                           <h4 className="font-display font-bold text-xl mb-4 text-accent">Loại da phù hợp</h4>
                           <p className="text-sm">Phù hợp cho mọi loại da, đặc biệt là da đang gặp vấn đề về mụn, nhạy cảm hoặc bị tổn thương do lạm dụng hóa chất.</p>
                        </div>
                     </div>
                   </div>
                 )}
                 {activeTab === "thành phần" && (
                   <div className="space-y-6">
                     <p className="font-medium text-text">Bảng thành phần tối giản, 100% minh bạch:</p>
                     <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-surface">
                            <td className="py-3 font-semibold w-1/3">Peptide Vi sinh</td>
                            <td className="py-3">Hoạt chất độc quyền giúp tái cấu trúc hệ vi sinh.</td>
                          </tr>
                          <tr className="border-b border-surface">
                            <td className="py-3 font-semibold">Chiết xuất Hoa Ngân</td>
                            <td className="py-3">Kháng viêm mạnh mẽ, làm dịu da tức thì.</td>
                          </tr>
                          <tr className="border-b border-surface">
                            <td className="py-3 font-semibold">Hyaluronic Acid</td>
                            <td className="py-3">Cấp ẩm sâu đa tầng.</td>
                          </tr>
                        </tbody>
                     </table>
                     <p className="text-xs text-muted italic">Cam kết không cồn, không paraben, không hương liệu tổng hợp.</p>
                   </div>
                 )}
               </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
