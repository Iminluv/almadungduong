import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <nav aria-label="Đường dẫn" className="flex">
      <ol role="list" className="flex items-center space-x-2 text-xs md:text-sm font-sans">
        <li>
          <Link
            href="/admin"
            className="text-[#8A8680] hover:text-[#1C1C1A] transition-colors duration-150"
          >
            Tổng quan
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-[#8A8680] select-none">
                /
              </li>
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="text-[#1C1C1A] font-medium"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#8A8680] hover:text-[#1C1C1A] transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
