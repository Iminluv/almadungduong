import React from "react";
import Link from "next/link";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: string;
  scopeRow?: boolean;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchParams?: Record<string, string | string[] | undefined>;
  searchPlaceholder?: string;
  searchParamKey?: string;
  filterParamKey?: string;
  filterOptions?: FilterOption[];
  pagination?: PaginationInfo;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function DataTable<T>({
  data,
  columns,
  searchParams = {},
  searchPlaceholder = "Tìm kiếm...",
  searchParamKey = "search",
  filterParamKey = "status",
  filterOptions,
  pagination,
  emptyTitle = "Không có dữ liệu",
  emptyDescription = "Chưa có bản ghi nào được ghi nhận.",
}: DataTableProps<T>) {
  // Normalize searchParams to Record<string, string>
  const currentParams: Record<string, string> = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      currentParams[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      currentParams[key] = value[0];
    }
  });

  const currentSearch = currentParams[searchParamKey] || "";
  const currentFilter = currentParams[filterParamKey] || "";

  // Helper to build page URL
  const buildPageUrl = (pNum: number) => {
    const merged = { ...currentParams, page: pNum.toString() };
    const urlParams = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) urlParams.set(k, v);
    });
    return `?${urlParams.toString()}`;
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Toolbar (Search + Filters) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {searchPlaceholder && (
          <form method="GET" className="relative flex-1 max-w-sm">
            {/* Retain other parameters like active filters, resetting page to 1 */}
            {Object.entries(currentParams).map(([key, val]) => {
              if (key !== searchParamKey && key !== "page") {
                return <input key={key} type="hidden" name={key} value={val} />;
              }
              return null;
            })}
            <input
              type="text"
              name={searchParamKey}
              defaultValue={currentSearch}
              placeholder={searchPlaceholder}
              className="w-full text-xs bg-white border border-[#F0EDE8] rounded-[2px] pl-10 pr-4 py-2.5 text-[#1C1C1A] placeholder-[#8A8680] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8680]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <button type="submit" className="sr-only">
              Tìm kiếm
            </button>
          </form>
        )}

        {/* Filter Tabs */}
        {filterOptions && filterOptions.length > 0 && (
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Bộ lọc">
            {filterOptions.map((opt) => {
              const isActive = currentFilter === opt.value;

              // Build URL to update filters and reset page to 1
              const merged = { ...currentParams, [filterParamKey]: opt.value, page: "1" };
              const urlParams = new URLSearchParams();
              Object.entries(merged).forEach(([k, v]) => {
                if (v) urlParams.set(k, v);
              });
              const href = `?${urlParams.toString()}`;

              return (
                <Link
                  key={opt.value}
                  href={href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[2px] border transition-all duration-150 ${
                    isActive
                      ? "bg-[#1A4331] border-[#1A4331] text-white"
                      : "bg-white border-[#F0EDE8] text-[#8A8680] hover:text-[#1C1C1A] hover:bg-[#FAF8F5]"
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#F0EDE8] rounded-[2px] overflow-hidden">
        <table className="w-full text-left border-collapse block md:table">
          <thead className="hidden md:table-header-group bg-[#F0EDE8] text-[11px] font-semibold text-[#1C1C1A] uppercase tracking-wider sticky top-0 z-10">
            <tr className="md:table-row">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`py-3.5 px-6 font-semibold ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group divide-y divide-[#F0EDE8]">
            {data.length === 0 ? (
              <tr className="block md:table-row">
                <td
                  colSpan={columns.length}
                  className="py-16 px-6 text-center block md:table-cell"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-10 w-10 text-[#8A8680]"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <p className="text-sm font-semibold text-[#1C1C1A]">{emptyTitle}</p>
                    <p className="text-xs text-[#8A8680]">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="block md:table-row hover:bg-[#FAF8F5]/50 transition-colors md:border-none p-4 md:p-0 border-b border-[#F0EDE8]"
                >
                  {columns.map((col, colIdx) => {
                    const cellContent = col.cell
                      ? col.cell(item)
                      : (item[col.accessorKey as keyof T] as React.ReactNode);

                    if (col.scopeRow) {
                      return (
                        <th
                          key={colIdx}
                          scope="row"
                          data-label={col.header}
                          className={`block md:table-cell py-1.5 md:py-4 px-0 md:px-6 text-sm font-semibold text-[#1C1C1A] before:content-[attr(data-label)] before:block before:md:hidden before:text-[10px] before:text-[#8A8680] before:uppercase before:font-bold ${
                            col.className || ""
                          }`}
                        >
                          {cellContent}
                        </th>
                      );
                    }

                    return (
                      <td
                        key={colIdx}
                        data-label={col.header}
                        className={`block md:table-cell py-1.5 md:py-4 px-0 md:px-6 text-sm text-[#1C1C1A] before:content-[attr(data-label)] before:block before:md:hidden before:text-[10px] before:text-[#8A8680] before:uppercase before:font-bold ${
                          col.className || ""
                        }`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#F0EDE8] pt-4">
          <p className="text-xs text-[#8A8680]">
            Hiển thị <span className="font-semibold text-[#1C1C1A]">{(pagination.page - 1) * pagination.pageSize + 1}</span>–
            <span className="font-semibold text-[#1C1C1A]">
              {Math.min(pagination.page * pagination.pageSize, pagination.totalItems)}
            </span>{" "}
            trong <span className="font-semibold text-[#1C1C1A]">{pagination.totalItems}</span> kết quả
          </p>
          <nav aria-label="Phân trang" className="flex items-center space-x-1">
            {/* Prev Button */}
            {pagination.page === 1 ? (
              <span className="p-1.5 rounded-[2px] border bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </span>
            ) : (
              <Link
                href={buildPageUrl(pagination.page - 1)}
                className="p-1.5 rounded-[2px] border border-[#F0EDE8] bg-white text-[#1C1C1A] hover:bg-[#FAF8F5] transition-colors"
                aria-label="Trang trước"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </Link>
            )}

            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pNum) => {
              const isCurrent = pagination.page === pNum;
              return isCurrent ? (
                <span
                  key={pNum}
                  aria-current="page"
                  className="px-3 py-1.5 text-xs font-semibold rounded-[2px] border bg-[#1A4331] border-[#1A4331] text-white"
                >
                  {pNum}
                </span>
              ) : (
                <Link
                  key={pNum}
                  href={buildPageUrl(pNum)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-[2px] border border-[#F0EDE8] bg-white text-[#8A8680] hover:text-[#1C1C1A] hover:bg-[#FAF8F5] transition-colors"
                >
                  {pNum}
                </Link>
              );
            })}

            {/* Next Button */}
            {pagination.page === pagination.totalPages ? (
              <span className="p-1.5 rounded-[2px] border bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            ) : (
              <Link
                href={buildPageUrl(pagination.page + 1)}
                className="p-1.5 rounded-[2px] border border-[#F0EDE8] bg-white text-[#1C1C1A] hover:bg-[#FAF8F5] transition-colors"
                aria-label="Trang sau"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
