"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface MarkCompletedButtonProps {
  orderId: string;
  isDisabled: boolean;
}

export default function MarkCompletedButton({ orderId, isDisabled }: MarkCompletedButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMarkCompleted = async () => {
    if (isDisabled) return;
    const confirmed = window.confirm(
      "Xác nhận hoàn thành đơn hàng này thủ công? Việc này sẽ ghi nhận doanh thu và cộng chi tiêu tích lũy cho khách hàng."
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đơn hàng đã được đánh dấu hoàn thành thành công!");
        router.refresh();
      } else {
        alert(data.error || "Thao tác cập nhật đơn hàng thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối mạng hoặc máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleMarkCompleted}
      disabled={isDisabled || isLoading}
      className={`px-4 py-2 text-xs font-bold rounded-[2px] border text-white transition-all uppercase tracking-wider cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isDisabled
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : isLoading
          ? "bg-[#1A4331]/70 border-[#1A4331] cursor-wait"
          : "bg-[#1A4331] border-[#1A4331] hover:bg-[#1A4331]/90 focus-visible:outline-[#1A4331]"
      }`}
    >
      {isLoading ? "Đang xử lý..." : "Đánh dấu là đã thanh toán"}
    </button>
  );
}
