"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/Button";
import { ReviewCard } from "@/components/products/ReviewCard";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";

interface Props {
  product: Product;
}

export default function ProductDetailView({ product }: Props) {
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("mô tả");

  if (!product) return notFound();

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

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
                  className={`relative w-20 aspect-square bg-surface rounded-sm overflow-hidden border-b-2 transition-all ${activeImage === idx ? "border-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100"
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
              {product.flag && (
                <div className="inline-block bg-accent text-white text-[10px] uppercase font-bold px-3 py-1 rounded-sm mb-2">
                  {product.flag}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-display font-semibold leading-tight text-text">
                {product.title}
              </h1>
              {product.englishName && (
                <h2 className="text-sm md:text-base text-muted font-light tracking-wide">
                  {product.englishName}
                </h2>
              )}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex text-accent text-sm">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} · {product.reviewsCount} đánh giá · <span className="text-accent font-medium">Còn hàng</span>
                </span>
              </div>
            </div>

            <div className="h-px bg-surface w-full" />

            {/* Volume indicator */}
            {product.volume && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Dung tích / Trọng lượng</p>
                <div className="inline-block px-4 py-2 border border-surface rounded-sm text-sm font-medium">
                  {product.volume}
                </div>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Dung tích</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-2.5 text-sm font-medium border transition-all rounded-sm ${selectedVariant === v
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
              <div className="flex items-center gap-8 pt-4">
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
                    <p className="text-xs font-bold text-accent uppercase tracking-wider">Tiết kiệm {Math.round((1 - product.price / product.originalPrice) * 100)}%</p>
                  )}
                </div>
              </div>

              {product.gift && (
                <div className="bg-accent/5 border border-accent/20 p-4 rounded-sm mt-4">
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">🎁 Quà tặng & Ưu đãi</p>
                  <p className="text-sm text-text/90 whitespace-pre-line leading-relaxed">{product.gift}</p>
                </div>
              )}

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
                  <p className="text-text">Tặng mặt nạ ủ nilon cho mọi đợn Xịt dưỡng</p>
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
            {["mô tả", "thành phần", "hướng dẫn dùng", "giấy kiểm nghiệm", `đánh giá (${product.reviews?.length || 0})`].map((tab) => {
              // Hide tabs if data is missing
              if (tab === "thành phần" && !product.ingredients) return null;
              if (tab === "giấy kiểm nghiệm" && !product.certifications) return null;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-8 text-sm font-semibold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${activeTab === tab || (tab.includes("đánh giá") && activeTab.includes("đánh giá"))
                    ? "border-text text-text"
                    : "border-transparent text-muted hover:text-text"
                    }`}
                >
                  {tab}
                </button>
              );
            })}
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
                    {product.fullDescription ? (
                      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-text/80">
                        {product.fullDescription.split('\n').map((paragraph, idx) => (
                          paragraph.trim() ? <p key={idx} className="mb-4">{paragraph}</p> : <br key={idx} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-text/80">{product.description}</p>
                    )}
                  </div>
                )}
                {activeTab === "thành phần" && product.ingredients && (
                  <div className="space-y-6">
                    <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-text/80">
                      {product.ingredients.split('\n').map((item, idx) => (
                        item.trim() ? <div key={idx} className="py-2 border-b border-surface last:border-0">{item}</div> : null
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "hướng dẫn dùng" && (
                  <div className="space-y-6">
                    {product.usage ? (
                      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-text/80">
                        {product.usage.split('\n').map((paragraph, idx) => (
                          paragraph.trim() ? <p key={idx} className="mb-4">{paragraph}</p> : <br key={idx} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-text/80 italic">Liên hệ tư vấn viên để nhận hướng dẫn chi tiết về sản phẩm này.</p>
                    )}
                  </div>
                )}
                {activeTab === "giấy kiểm nghiệm" && product.certifications && (
                  <div className="space-y-6 bg-surface p-8 rounded-sm">
                    <h4 className="font-display font-medium text-xl mb-4 text-text">Tiêu chuẩn an toàn vượt trội</h4>
                    <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-text/80">
                      {product.certifications.split('\n').map((item, idx) => (
                        item.trim() ? (
                          <div key={idx} className="flex items-start gap-3 mb-3">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </div>
                        ) : null
                      ))}
                    </div>
                  </div>
                )}
                {activeTab.includes("đánh giá") && (
                  <div className="space-y-12">
                    {/* Reviews List */}
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-2xl mb-8">Phản hồi khách hàng ({product.reviews?.length || 0})</h3>
                      <div className="divide-y divide-surface">
                        {(product.reviews || []).map((rev) => (
                          <ReviewCard key={rev.id} review={rev} />
                        ))}
                      </div>
                    </div>
                    {/* Login Requirement for Submission */}
                    <div className="bg-surface/50 p-6 md:p-10 rounded-sm border border-surface text-center space-y-4">
                      <h4 className="font-display font-medium text-xl text-text">Dành cho cộng đồng Alma</h4>
                      <p className="text-muted text-sm max-w-sm mx-auto">Chia sẻ trải nghiệm của bạn để giúp chúng tôi hoàn thiện hơn và giúp những khách hàng khác tìm được giải pháp phù hợp.</p>
                      <div className="pt-2">
                        <span className="text-accent font-semibold tracking-wide uppercase text-xs border-b border-accent pb-1">
                          Hãy đăng nhập để đánh giá
                        </span>
                      </div>
                    </div>
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
