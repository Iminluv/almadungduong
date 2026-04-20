"use client";

import { useState } from "react";
import { blogPosts } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  
  const categories = ["Tất cả", "Kiến thức", "Làm đẹp", "Câu chuyện"];
  
  const filteredPosts = activeCategory === "Tất cả" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-bg pb-32">
      {/* Hero Header */}
      <section className="py-24 md:py-32 border-b border-surface">
         <div className="container-custom">
           <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight">Kinh nghiệm & <br /> Chia sẻ</h1>
              <p className="text-lg text-muted font-serif italic leading-relaxed">
                 Kiến thức chuyên sâu về hệ vi sinh và những câu chuyện thật từ hành trình tìm lại làn da nguyên bản.
              </p>
           </div>
         </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[60px] md:top-[80px] z-30 bg-bg border-b border-surface py-2">
         <div className="container-custom overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 py-4 px-1">
               {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                      activeCategory === cat ? "text-accent" : "text-muted hover:text-text"
                    }`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* Grid */}
      <section className="py-20">
         <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
               <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, idx) => (
                    <motion.article 
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link href={`/blog/${post.id}`} className="group space-y-6 block">
                         <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                            <Image 
                              src={post.image} 
                              alt={post.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute top-4 left-4 bg-bg px-2 py-1 text-[9px] font-bold uppercase tracking-widest">
                               {post.category}
                            </div>
                         </div>
                         <div className="space-y-3">
                            <p className="text-[10px] text-muted font-medium tracking-widest uppercase">
                               {post.date} · {post.readTime} đọc
                            </p>
                            <h2 className="text-2xl font-display font-semibold leading-tight group-hover:text-accent transition-colors">
                               {post.title}
                            </h2>
                            <p className="text-sm text-muted leading-relaxed line-clamp-2 italic font-serif">
                               {post.excerpt}
                            </p>
                         </div>
                         <div className="pt-4 flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest border-b border-text/10 group-hover:border-accent transition-colors">Đọc thêm</span>
                            <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                         </div>
                      </Link>
                    </motion.article>
                  ))}
               </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
               <div className="py-32 text-center text-muted italic font-serif">
                  Chưa có bài viết nào trong danh mục này.
               </div>
            )}
         </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-surface">
         <div className="container-custom max-w-2xl text-center space-y-8">
            <h3 className="text-3xl font-display font-bold uppercase tracking-tight">Đăng ký bản tin</h3>
            <p className="text-muted italic font-serif">Nhận những kiến thức chăm sóc da vi sinh mới nhất định kỳ 1 lần/tuần.</p>
            <form className="flex gap-4 border-b border-text/20 pb-2">
               <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="flex-1 bg-transparent py-2 outline-none text-sm placeholder:italic"
               />
               <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:brightness-110 transition-all">Gửi →</button>
            </form>
         </div>
      </section>
    </main>
  );
}
