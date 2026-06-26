import React from "react";

export default function AdminProductsLoading() {
  return (
    <div className="space-y-6 animate-pulse font-sans" aria-busy="true" aria-label="Đang tải danh sách sản phẩm...">
      {/* Title skeleton */}
      <div className="pb-4 border-b border-[#F0EDE8] flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
          <div className="h-8 w-64 bg-[#F0EDE8] rounded-[2px]" />
        </div>
        <div className="h-9 w-32 bg-[#F0EDE8] rounded-[2px]" />
      </div>

      {/* Table block skeleton */}
      <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-6">
        {/* Toolbar skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#FAF8F5] pb-4">
          <div className="h-8 w-44 bg-[#F0EDE8] rounded-[2px]" />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 justify-end">
            <div className="h-10 w-full sm:w-60 bg-[#F0EDE8] rounded-[2px]" />
            <div className="flex gap-2 justify-end">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-20 bg-[#F0EDE8] rounded-[2px]" />
              ))}
            </div>
          </div>
        </div>

        {/* Table Rows skeleton */}
        <div className="border border-[#F0EDE8] rounded-[2px] divide-y divide-[#F0EDE8]">
          {/* Header Row */}
          <div className="bg-[#F0EDE8]/50 h-10 hidden md:flex items-center px-6">
            <div className="flex-1 grid grid-cols-8 gap-4">
              <div className="h-4 w-12 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px] col-span-2" />
              <div className="h-4 w-20 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-4 w-16 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-4 w-12 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-4 w-12 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-4 w-16 bg-[#F0EDE8] rounded-[2px] justify-self-end" />
            </div>
          </div>
          {/* Item Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="py-4 px-6 block md:flex items-center">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
                <div className="h-10 w-10 bg-[#F0EDE8] rounded-[2px]" />
                <div className="space-y-1 col-span-2">
                  <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-3 w-40 bg-[#F0EDE8] rounded-[2px]" />
                </div>
                <div className="h-4 w-24 bg-[#F0EDE8] rounded-[2px]" />
                <div className="h-4 w-16 bg-[#F0EDE8] rounded-[2px] font-mono" />
                <div className="h-6 w-12 bg-[#F0EDE8] rounded-[2px]" />
                <div className="h-6 w-12 bg-[#F0EDE8] rounded-[2px]" />
                <div className="h-8 w-24 bg-[#F0EDE8] rounded-[2px] justify-self-end hidden md:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
