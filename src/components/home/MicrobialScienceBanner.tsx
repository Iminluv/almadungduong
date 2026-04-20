"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MicrobialScienceBanner() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-bg">
      <div className="container-custom">
        {/* Banner Link */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-navy text-white py-12 px-8 flex flex-col md:flex-row items-center justify-between group transition-all duration-300 hover:bg-navy/95 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-start gap-2">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium opacity-70">Khám phá</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight"> Khoa học vi sinh </h2>
          </div>
          
          <div className="relative z-10 mt-6 md:mt-0 flex items-center gap-4">
            <span className="text-sm font-medium border border-white/20 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-navy transition-all duration-300">
               {isExpanded ? "Thu gọn" : "Xem kiến thức"}
            </span>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute right-[-5%] top-[-20%] w-[300px] h-[300px] border border-white/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-x border-b border-surface"
            >
              <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 bg-bg">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-text">Hệ vi sinh da là gì?</h3>
                  <p className="text-muted leading-relaxed">
                    Hệ vi sinh da (Microbiome) là một hệ sinh thái gồm hàng tỷ vi sinh vật sống trên bề mặt da. Khi hệ này cân bằng, da sẽ tự phục hồi và bảo vệ tốt nhất.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-text">Cơ chế tác động</h3>
                  <p className="text-muted leading-relaxed">
                    Sản phẩm Alma Dungduong cung cấp Prebiotics và Postbiotics giúp nuôi dưỡng lợi khuẩn, ức chế hại khuẩn mà không phá hủy lớp màng ẩm tự nhiên.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-text">Triết lý 1:1</h3>
                  <p className="text-muted leading-relaxed">
                    Chúng tôi không chỉ bán sản phẩm, chúng tôi đồng hành 1:1 cùng làn da của bạn cho đến khi đạt được trạng thái nguyên bản khỏe mạnh nhất.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
