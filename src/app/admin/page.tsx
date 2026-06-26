import React from "react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1A]">Tổng quan</h2>
      </div>
      <div className="p-6 bg-white border border-[#F0EDE8] rounded-[2px]">
        <p className="text-sm text-[#8A8680]">
          Chào mừng bạn đến với trang quản trị Alma Dungduong. Vui lòng chọn một mục ở thanh bên để bắt đầu quản lý.
        </p>
      </div>
    </div>
  );
}
