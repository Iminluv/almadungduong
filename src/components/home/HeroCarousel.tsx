"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    titleNormal: "Khoa học vi sinh",
    titleHighlight: "Phục hồi làn da khỏe mạnh nguyên bản",
    title: "Khoa học vi sinh - Phục hồi làn da khỏe mạnh nguyên bản",
    image: "/images/hero/slide_2.png",
  },
  {
    id: 2,
    titleNormal: "Làm đẹp không xâm lấn",
    titleHighlight: "Lợi khuẩn đề kháng cao",
    title: "Giải pháp làm đẹp không xâm lấn - Bằng hệ lợi khuẩn đề kháng cao",
    image: "/images/hero/slide_3.png",
  },
  {
    id: 3,
    titleNormal: "Không hóa chất độc hại",
    titleHighlight: "Đã được kiểm nghiệm",
    title: "Mỹ phẩm không hóa chất độc hại - Đã được kiểm nghiệm",
    image: "/images/hero/slide_1.png",
  },
  {
    id: 4,
    titleNormal: "Cam kết hiệu quả",
    titleHighlight: "Đồng hành 1-1 miễn phí tới khi da đẹp",
    title: "Cam kết hiệu quả - Đồng hành 1-1 miễn phí tới khi da đẹp",
    image: "/images/hero/slide_4.png",
  },
];

export function HeroCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, []);

  const handleManualNavigation = useCallback(
    (index: number) => {
      if (isNavigating) return;
      setIsNavigating(true);
      setSelectedIndex(index);
      startAutoplay();
      setTimeout(() => setIsNavigating(false), 800);
    },
    [isNavigating, startAutoplay]
  );

  const scrollPrev = useCallback(() => {
    const nextIndex =
      selectedIndex === 0 ? slides.length - 1 : selectedIndex - 1;
    handleManualNavigation(nextIndex);
  }, [selectedIndex, handleManualNavigation]);

  const scrollNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % slides.length;
    handleManualNavigation(nextIndex);
  }, [selectedIndex, handleManualNavigation]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [startAutoplay]);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5] select-none">
      {/* Image Container — aspect ratio preserves the 1942×809 dimensions on desktop, with fixed height on mobile */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-auto md:aspect-[1942/809]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-${selectedIndex}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[selectedIndex].image}
              alt={slides[selectedIndex].title}
              fill
              className="object-cover object-center"
              priority={selectedIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle gradient overlay at the bottom for navigation readability */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />

        {/* Title overlay — top-left, positioned in the white space at the top of images */}
        <div className="absolute inset-0 z-20 flex items-start pointer-events-none">
          <div className="container-custom w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${selectedIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="max-w-lg space-y-4 sm:space-y-5"
              >
                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-cormorant font-normal leading-[1.25] tracking-tight">
                  <span className="text-text">{slides[selectedIndex].titleNormal}</span>
                  <br />
                  <span className="text-accent">{slides[selectedIndex].titleHighlight}</span>
                </h1>
                <div className="pointer-events-auto pt-1 sm:pt-2">
                  <button
                    onClick={() =>
                      (window.location.href = "/san-pham")
                    }
                    className="group inline-flex items-center gap-3 bg-accent text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-6 sm:px-7 py-3 sm:py-3.5 rounded-sm hover:bg-[#193a2b] transition-all duration-400 shadow-md shadow-accent/10"
                  >
                    <span>Khám phá</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-xs">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation bar */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-30">
          <div className="container-custom flex items-center justify-end gap-6">
            {/* Fraction pager */}
            <div className="flex items-center gap-2 text-xs tracking-widest font-body text-white/70 whitespace-nowrap">
              <span className="font-serif italic text-white font-medium text-sm">
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <span className="opacity-50">/</span>
              <span className="font-serif text-sm">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-24 sm:w-32 h-[1.5px] bg-white/20 relative">
              <motion.div
                key={selectedIndex}
                className="absolute left-0 top-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>

            {/* Arrow Controls */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                aria-label="Previous slide"
              >
                <span className="text-xs">←</span>
              </button>
              <button
                onClick={scrollNext}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                aria-label="Next slide"
              >
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
