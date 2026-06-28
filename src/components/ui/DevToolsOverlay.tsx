"use client";

import React from "react";

export function DevToolsOverlay() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg/85 backdrop-blur-lg animate-fade-in">
      <div className="max-w-md w-full mx-4 p-8 md:p-10 bg-white border border-surface rounded-[4px] shadow-xl text-center">
        {/* Warning Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-accent font-semibold tracking-tight mb-4">
          BẢO VỆ BẢN QUYỀN
        </h2>
        
        <p className="text-sm md:text-base text-text/80 leading-relaxed mb-6">
          Hệ thống phát hiện Trình duyệt Nhà phát triển (Developer Tools) đang mở. 
          Vui lòng đóng Trình duyệt Nhà phát triển để tiếp tục trải nghiệm mua sắm an toàn trên Alma Dungduong.
        </p>

        <div className="text-[11px] uppercase tracking-wider text-muted font-medium">
          ALMA DUNGDUONG · HÂN HẠNH ĐỒNG HÀNH CÙNG LÀN DA BẠN
        </div>
      </div>
    </div>
  );
}
