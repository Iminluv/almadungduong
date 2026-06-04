"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

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
      { label: "Chăm sóc da mặt", href: "/san-pham?category=Sản phẩm dưỡng sinh&subcategory=Chăm sóc da mặt", isSub: true },
      { label: "Chăm sóc da cơ thể", href: "/san-pham?category=Sản phẩm dưỡng sinh&subcategory=Chăm sóc da cơ thể", isSub: true },
    ]
  },
  { label: "Kết quả", href: "/ket-qua" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Khách hàng thân thiết", href: "/khach-hang-than-thiet" },
];


import { useCart } from "@/lib/store/useCart";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);

  const { data: session } = useSession();
  const { toggleCart, getItemCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "FREE SHIP cho đơn từ 1.000.000đ  ·  Đồng hành 1:1 miễn phí đến khi da đẹp",
    "Nhận quà ngay khi Đăng ký thành viên tại đây"
  ];

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

  useEffect(() => {
    if (isAnnouncementVisible) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAnnouncementVisible, messages.length]);

  const handleCloseAnnouncement = () => {
    setIsAnnouncementVisible(false);
    sessionStorage.setItem("announcement-closed", "true");
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 flex flex-col pointer-events-none -mb-[1px]">
        {/* Announcement Bar - Now part of the sticky header shell */}
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
                  <div className="flex justify-center items-center w-full relative">
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
                        ) : session?.user ? (
                          <>
                            Chào mừng bạn trở lại, xem ưu đãi thành viên{" "}
                            <Link href="/tai-khoan" className="underline underline-offset-2 hover:text-accent transition-colors">
                              tại đây
                            </Link>
                          </>
                        ) : (
                          <>
                            Nhận quà ngay khi Đăng ký thành viên{" "}
                            <Link href="/tai-khoan" className="underline underline-offset-2 hover:text-accent transition-colors">
                              tại đây
                            </Link>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar */}
        <div
          className={cn(
            "w-full transition-all duration-300 ease-in-out pointer-events-auto",
            isScrolled
              ? "bg-[#FAF8F5F5] backdrop-blur-xl border-b border-surface h-12 md:h-14"
              : "bg-transparent h-14 md:h-16"
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
                            className={cn(
                              "px-6 py-2 transition-colors first:pt-0 last:pb-0 text-left",
                              (item as any).isSub
                                ? "pl-9 text-xs text-text/50 hover:text-accent hover:bg-surface/50 font-normal"
                                : "text-sm text-text/70 hover:text-text hover:bg-surface font-medium"
                            )}
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
              {isMounted && session?.user ? (
                <Link
                  href="/tai-khoan"
                  className="hidden md:flex items-center gap-2 text-[13px] font-semibold tracking-[0.06em] hover:bg-surface px-2 py-1.5 rounded transition-colors"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Avatar"}
                      className="w-6 h-6 rounded-full object-cover border border-text/10"
                    />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[10px] font-bold">
                      {(session.user.name || session.user.email || "A").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-[80px] truncate">
                    {(session.user.name || "Thành viên").split(" ").pop()}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/tai-khoan"
                  className="hidden md:block text-[13px] font-semibold tracking-[0.06em] hover:bg-surface px-2 py-1.5 rounded transition-colors"
                >
                  TÀI KHOẢN
                </Link>
              )}

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
                            className={cn(
                              "font-medium transition-colors text-left",
                              (item as any).isSub
                                ? "text-sm text-text/40 pl-4 py-0.5 hover:text-accent"
                                : "text-lg text-text/60 py-1 hover:text-text"
                            )}
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
                {session?.user ? (
                  <Link
                    href="/tai-khoan"
                    className="text-lg font-medium flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "Avatar"}
                        className="w-6 h-6 rounded-full object-cover border border-text/10"
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[10px] font-bold">
                        {(session.user.name || session.user.email || "A").charAt(0).toUpperCase()}
                      </span>
                    )}
                    Tài khoản ({(session.user.name || "Thành viên").split(" ").pop()})
                  </Link>
                ) : (
                  <Link href="/tai-khoan" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Tài khoản</Link>
                )}
                <Link href="/blog" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

