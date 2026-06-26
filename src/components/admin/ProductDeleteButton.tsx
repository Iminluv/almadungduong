"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductDeleteButtonProps {
  productId: string;
  productTitle: string;
}

export default function ProductDeleteButton({
  productId,
  productTitle,
}: ProductDeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn ngưng kích hoạt (ẩn) sản phẩm "${productTitle}"? Sản phẩm sẽ không hiển thị trên cửa hàng.`
    );
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Đã ngưng kích hoạt sản phẩm thành công!");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Thao tác thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="inline-flex items-center text-xs font-semibold px-2.5 py-1 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 rounded-[2px] transition-colors cursor-pointer disabled:opacity-50"
    >
      {isLoading ? "Đang ẩn..." : "Ẩn"}
    </button>
  );
}
