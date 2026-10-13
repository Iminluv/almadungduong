"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "FREE SHIP cho đơn từ 1.000.000đ  ·  Đồng hành 1:1 miễn phí đến khi da đẹp",
    "Nhận quà ngay khi Đăng ký thành viên tại đây",
    "🎁 Xác thực số điện thoại để nhận quà & bảo vệ tài khoản",
  ];

  const openPhoneVerificationPopup = () => {
    if (typeof window === "undefined") return;
    const width = 440;
    const height = 560;
    const left = Math.max(0, (window.innerWidth - width) / 2 + window.screenX);
    const top = Math.max(0, (window.innerHeight - height) / 2 + window.screenY);
    window.open(
      "/xac-thuc-sdt",
      "PhoneVerification",
      `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
    );
  };

  useEffect(() => {
    const isClosed = sessionStorage.getItem("announcement-closed");
    if (!isClosed) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible, messages.length]);

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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[13px] font-normal tracking-wide text-center"
                >
                  {currentMessageIndex === 0 ? (
                    messages[0]
                  ) : currentMessageIndex === 1 ? (
                    <>
                      Nhận quà ngay khi Đăng ký thành viên{" "}
                      <Link href="/tai-khoan" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
                        tại đây
                      </Link>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <span>🎁 Xác thực số điện thoại để nhận voucher & bảo vệ tài khoản</span>
                      <button
                        onClick={openPhoneVerificationPopup}
                        className="underline underline-offset-2 hover:opacity-80 font-semibold transition-opacity cursor-pointer ml-1"
                      >
                        Xác thực ngay
                      </button>
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
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
