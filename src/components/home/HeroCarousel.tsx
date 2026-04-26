"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: ["Khoa Học Vi Sinh", "Cho Làn Da", "Nguyên Bản."],
    description: ["4 sản phẩm · 28 vấn đề da.", "Không hóa chất độc hại."],
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2000&auto=format&fit=crop",
    productImage: "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800&auto=format&fit=crop",
    accent: "text-accent"
  },
  {
    id: 2,
    title: ["Liệu Pháp Thảo Dược", "Tương Thích", "Sinh Học."],
    description: ["Sức mạnh thiên nhiên Việt Nam.", "An toàn cho da nhạy cảm nhất."],
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2000&auto=format&fit=crop",
    productImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
    accent: "text-[#4B5945]"
  },
  {
    id: 3,
    title: ["Đồng Hành 1:1", "Cho Đến Khi", "Da Đẹp."],
    description: ["Chăm sóc tận tâm mỗi ngày.", "Lộ trình riêng biệt cho từng người."],
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=2000&auto=format&fit=crop",
    productImage: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
    accent: "text-navy"
  },
  {
    id: 4,
    title: ["Tối Giản Routine", "Tối Đa", "Hiệu Quả."],
    description: ["Dừng lại việc lạm dụng mỹ phẩm.", "Tập trung phục hồi cốt lõi."],
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2000&auto=format&fit=crop",
    productImage: "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800&auto=format&fit=crop",
    accent: "text-accent"
  }
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-[95vh] h-screen overflow-hidden bg-bg">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="embla__slide relative flex-[0_0_100%] h-full flex items-center">
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title.join(" ")}
                  fill
                  className="object-cover opacity-20 grayscale-[10%]"
                  priority={index === 0}
                />
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'linear-gradient(to right, rgba(250,248,245,0.92) 45%, transparent 85%)' 
                  }} 
                />
              </div>

              <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Text Content */}
                <div className="max-w-2xl space-y-8">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="space-y-4">
                          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1]">
                            <motion.span 
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="block"
                            >
                              {slide.title[0]}
                            </motion.span>
                            <motion.span 
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="block"
                            >
                              {slide.title[1]}
                            </motion.span>
                            <motion.span 
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className={`block ${slide.accent}`}
                            >
                              {slide.title[2]}
                            </motion.span>
                          </h1>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="space-y-2 text-muted text-lg border-l-2 border-surface pl-6"
                          >
                            {slide.description.map((desc, i) => (
                              <p key={i}>{desc}</p>
                            ))}
                          </motion.div>
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 1.1 }}
                          className="flex flex-wrap gap-6 items-center mt-10"
                        >
                          <Button variant="primary" size="lg">
                            Mua ngay
                          </Button>
                          <Button variant="text" size="lg" className="group">
                            Tìm hiểu thêm <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Highlight Image */}
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div 
                      key={`img-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: -20 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="relative aspect-[4/5] max-w-sm ml-auto hidden lg:block"
                    >
                      <div className="absolute inset-0 bg-surface rounded-sm -rotate-2" />
                      <div className="relative z-10 w-full h-full overflow-hidden rounded-sm border border-surface shadow-lg">
                        <Image
                          src={slide.productImage}
                          alt="Featured Product"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 px-2 pointer-events-none hidden lg:block">
        <div className="flex justify-between w-full">
          <button
            onClick={scrollPrev}
            className="group flex items-center justify-center p-2 text-text/30 hover:text-text transition-all duration-300 pointer-events-auto"
            aria-label="Previous slide"
          >
            <div className="transform group-hover:-translate-x-2 transition-transform duration-300">
              <svg 
                width="40" 
                height="80" 
                viewBox="0 0 40 80" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current stroke-[1px]"
              >
                <path d="M35 5L5 40L35 75" />
              </svg>
            </div>
          </button>
          <button
            onClick={scrollNext}
            className="group flex items-center justify-center p-4 text-text/30 hover:text-text transition-all duration-300 pointer-events-auto"
            aria-label="Next slide"
          >
            <div className="transform group-hover:translate-x-2 transition-transform duration-300">
              <svg 
                width="40" 
                height="80" 
                viewBox="0 0 40 80" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current stroke-[1px]"
              >
                <path d="M5 5L35 40L5 75" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedIndex === i ? 'bg-accent w-8' : 'bg-muted/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-12 md:left-24 text-left hidden sm:block"
      >
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted flex gap-2 items-center">
            <span className="w-8 h-px bg-muted/40" />
            <span>Alma Dungduong © 2026</span>
        </div>
      </motion.div>
    </section>
  );
}
