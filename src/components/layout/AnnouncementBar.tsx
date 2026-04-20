"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isClosed = sessionStorage.getItem("announcement-closed");
    if (!isClosed) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement-closed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-navy text-white overflow-hidden"
        >
          <div className="h-[40px] flex items-center justify-between px-4 sm:px-12 relative">
            <div className="flex-1 flex justify-center overflow-hidden">
              <div className="whitespace-nowrap md:animate-none animate-[marquee_18s_linear_infinite] hover:[animation-play-state:paused] text-[13px] font-normal">
                FREE SHIP cho đơn từ 1.000.000đ  ·  Đồng hành 1:1 miễn phí đến khi da đẹp
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-[18px] leading-none hover:opacity-70 transition-opacity ml-4"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
