"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

import { Product } from "@/lib/data";

interface MonthlyDealProps {
  products: Product[];
}

export function MonthlyDeal({ products }: MonthlyDealProps) {
  const comboDeals = React.useMemo(() => {
    return products
      .filter(p => p.id.startsWith('combo-'))
      .map(p => {
        const titles = p.title.split('\n');
        return {
          id: p.id,
          slug: p.slug,
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
  }, [products]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

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

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
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
    <section className="py-20 bg-bg overflow-hidden">
      <div className="container-custom space-y-12">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-surface pb-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block">
              Chương trình khuyến mãi
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold uppercase tracking-tight">
              Combo Ưu Đãi Tháng
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a href="/san-pham" className="text-sm font-medium underline underline-offset-4 hover:text-accent transition-colors hidden sm:block">
              Tất cả combo →
            </a>
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 border border-surface flex items-center justify-center hover:bg-surface transition-colors rounded-full"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 border border-surface flex items-center justify-center hover:bg-surface transition-colors rounded-full"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {comboDeals.map((deal) => (
              <div key={deal.id} className="embla__slide flex-[0_0_310px] min-w-0">
                <div className="relative bg-surface rounded-2xl overflow-hidden shadow-sm border border-text/5 flex flex-col h-[500px] mx-0.5 hover:shadow-md hover:border-accent/20 transition-all duration-300 group">
                  
                  {/* Image Area with Discount Badge */}
                  <div className="relative w-full h-[285px] bg-accent/5 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={deal.image} 
                      alt={deal.highlight || deal.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      sizes="(max-w-768px) 100vw, 310px"
                    />
                    <div className="absolute top-3 right-3 bg-bg text-accent w-11 h-11 flex flex-col items-center justify-center rounded-full shadow-md border-2 border-surface font-bold leading-none z-10 text-[9px]">
                      <span>OFF</span>
                      <span className="text-xs">{deal.discount}</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Title */}
                      <div className="space-y-1">
                        <h3 className="font-display text-text group-hover:text-accent transition-colors duration-300 leading-snug">
                          <span className="text-xs md:text-sm font-bold uppercase tracking-wider block min-h-[40px] line-clamp-2 leading-snug text-accent">
                            {deal.highlight || deal.title}
                          </span>
                        </h3>
                        <p className="text-muted text-[11px] leading-relaxed line-clamp-2 min-h-[32px]">
                          {deal.description}
                        </p>
                      </div>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="space-y-3 pt-3 border-t border-text/5">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-muted text-[10px] line-through">{deal.originalPrice}</span>
                          <span className="text-sm md:text-base font-display font-bold text-text">{deal.price}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-muted block">Tiết kiệm</span>
                          <span className="text-xs font-bold text-accent">{deal.saving}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-0.5">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="flex-1 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded"
                          onClick={() => window.location.href = `/san-pham/${deal.slug ?? deal.id}`}
                        >
                          Sở hữu ngay
                        </Button>
                        <a 
                          href={`/san-pham/${deal.slug ?? deal.id}`} 
                          className="text-[11px] font-bold tracking-wider uppercase text-text hover:text-accent transition-colors px-2.5 py-1.5 border border-text/10 rounded flex-shrink-0"
                        >
                          Chi tiết
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
        <div className="flex justify-center gap-2">
          {comboDeals.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                  emblaApi?.scrollTo(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === i ? 'bg-accent w-6' : 'bg-text/10 w-1.5'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

