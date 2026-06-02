"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkinConcern } from "@/lib/data";

interface MobileFilterProps {
  categories: string[];
  concerns: SkinConcern[];
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (subcat: string | null) => void;
  subcategories: string[];
  activeConcerns: string[];
  toggleConcern: (id: string) => void;
}

export function MobileFilter({
  categories,
  concerns,
  activeCategory,
  setActiveCategory,
  activeSubcategory,
  setActiveSubcategory,
  subcategories,
  activeConcerns,
  toggleConcern,
}: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-sm font-semibold uppercase tracking-widest text-text border-b border-text pb-1"
      >
        Lọc & Sắp xếp
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-[100] backdrop-blur-[2px]"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-bg z-[101] max-h-[85vh] overflow-y-auto rounded-t-2xl shadow-2xl safe-area-bottom"
            >
              <div className="sticky top-0 bg-bg px-6 py-4 border-b border-surface flex justify-between items-center">
                <h3 className="text-lg font-display font-semibold">Bộ lọc</h3>
                <button onClick={() => setIsOpen(false)} className="text-2xl text-muted hover:text-text leading-none">×</button>
              </div>

              <div className="p-6 space-y-8">
                {/* Categories */}
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Danh mục</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setActiveCategory(null);
                        setActiveSubcategory(null);
                      }}
                      className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${!activeCategory ? 'bg-text text-bg' : 'bg-surface text-text'}`}
                    >
                      Tất cả
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setActiveSubcategory(null);
                        }}
                        className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${activeCategory === cat ? 'bg-text text-bg' : 'bg-surface text-text'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories (e.g. for Sản phẩm dưỡng sinh) */}
                {activeCategory && subcategories.length > 0 && (
                  <div className="space-y-4 pt-2 text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted">Nhóm sản phẩm</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveSubcategory(null)}
                        className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                          activeSubcategory === null ? 'bg-accent text-white' : 'bg-surface text-text'
                        }`}
                      >
                        Tất cả {activeCategory.toLowerCase()}
                      </button>
                      {subcategories.map(subcat => (
                        <button
                          key={subcat}
                          onClick={() => setActiveSubcategory(subcat)}
                          className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                            activeSubcategory === subcat ? 'bg-accent text-white' : 'bg-surface text-text'
                          }`}
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Concerns */}
                <div className="space-y-4 text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">Vấn đề da</p>
                  <div className="grid grid-cols-2 gap-3">
                    {concerns.map(concern => (
                      <button
                        key={concern.id}
                        onClick={() => toggleConcern(concern.id)}
                        className={`flex justify-between items-center p-3 rounded-sm text-sm border transition-all ${activeConcerns.includes(concern.id) ? 'border-accent bg-accent/5 font-semibold text-accent' : 'border-surface bg-bg'}`}
                      >
                        <span>{concern.label}</span>
                        {activeConcerns.includes(concern.id) && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    onClick={() => {
                      setActiveCategory(null);
                      setActiveSubcategory(null);
                      activeConcerns.forEach(c => toggleConcern(c));
                      setIsOpen(false);
                    }}
                    className="flex-1 py-4 text-sm font-bold uppercase tracking-widest text-muted bg-surface rounded-sm"
                  >
                    Xoá tất cả
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-4 text-sm font-bold uppercase tracking-widest text-bg bg-accent rounded-sm"
                  >
                    Xem kết quả
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
