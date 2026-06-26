import React from "react";
import { prisma } from "@/lib/db";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const status = params.status || "";
  const search = params.search || "";

  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  // Build Prisma query filter
  const where: any = {};
  if (status) {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { transferCode: { contains: search, mode: "insensitive" } },
      { shippingName: { contains: search, mode: "insensitive" } },
      { shippingPhone: { contains: search, mode: "insensitive" } },
      {
        user: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  // Fetch orders count and page listings
  const [orders, totalItems] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(totalItems / pageSize);

  // Formatting Helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // DataTable column definitions
  const columns = [
    {
      header: "Mã giao dịch",
      accessorKey: "transferCode",
      scopeRow: true,
      cell: (order: any) => (
        <Link
          href={`/admin/orders/${order.id}`}
          className="font-bold text-[#00347D] hover:underline"
        >
          {order.transferCode}
        </Link>
      ),
    },
    {
      header: "Người mua",
      cell: (order: any) => (
        <div>
          <div className="font-semibold text-[#1C1C1A]">
            {order.shippingName || order.user?.name || "Khách vãng lai"}
          </div>
          <div className="text-[10px] text-[#8A8680]">
            {order.shippingPhone || "Không có SĐT"}
          </div>
        </div>
      ),
    },
    {
      header: "Ngày lập",
      cell: (order: any) => (
        <span className="text-xs text-[#8A8680] font-mono">
          {formatDate(order.createdAt)}
        </span>
      ),
    },
    {
      header: "Tổng tiền",
      cell: (order: any) => (
        <span className="font-bold font-mono text-[#1C1C1A]">
          {formatCurrency(order.totalAmount)}
        </span>
      ),
    },
    {
      header: "Trạng thái",
      cell: (order: any) => <StatusBadge status={order.status} />,
    },
    {
      header: "Thao tác",
      cell: (order: any) => (
        <Link
          href={`/admin/orders/${order.id}`}
          className="inline-flex items-center bg-[#FAF8F5] border border-[#F0EDE8] hover:border-[#1A4331] hover:text-[#1A4331] px-2.5 py-1 text-xs font-semibold rounded-[2px] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1A4331]"
        >
          Chi tiết
        </Link>
      ),
    },
  ];

  const filterOptions = [
    { label: "Tất cả", value: "" },
    { label: "Chờ thanh toán", value: "pending" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Hết hạn", value: "expired" },
  ];

  const breadcrumbItems = [{ label: "Đơn hàng" }];

  return (
    <div className="space-y-6 font-sans">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#F0EDE8] gap-4">
        <div className="space-y-1">
          <AdminBreadcrumb items={breadcrumbItems} />
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1A]">Quản lý đơn hàng</h2>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#F0EDE8] p-4 md:p-6 rounded-[2px]">
        <DataTable
          data={orders}
          columns={columns}
          searchPlaceholder="Tìm mã giao dịch, tên, SĐT..."
          searchParamKey="search"
          filterParamKey="status"
          filterOptions={filterOptions}
          pagination={{
            page,
            pageSize,
            totalItems,
            totalPages,
          }}
          emptyTitle="Chưa tìm thấy đơn hàng nào"
          emptyDescription="Không tìm thấy bản ghi đơn hàng nào khớp với bộ lọc hiện tại."
        />
      </div>
    </div>
  );
}
