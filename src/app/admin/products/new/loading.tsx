import React from "react";

export default function AdminProductFormLoading() {
  return (
    <div className="space-y-6 animate-pulse font-sans" aria-busy="true" aria-label="Đang tải biểu mẫu sản phẩm...">
      {/* Title skeleton */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-2">
        <div className="h-4 w-48 bg-[#F0EDE8] rounded-[2px]" />
        <div className="h-8 w-60 bg-[#F0EDE8] rounded-[2px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeletons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Base Form details skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-6">
            <div className="h-5 w-32 bg-[#F0EDE8] rounded-[2px] pb-2 border-b border-[#F0EDE8]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <div className="h-3 w-20 bg-[#F0EDE8] rounded-[2px]" />
                <div className="h-9 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-24 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-9 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Textareas description skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-6">
            <div className="h-5 w-44 bg-[#F0EDE8] rounded-[2px] pb-2 border-b border-[#F0EDE8]" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-32 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-16 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Skeletons */}
        <div className="space-y-6">
          {/* Images block skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-4 w-36 bg-[#F0EDE8] rounded-[2px]" />
            <div className="space-y-2">
              <div className="h-9 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
              <div className="h-20 w-20 bg-[#F0EDE8] rounded-[2px]" />
            </div>
            <div className="space-y-2 pt-2 border-t border-[#F0EDE8]">
              <div className="h-3.5 w-28 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-8 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
              <div className="h-8 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
            </div>
          </div>

          {/* Visibility and switches block skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-4 w-28 bg-[#F0EDE8] rounded-[2px]" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="h-3.5 w-32 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-3 w-20 bg-[#F0EDE8] rounded-[2px]" />
                </div>
                <div className="h-5 w-9 bg-[#F0EDE8] rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="h-3.5 w-32 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-3 w-20 bg-[#F0EDE8] rounded-[2px]" />
                </div>
                <div className="h-5 w-9 bg-[#F0EDE8] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
