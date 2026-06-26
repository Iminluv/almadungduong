import React from "react";

type StatusType = "pending" | "completed" | "expired";

interface StatusBadgeProps {
  status: StatusType | string;
}

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L10 8.94l3.47-3.47a.75.75 0 111.06 1.06L11.06 10l3.47 3.47a.75.75 0 11-1.06 1.06L10 11.06l-3.47 3.47a.75.75 0 11-1.06-1.06L8.94 10 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const STATUS_CONFIG = {
  pending: {
    label: "Chờ thanh toán",
    Icon: ClockIcon,
    className: "text-[#D97706] bg-amber-50 border-amber-200",
  },
  completed: {
    label: "Hoàn thành",
    Icon: CheckIcon,
    className: "text-[#1A4331] bg-green-50 border-green-200",
  },
  expired: {
    label: "Hết hạn",
    Icon: XIcon,
    className: "text-[#6B7280] bg-gray-100 border-gray-200",
  },
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normStatus = (status?.toLowerCase() || "pending") as StatusType;
  const config = STATUS_CONFIG[normStatus] || STATUS_CONFIG.pending;
  const Icon = config.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-[2px] border ${config.className}`}
    >
      <Icon aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
}
