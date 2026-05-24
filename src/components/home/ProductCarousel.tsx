"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/lib/data";
import { motion } from "framer-motion";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 bg-bg overflow-hidden">
      <div className="container-custom space-y-12">
        <div className="flex justify-between items-end border-b border-surface pb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold uppercase tracking-tight">
            {title}
          </h2>
          <div className="flex items-center gap-4">
            <a href="/san-pham" className="text-sm font-medium underline underline-offset-4 hover:text-accent transition-colors hidden sm:block">
              Tất cả sản phẩm →
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

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6 md:gap-8">
            {products.map((product) => (
              <div key={product.id} className="embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_22%] min-w-0">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice ?? undefined}
                  rating={product.rating}
                  reviewsCount={product.reviewsCount}
                  flag={product.flag ?? undefined}
                  volume={product.volume ?? undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
