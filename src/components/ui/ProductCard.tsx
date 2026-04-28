"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/store/useCart";

interface ProductCardProps {
  id: string;
  image: string;
  category?: string;
  title: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice?: number;
  flag?: string;
  volume?: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  id,
  image,
  category,
  title,
  rating,
  reviewsCount,
  price,
  originalPrice,
  flag,
  volume,
  onAddToCart,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    } else {
      addItem({ id, title, price, image });
    }
  };

  const formatPrice = (p: number) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <Link href={`/san-pham/${id}`} className="group relative flex flex-col border border-transparent hover:border-[#1C1C1A19] transition-all duration-200">
      {/* Product Image */}
      <div className="aspect-[4/5] bg-surface relative overflow-hidden">
        {flag && (
          <div className="absolute top-2 left-2 z-10 bg-accent text-bg text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
            {flag}
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
        />
        
        {/* Hover Action */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 ease-out">
          <Button variant="primary" size="full" onClick={handleAddToCart}>
            Thêm vào giỏ
          </Button>
        </div>
      </div>


      {/* Info */}
      <div className="flex flex-col p-4 pt-3">
        {(category || volume) && (
          <span className="text-[10px] uppercase font-semibold text-accent mb-1 tracking-wider">
            {category}{category && volume && " • "}{volume}
          </span>
        )}
        <h3 className="font-semibold text-base text-text mb-1 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-text">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </div>
          <span className="text-[13px] text-muted">
            {rating} · {reviewsCount} đánh giá
          </span>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-bold text-lg text-text">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-[14px] text-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}


export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-[4/5] bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="flex flex-col p-4 pt-3 gap-2">
        <div className="h-3 bg-surface w-1/4" />
        <div className="h-5 bg-surface w-3/4" />
        <div className="h-4 bg-surface w-1/2" />
        <div className="h-6 bg-surface w-2/3" />
      </div>
    </div>
  );
}
