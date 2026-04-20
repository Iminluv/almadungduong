"use client";

import { useCart } from "@/lib/store/useCart";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const formatPrice = (p: number) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/30 z-[100] backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-bg z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-surface flex justify-between items-center bg-bg">
              <h2 className="text-xl font-display font-semibold">Giỏ hàng ({items.length})</h2>
              <button 
                onClick={() => toggleCart(false)} 
                className="text-2xl text-muted hover:text-text transition-colors leading-none"
              >
                ×
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-muted italic">Giỏ hàng của bạn đang trống.</p>
                  <button 
                    onClick={() => toggleCart(false)}
                    className="text-sm font-semibold uppercase tracking-widest border-b border-text pb-1"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.variant}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-20 aspect-square bg-surface overflow-hidden rounded-sm flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-text line-clamp-1">{item.title}</h3>
                          {item.variant && (
                            <p className="text-[12px] text-muted mt-0.5 uppercase tracking-wider">{item.variant}</p>
                          )}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-muted hover:text-accent transition-colors p-1"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-surface rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                            className="px-2.5 py-1 text-sm hover:bg-surface transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                            className="px-2.5 py-1 text-sm hover:bg-surface transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-bold text-text">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-surface space-y-4 bg-[#FAF8F5]">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tạm tính</span>
                    <span className="font-medium text-text">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Phí vận chuyển</span>
                    <span className="text-accent font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-base font-bold uppercase tracking-wider">Tổng cộng</span>
                    <span className="text-lg font-bold text-text">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Link 
                    href="/thanh-toan" 
                    onClick={() => toggleCart(false)}
                    className="block w-full py-4 bg-accent text-bg text-center text-sm font-bold uppercase tracking-[0.1em] rounded-sm hover:brightness-110 transition-all shadow-sm active:scale-[0.98]"
                  >
                    Tiến hành thanh toán
                  </Link>
                  <button 
                    onClick={() => toggleCart(false)}
                    className="w-full py-3 text-xs font-bold text-muted uppercase tracking-widest hover:text-text transition-colors"
                  >
                    Tiếp tục mua hàng →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
