"use client";

import { useState, useEffect, Suspense } from "react";
import { products, skinConcerns, categories } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { MobileFilter } from "@/components/products/MobileFilter";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeConcerns, setActiveConcerns] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  // Sync category from URL
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory(null);
    }
  }, [categoryParam]);

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    if (activeCategory && product.category !== activeCategory) return false;
    if (activeConcerns.length > 0 && !activeConcerns.some(c => product.skinConcerns.includes(skinConcerns.find(sc => sc.id === c)?.label || ""))) return false;
    return true;
  });

  const toggleConcern = (id: string) => {
    setActiveConcerns(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <main className="pt-24 pb-20 bg-bg min-h-screen">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-12 space-y-4">
          <nav className="text-xs uppercase tracking-widest text-muted flex gap-2">
            <a href="/" className="hover:text-text">Trang chủ</a>
            <span>/</span>
            <span className="text-text">Sản phẩm</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-display font-semibold">
            {activeCategory || "Tất cả sản phẩm"}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            <FilterSidebar 
              categories={categories}
              concerns={skinConcerns}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeConcerns={activeConcerns}
              toggleConcern={toggleConcern}
            />
          </aside>

          {/* Mobile Toolbar */}
          <div className="lg:hidden flex justify-between items-center bg-surface p-4 rounded-sm mb-6">
            <p className="text-sm font-medium">Hiển thị {filteredProducts.length} sản phẩm</p>
            <MobileFilter 
              categories={categories}
              concerns={skinConcerns}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeConcerns={activeConcerns}
              toggleConcern={toggleConcern}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1 space-y-8">
            <div className="hidden lg:flex justify-between items-center border-b border-surface pb-4">
               <p className="text-sm text-muted">Hiển thị {filteredProducts.length} trong {products.length} sản phẩm</p>
               <div className="flex items-center gap-4 text-sm">
                 <span className="text-muted">Sắp xếp:</span>
                 <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-medium focus:outline-none cursor-pointer"
                  >
                   <option value="popular">Phổ biến nhất</option>
                   <option value="price-low">Giá: Thấp đến Cao</option>
                   <option value="price-high">Giá: Cao đến Thấp</option>
                 </select>
               </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    category={product.category}
                    image={product.image}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    reviewsCount={product.reviewsCount}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <p className="text-lg text-muted italic font-serif">Không tìm thấy sản phẩm phù hợp.</p>
                <button 
                  onClick={() => {setActiveCategory(null); setActiveConcerns([]);}}
                  className="text-sm underline underline-offset-4 font-medium"
                >
                  Xoá tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
