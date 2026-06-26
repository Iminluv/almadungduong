"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  adminEmail?: string;
}

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    />
  </svg>
);

const OrdersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

const CustomersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const ProductsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.59 0l4.318-4.317a1.125 1.125 0 000-1.591L9.581 4.66a2.25 2.25 0 00-1.591-.659zm-2.443 4.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869l.214-1.28z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const NAV_ITEMS = [
  { label: "Tổng quan", href: "/admin", Icon: DashboardIcon },
  { label: "Đơn hàng", href: "/admin/orders", Icon: OrdersIcon },
  { label: "Khách hàng", href: "/admin/customers", Icon: CustomersIcon },
  { label: "Sản phẩm", href: "/admin/products", Icon: ProductsIcon },
  { label: "Cài đặt", href: "/admin/settings", Icon: SettingsIcon },
];

export default function AdminSidebar({ isOpen, onClose, adminEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div
      ref={sidebarRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="flex flex-col h-full bg-[#1C1C1A] text-[#FAF8F5] border-r border-[#FAF8F5]/10 w-60 select-none font-sans"
    >
      {/* Header / Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-[#FAF8F5]/10">
        <div className="flex items-center gap-2.5">
          {/* Logo Mark */}
          <span className="w-5 h-5 bg-[#1A4331] text-[#FAF8F5] flex items-center justify-center font-bold text-xs rounded-[2px]">
            ◆
          </span>
          <span className="font-display font-bold text-sm tracking-widest text-[#FAF8F5] uppercase">
            Alma Admin
          </span>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 hover:bg-white/10 rounded-[2px] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1A4331]"
          aria-label="Đóng menu điều hướng"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Nav Links */}
      <nav aria-label="Admin navigation" id="admin-sidebar-nav" className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.Icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-[2px] transition-all duration-150 group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/60 ${
                    active
                      ? "bg-[#1A4331] text-white border-l-[3px] border-[#1A4331]"
                      : "text-[#FAF8F5]/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={active ? "text-white" : "text-[#FAF8F5]/45 group-hover:text-white"}>
                    <Icon />
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Pinned Admin Card */}
      <div className="p-4 border-t border-[#FAF8F5]/10 space-y-3 bg-black/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1A4331] flex items-center justify-center text-xs font-bold uppercase text-white">
            {adminEmail ? adminEmail[0] : "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#FAF8F5]/40 font-bold uppercase tracking-wider">
              Tài khoản
            </p>
            <p className="text-xs text-white font-medium truncate" title={adminEmail}>
              {adminEmail || "admin@almadungduong.com"}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/tai-khoan" })}
          className="w-full text-center py-2 px-3 border border-[#FAF8F5]/20 hover:border-white hover:bg-white/5 text-xs font-semibold rounded-[2px] transition-colors cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-white/60"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-60">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Portal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            aria-hidden="true"
          />
          {/* Drawer Element */}
          <div className="fixed inset-y-0 left-0 flex max-w-full transform transition ease-in-out duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
