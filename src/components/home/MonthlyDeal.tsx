"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

import { products } from "@/lib/data";

const comboDeals = products
  .filter(p => p.id.startsWith('combo-'))
  .map(p => {
    const titles = p.title.split('\n');
    return {
      id: p.id,
      title: titles[0],
      highlight: titles.slice(1).join(' '),
      description: p.description,
      price: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.price),
      originalPrice: p.originalPrice ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.originalPrice) : "",
      saving: p.originalPrice ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.originalPrice - p.price) : "",
      discount: p.originalPrice ? `${Math.round((1 - p.price / p.originalPrice) * 100)}%` : "",
      image: p.image,
      gift: p.gift
    };
  });

export function MonthlyDeal() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          // Manual Rewind Loop: Go back to first slide
          emblaApi.scrollTo(0);
        }
      }
    }, 6000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
    });
    emblaApi.on("settle", () => {
        startAutoplay();
    });

    startAutoplay();

    return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, onSelect, startAutoplay]);

  return (
    <section className="py-12 md:py-24 bg-bg overflow-hidden">
      <div className="container-custom">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {comboDeals.map((deal, index) => (
              <div key={deal.id} className="embla__slide flex-[0_0_100%] min-w-0">
                <div className="relative bg-surface rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-[#1C1C1A10] mx-1">
                  {/* Background Ornament */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-bg rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3" />
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row items-center">
                    {/* Image Side */}
                    <div className="w-full lg:flex-1 relative lg:h-[600px] flex items-center justify-center p-10 lg:p-0 order-first lg:order-last">
                        <div className="relative w-full aspect-square max-w-[320px] md:max-w-[400px] lg:max-w-[450px] group">
                            <div className="absolute inset-0 bg-accent/10 rounded-full blur-[40px] md:blur-[60px] group-hover:bg-accent/20 transition-all duration-700" />
                            
                            {/* Animated Container for the active image */}
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={`${deal.id}-${selectedIndex === index}`}
                                initial={{ opacity: 0.8, scale: 0.9, rotate: -2 }}
                                animate={selectedIndex === index ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0.8, scale: 0.9 }}
                                transition={{ duration: 0.6 }}
                                className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-text/5"
                              >
                                  <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                              </motion.div>
                            </AnimatePresence>

                            <motion.div 
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute -top-4 -right-4 bg-bg text-accent w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-full shadow-xl z-20 border-4 border-surface font-bold leading-none"
                            >
                              <span className="text-[10px] md:text-xs">OFF</span>
                              <span className="text-xl md:text-2xl">{deal.discount}</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:flex-1 p-8 md:p-12 lg:p-24 space-y-8 text-center lg:text-left">
                      <div className="inline-flex items-center gap-3 bg-bg/50 backdrop-blur-md px-4 py-2 rounded-full border border-text/5">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent">Đặc quyền tháng này</span>
                      </div>

                      <div className="space-y-4 md:space-y-6">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                          {deal.title} <br className="hidden md:block" />
                          <span className="text-accent italic uppercase tracking-wider">{deal.highlight}</span>
                        </h2>
                        <p className="text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:ml-0">
                          {deal.description}
                        </p>
                      </div>

                      {deal.gift && (
                         <div className="bg-accent/5 p-4 rounded-sm border border-accent/20 max-w-lg mx-auto lg:ml-0 text-left">
                           <p className="text-xs uppercase text-accent font-bold mb-1">Quà Tặng Tới Hết Tháng</p>
                           <p className="text-xs md:text-sm text-text/80 whitespace-pre-line">{deal.gift}</p>
                         </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-4 md:gap-8">
                        <div className="flex flex-col items-center lg:items-start">
                          <span className="text-muted text-xs md:text-sm line-through">{deal.originalPrice}</span>
                          <span className="text-3xl md:text-4xl font-display font-bold text-text">{deal.price}</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-px h-10 md:h-12 bg-text/10 hidden sm:block" />
                           <div className="flex flex-col items-center lg:items-start">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Tiết kiệm</span>
                              <span className="text-lg md:text-xl font-bold text-accent">{deal.saving}</span>
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto px-10">Sở hữu ngay</Button>
                        <a href={`/san-pham/${deal.id}`} className="group inline-flex border border-transparent p-0 text-text hover:text-accent font-medium text-lg lg:text-base cursor-pointer">
                          <span>Xem chi tiết</span> 
                          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {comboDeals.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                  emblaApi?.scrollTo(i);
                  startAutoplay();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === i ? 'bg-accent w-8' : 'bg-text/10 w-1.5'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
