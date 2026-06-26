import React from "react";

export default function AdminOrderDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse font-sans" aria-busy="true" aria-label="Đang tải thông tin chi tiết đơn hàng...">
      {/* Breadcrumbs & Title skeleton */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-[#F0EDE8] rounded-[2px]" />
          <div className="flex gap-3 items-center">
            <div className="h-8 w-40 bg-[#F0EDE8] rounded-[2px]" />
            <div className="h-6 w-24 bg-[#F0EDE8] rounded-[2px]" />
          </div>
        </div>
        <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column skeletons */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products List skeleton */}
          <div className="bg-white border border-[#F0EDE8] rounded-[2px] overflow-hidden">
            <div className="h-12 bg-[#FAF8F5] border-b border-[#F0EDE8] px-6 flex items-center">
              <div className="h-5 w-32 bg-[#F0EDE8] rounded-[2px]" />
            </div>
            <div className="p-6 space-y-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-16 w-16 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 bg-[#F0EDE8] rounded-[2px]" />
                    <div className="h-3.5 w-24 bg-[#F0EDE8] rounded-[2px]" />
                  </div>
                  <div className="h-4 w-16 bg-[#F0EDE8] rounded-[2px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Webhook logs skeleton */}
          <div className="bg-white border border-[#F0EDE8] rounded-[2px] overflow-hidden">
            <div className="h-12 bg-[#FAF8F5] border-b border-[#F0EDE8] px-6 flex items-center">
              <div className="h-5 w-44 bg-[#F0EDE8] rounded-[2px]" />
            </div>
            <div className="p-6 space-y-4">
              <div className="h-16 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
              <div className="h-16 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
            </div>
          </div>
        </div>

        {/* Right column skeletons */}
        <div className="space-y-6">
          {/* Action skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
            <div className="h-8 w-full bg-[#F0EDE8] rounded-[2px]" />
          </div>

          {/* Customer info skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-4 w-36 bg-[#F0EDE8] rounded-[2px]" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-16 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Snapshot skeleton */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="h-4 w-36 bg-[#F0EDE8] rounded-[2px]" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-20 bg-[#F0EDE8] rounded-[2px]" />
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
