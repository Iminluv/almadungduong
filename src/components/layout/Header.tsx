"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { 
    label: "Sản phẩm", 
    href: "/san-pham", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Khuyến mãi", href: "/san-pham?category=Khuyến mãi" },
      { label: "Mỹ phẩm vi sinh Hoa Ngân", href: "/san-pham?category=Mỹ phẩm vi sinh Hoa Ngân" },
      { label: "Dụng cụ làm đẹp", href: "/san-pham?category=Dụng cụ làm đẹp" },
      { label: "Sản phẩm dưỡng sinh", href: "/san-pham?category=Sản phẩm dưỡng sinh" },
    ]
  },
  { label: "Kết quả", href: "/ket-qua" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Sharing", href: "/sharing-is-caring" },
];


import { useCart } from "@/lib/store/useCart";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);
  
  const { toggleCart, getItemCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Scroll handling

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Announcement visibility
    const isClosed = sessionStorage.getItem("announcement-closed");
    if (!isClosed) {
      const timer = setTimeout(() => setIsAnnouncementVisible(true), 800);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      };
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseAnnouncement = () => {
    setIsAnnouncementVisible(false);
    sessionStorage.setItem("announcement-closed", "true");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none">
        {/* Announcement Bar - Now part of the fixed header shell */}
        <AnimatePresence>
          {isAnnouncementVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 40, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-navy text-white overflow-hidden pointer-events-auto w-full"
            >
              <div className="h-[40px] flex items-center justify-between px-4 sm:px-12 relative">
                <div className="flex-1 flex justify-center overflow-hidden">
                  <div className="whitespace-nowrap md:animate-none animate-[marquee_18s_linear_infinite] hover:[animation-play-state:paused] text-[13px] font-normal tracking-wide">
                    FREE SHIP cho đơn từ 1.000.000đ  ·  Đồng hành 1:1 miễn phí đến khi da đẹp
                  </div>
                </div>
                <button
                  onClick={handleCloseAnnouncement}
                  className="text-[18px] leading-none hover:opacity-70 transition-opacity ml-4"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar */}
        <div
          className={cn(
            "w-full transition-all duration-300 ease-in-out pointer-events-auto",
            isScrolled 
              ? "bg-[#FAF8F5F5] backdrop-blur-xl border-b border-surface h-14 md:h-16" 
              : "bg-transparent h-16 md:h-20"
          )}
        >
          <div className="container-custom h-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-text">ALMA</span>
              <span className="font-body font-normal text-[10px] md:text-sm tracking-[0.15em] text-text opacity-70 group-hover:opacity-100 transition-opacity">DUNGDUONG</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 translate-y-[-1px]">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group py-4">
                  <Link
                    href={link.href}
                    className="relative py-1 text-sm font-medium text-text/70 hover:text-text transition-colors duration-150"
                  >
                    {link.label}
                    <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-text transition-all duration-200 ease-out group-hover:w-full" />
                  </Link>

                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                      <div className="bg-white border border-surface shadow-xl rounded-sm py-4 min-w-[240px] flex flex-col">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="px-6 py-2.5 text-sm text-text/70 hover:text-text hover:bg-surface transition-colors first:pt-0 last:pb-0"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/blog" className="hidden lg:block text-sm font-medium text-text/70 hover:text-text">
                Blog
              </Link>
              <button 
                onClick={() => toggleCart(true)}
                className="text-[12px] md:text-[13px] font-semibold tracking-[0.06em] hover:bg-surface px-2 py-1.5 rounded transition-colors flex items-center gap-1"
              >
                GIỎ ({isMounted ? getItemCount() : 0})
              </button>
              <Link 
                href="/tai-khoan" 
                className="hidden md:block text-[13px] font-semibold tracking-[0.06em] hover:bg-surface px-2 py-1.5 rounded transition-colors"
              >
                TK
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden text-xs font-semibold tracking-[0.06em] border border-surface px-2 py-1 rounded-sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? "ĐÓNG" : "MENU"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 md:hidden z-[60]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85vw] max-w-[360px] bg-bg border-l border-surface p-8 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.href} className="flex flex-col gap-4">
                    <Link
                      href={link.href}
                      className="text-2xl font-display font-semibold text-text"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="flex flex-col gap-3 pl-4 border-l border-surface ml-1">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-lg text-text/60 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="h-px bg-surface my-4" />
                <Link href="/tai-khoan" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Tài khoản</Link>
                <Link href="/blog" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

