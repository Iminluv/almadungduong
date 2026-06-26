import React from "react";

export default function AdminSettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse font-sans" aria-busy="true" aria-label="Đang tải cấu hình hệ thống...">
      {/* Title skeleton */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-2">
        <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px]" />
        <div className="h-8 w-60 bg-[#F0EDE8] rounded-[2px]" />
      </div>

      {/* Tabs navigation skeleton */}
      <div className="border-b border-[#F0EDE8] flex gap-6 pb-2.5">
        <div className="h-5 w-24 bg-[#F0EDE8] rounded-[2px]" />
        <div className="h-5 w-36 bg-[#F0EDE8] rounded-[2px]" />
        <div className="h-5 w-28 bg-[#F0EDE8] rounded-[2px]" />
      </div>

      {/* Main settings form block skeleton */}
      <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-6">
        <div className="h-5 w-80 bg-[#F0EDE8] rounded-[2px] pb-2 border-b border-[#F0EDE8]" />
        <div className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <div className="h-3.5 w-40 bg-[#F0EDE8] rounded-[2px]" />
            <div className="h-9 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
          </div>
          <div className="space-y-1">
            <div className="h-3.5 w-44 bg-[#F0EDE8] rounded-[2px]" />
            <div className="h-9 w-full bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px]" />
            <div className="h-3 w-72 bg-[#FAF8F5] rounded-[2px] mt-1" />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-[#F0EDE8] max-w-xl">
          <div className="h-9 w-28 bg-[#F0EDE8] rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}
