"use client";

import React, { useState } from "react";

interface ProductInlineEditorProps {
  productId: string;
  field: "isPublished" | "showOnHomepage" | "sortOrder";
  initialValue: boolean | number;
}

export default function ProductInlineEditor({
  productId,
  field,
  initialValue,
}: ProductInlineEditorProps) {
  const [val, setVal] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleChange = async (newVal: boolean) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: newVal }),
      });

      if (res.ok) {
        setVal(newVal);
      } else {
        alert("Cập nhật thuộc tính thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const parsedVal = parseInt(e.target.value, 10);
    if (isNaN(parsedVal) || parsedVal === val || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: parsedVal }),
      });

      if (res.ok) {
        setVal(parsedVal);
      } else {
        alert("Cập nhật số thứ tự thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  if (field === "sortOrder") {
    return (
      <input
        type="number"
        defaultValue={val as number}
        onBlur={handleNumberBlur}
        disabled={isLoading}
        className="w-16 text-center text-xs font-semibold font-mono bg-white border border-[#F0EDE8] py-1 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] transition-all disabled:bg-gray-50"
      />
    );
  }

  // Toggle switch/checkbox styling
  const isChecked = val as boolean;
  return (
    <button
      role="switch"
      aria-checked={isChecked}
      disabled={isLoading}
      onClick={() => handleToggleChange(!isChecked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A4331] disabled:opacity-50 ${
        isChecked ? "bg-[#1A4331]" : "bg-gray-200"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isChecked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
