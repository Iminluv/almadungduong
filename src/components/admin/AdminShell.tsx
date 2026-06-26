"use client";

import React, { useState } from "react";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1A] flex flex-col font-sans">
      <header className="h-16 border-b border-[#F0EDE8] px-6 flex items-center justify-between bg-white">
        <h1 className="text-xl font-bold text-[#1A4331]">Alma Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#8A8680]">Chào mừng, Admin</span>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="w-60 border-r border-[#F0EDE8] bg-[#F0EDE8] p-6 hidden md:block">
          <nav className="space-y-2">
            <div className="font-medium text-xs uppercase text-[#8A8680] tracking-wider">Danh mục</div>
            <div className="text-sm font-semibold text-[#1A4331] py-1">Tổng quan</div>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-[#FAF8F5]">{children}</main>
      </div>
    </div>
  );
}
