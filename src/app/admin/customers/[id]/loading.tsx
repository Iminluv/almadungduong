import React from "react";

export default function AdminCustomerDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse font-sans" aria-busy="true" aria-label="Đang tải thông tin chi tiết khách hàng...">
      {/* Breadcrumbs & Title skeleton */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-[#F0EDE8] rounded-[2px]" />
          <div className="h-8 w-60 bg-[#F0EDE8] rounded-[2px]" />
        </div>
        <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeletons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loyalty progression skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#F0EDE8]">
              <div className="h-5 w-44 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-6 w-32 bg-[#F0EDE8] rounded-[2px]" />
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex justify-between">
                <div className="h-4 w-28 bg-[#F0EDE8] rounded-[2px]" />
                <div className="h-4 w-28 bg-[#F0EDE8] rounded-[2px]" />
              </div>
              <div className="h-3 w-full bg-[#F0EDE8] rounded-full" />
              <div className="flex justify-between">
                <div className="h-3.5 w-24 bg-[#F0EDE8] rounded-[2px]" />
                <div className="h-3.5 w-48 bg-[#F0EDE8] rounded-[2px]" />
              </div>
            </div>
          </div>

          {/* Addresses skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-5 w-44 bg-[#F0EDE8] rounded-[2px] pb-3 border-b border-[#F0EDE8]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-28 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
              <div className="h-28 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
            </div>
          </div>

          {/* Order history skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-5 w-32 bg-[#F0EDE8] rounded-[2px] pb-3 border-b border-[#F0EDE8]" />
            <div className="space-y-3">
              <div className="bg-[#F0EDE8]/50 h-10 rounded-[2px]" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 border-b border-[#F0EDE8]" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Skeletons */}
        <div className="space-y-6">
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] text-center space-y-4">
            <div className="mx-auto w-24 h-24 rounded-full bg-[#F0EDE8]" />
            <div className="space-y-2 flex flex-col items-center">
              <div className="h-5 w-32 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-3.5 w-48 bg-[#F0EDE8] rounded-[2px]" />
            </div>
            <div className="pt-2 border-t border-[#F0EDE8] space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-16 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
