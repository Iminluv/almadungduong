"use client";

import { useCart } from "@/lib/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export function ToastNotification() {
  const { lastAddedItem, clearNotification, toggleCart } = useCart();

  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearNotification]);

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 50 }}
          className="fixed top-24 right-6 md:right-8 z-[200] w-[calc(100%-48px)] max-w-[380px]"
        >
          <div className="bg-text text-bg px-6 py-4 rounded-sm shadow-2xl flex items-center justify-between gap-4 border border-surface/10 ring-1 ring-white/10">

            <div className="flex items-center gap-3">
              <span className="text-accent text-lg font-bold">✓</span>
              <div className="flex flex-col">
                <p className="text-[11px] uppercase tracking-widest font-bold text-accent">Đã thêm vào giỏ</p>
                <p className="text-sm font-medium line-clamp-1">{lastAddedItem}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                toggleCart(true);
                clearNotification();
              }}
              className="text-xs font-bold uppercase tracking-widest border-b border-bg/50 hover:border-bg transition-all pb-0.5 whitespace-nowrap"
            >
              Xem giỏ hàng
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
