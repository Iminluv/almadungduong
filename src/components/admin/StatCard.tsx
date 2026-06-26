import React from "react";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  delta?: { pct: number; label: string };
  isLoading?: boolean;
  href?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  delta,
  isLoading = false,
  href,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Đang tải dữ liệu..."
        className="animate-pulse bg-white border border-[#F0EDE8] p-5 rounded-[2px] space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="h-5 w-5 bg-[#F0EDE8] rounded" />
          <div className="h-4 w-16 bg-[#F0EDE8] rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-7 w-32 bg-[#F0EDE8] rounded" />
          <div className="h-4 w-24 bg-[#F0EDE8] rounded" />
        </div>
      </div>
    );
  }

  const renderDelta = () => {
    if (!delta) return null;
    const { pct, label: deltaLabel } = delta;

    let textColor = "text-[#8A8680] bg-[#F0EDE8]";
    let arrow = "→";

    if (pct > 0) {
      textColor = "text-[#1A4331] bg-green-50";
      arrow = "↑";
    } else if (pct < 0) {
      textColor = "text-red-600 bg-red-50";
      arrow = "↓";
    }

    return (
      <span
        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-xs font-semibold ${textColor}`}
        title={deltaLabel}
      >
        <span>{arrow}</span>
        <span>{Math.abs(pct)}%</span>
      </span>
    );
  };

  const content = (
    <div className="bg-white border border-[#F0EDE8] p-5 rounded-[2px] transition-all duration-150 flex flex-col justify-between h-full hover:border-[#1A4331]">
      <div className="flex items-center justify-between">
        <div className="text-[#8A8680] p-1.5 bg-[#FAF8F5] rounded-[2px]">
          {icon}
        </div>
        {renderDelta()}
      </div>
      <div className="mt-4">
        <span className="block text-2xl font-bold font-mono text-[#1C1C1A]">
          {value}
        </span>
        <span className="block text-xs font-sans text-[#8A8680] mt-1">
          {label}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A4331]"
      >
        {content}
      </Link>
    );
  }

  return content;
}
