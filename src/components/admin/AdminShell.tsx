"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
  adminEmail?: string;
}

export default function AdminShell({ children, adminEmail }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1A] flex font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        adminEmail={adminEmail}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-60 min-h-screen">
        {/* Mobile Header Toolbar */}
        <header className="h-16 border-b border-[#F0EDE8] px-4 md:px-6 flex items-center justify-between bg-white sticky top-0 z-20 lg:static">
          <div className="flex items-center gap-3">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#FAF8F5] rounded-[2px] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1A4331]"
              aria-expanded={isSidebarOpen}
              aria-controls="admin-sidebar-nav"
              aria-label="Mở menu điều hướng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-[#1C1C1A]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <span className="lg:hidden font-display font-bold text-sm tracking-wider uppercase text-[#1C1C1A]">
              Alma Admin
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#8A8680]">
            <span className="hidden sm:inline">Kênh quản trị Alma Dungduong</span>
            <div className="w-1.5 h-1.5 bg-[#1A4331] rounded-full animate-pulse" title="Hệ thống trực tuyến" />
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-6 md:p-8 bg-[#FAF8F5]">
          {children}
        </main>
      </div>
    </div>
  );
}
