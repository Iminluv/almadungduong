"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function ChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after 5s or substantial scroll
    const timer = setTimeout(() => setIsVisible(true), 5000);
    
    const handleScroll = () => {
      if (window.scrollY > 500) setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop Widget */}
      <div className="fixed bottom-8 right-8 z-[150] hidden md:block">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-end gap-3"
            >
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-navy text-white p-6 rounded-sm shadow-2xl mb-2 w-72 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <p className="font-semibold uppercase tracking-widest text-xs">Tư vấn miễn phí</p>
                    <button onClick={() => setIsOpen(false)} className="text-xl leading-none">×</button>
                  </div>
                  <div className="space-y-4">
                    <a 
                      href="https://zalo.me" 
                      target="_blank" 
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm font-medium">Nhắn qua Zalo</span>
                      <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a 
                      href="https://m.me" 
                      target="_blank" 
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm font-medium">Nhắn qua Messenger</span>
                      <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                  <p className="text-[10px] text-white/50 italic font-serif">Chúng tôi thường phản hồi trong 15 phút.</p>
                </motion.div>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-navy text-white px-6 py-4 rounded-sm shadow-xl flex items-center gap-3 group transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  {isOpen ? "Đóng" : "Hỗ trợ 1:1"}
                </span>
                {!isOpen && (
                  <span className="text-accent animate-pulse">●</span>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-navy text-white border-t border-white/10 flex divide-x divide-white/10 safe-area-bottom">
        <a 
          href="https://zalo.me" 
          target="_blank" 
          className="flex-1 py-4 flex flex-col items-center justify-center gap-1 active:bg-white/5 transition-colors"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Zalo</span>
          <span className="text-xs font-medium">Tư vấn nhanh</span>
        </a>
        <a 
          href="https://m.me" 
          target="_blank" 
          className="flex-1 py-4 flex flex-col items-center justify-center gap-1 active:bg-white/5 transition-colors"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Messenger</span>
          <span className="text-xs font-medium">Chat ngay</span>
        </a>
      </div>
    </>
  );
}
