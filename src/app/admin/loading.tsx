import React from "react";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse font-sans" aria-busy="true" aria-label="Đang tải dữ liệu...">
      {/* Page Title skeleton */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0EDE8]">
        <div className="h-8 w-44 bg-[#F0EDE8] rounded-[2px]" />
        <div className="h-4 w-32 bg-[#F0EDE8] rounded-[2px] hidden sm:block" />
      </div>

      {/* KPI Grid skeletons (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-[#F0EDE8] p-5 rounded-[2px] space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-4 w-16 bg-[#F0EDE8] rounded-[2px]" />
            </div>
            <div className="space-y-2">
              <div className="h-7 w-36 bg-[#F0EDE8] rounded-[2px]" />
              <div className="h-3.5 w-24 bg-[#F0EDE8] rounded-[2px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Two column layout: Revenue Trend + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart skeleton (span-2) */}
        <div className="lg:col-span-2 bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-5 w-48 bg-[#F0EDE8] rounded-[2px]" />
            <div className="h-4 w-28 bg-[#F0EDE8] rounded-[2px]" />
          </div>
          {/* Chart visual representation */}
          <div className="h-64 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px] flex items-end justify-between px-6 pb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-10 bg-[#F0EDE8] rounded-t-[2px]"
                style={{ height: `${(i + 2) * 12}%` }}
              />
            ))}
          </div>
        </div>

        {/* Recent Orders skeleton */}
        <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-5 w-40 bg-[#F0EDE8] rounded-[2px]" />
            <div className="h-4 w-20 bg-[#F0EDE8] rounded-[2px]" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#FAF8F5] last:border-0">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-3 w-32 bg-[#F0EDE8] rounded-[2px]" />
                </div>
                <div className="space-y-2 flex flex-col items-end">
                  <div className="h-4 w-16 bg-[#F0EDE8] rounded-[2px]" />
                  <div className="h-3 w-12 bg-[#F0EDE8] rounded-[2px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
