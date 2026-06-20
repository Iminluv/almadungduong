"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/store/useCart";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/lib/store/useFavorites";
import { useState, useEffect } from "react";

interface ProductCardProps {
  id: string;
  slug?: string;
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
  slug,
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
  const { data: session } = useSession();
  const { favoriteIds, toggleFavorite, fetchFavorites } = useFavorites();
  const [localToast, setLocalToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchFavorites();
    }
  }, [session, fetchFavorites]);

  const isFavorited = favoriteIds.includes(id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const showToast = (message: string, type: "success" | "error") => {
      setLocalToast({ message, type });
      setTimeout(() => setLocalToast(null), 3000);
    };

    await toggleFavorite(id, !!session?.user, showToast);
  };

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
    <>
      <Link href={`/san-pham/${slug ?? id}`} className="group relative flex flex-col border border-transparent hover:border-[#1C1C1A19] transition-all duration-200">
        {/* Product Image */}
        <div className="aspect-[4/5] bg-surface relative overflow-hidden">
          {flag && (
            <div className="absolute top-2 left-2 z-10 bg-accent text-bg text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
              {flag}
            </div>
          )}

          {/* Favorite Toggle Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center transition-all cursor-pointer border border-text/5 hover:scale-105 pointer-events-auto"
            title={isFavorited ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={cn("w-4.5 h-4.5 transition-colors", isFavorited ? "text-red-500" : "text-text/60")}
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
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

      {/* Floating Action Toast for Favorites */}
      <AnimatePresence>
        {localToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[300]"
          >
            <div className={cn(
              "px-5 py-3 shadow-2xl text-[10px] font-bold uppercase tracking-widest rounded-sm text-white",
              localToast.type === "success" ? "bg-navy border-l-4 border-accent" : "bg-red-950 border-l-4 border-red-500"
            )}>
              {localToast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
