import React from "react";
import { prisma } from "@/lib/db";
import DataTable from "@/components/admin/DataTable";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    tier?: string;
    search?: string;
  }>;
}

export default async function AdminCustomersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const tier = params.tier || "";
  const search = params.search || "";

  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  // Build query filter
  const where: any = {};
  if (tier) {
    where.loyaltyTier = { slug: tier };
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  // Fetch customers listing and count
  const [customers, totalItems, loyaltyTiers] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        loyaltyTier: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.user.count({ where }),
    prisma.loyaltyTier.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalItems / pageSize);

  // Formatting helpers
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
    });
  };

  // Loyalty Tier badge renderer
  const renderTierBadge = (customerTier: any) => {
    if (!customerTier) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-[2px] border border-green-200 bg-green-50 text-[#1A4331]">
          🌱 Ươm mầm
        </span>
      );
    }

    let colors = "border-green-200 bg-green-50 text-[#1A4331]";
    if (customerTier.slug === "dung-duong") {
      colors = "border-blue-200 bg-blue-50 text-[#00347D]";
    } else if (customerTier.slug === "no-ro") {
      colors = "border-pink-200 bg-pink-50 text-pink-700";
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-[2px] border ${colors}`}>
        <span>{customerTier.icon}</span>
        <span>{customerTier.name}</span>
      </span>
    );
  };

  const columns = [
    {
      header: "Khách hàng",
      accessorKey: "name",
      scopeRow: true,
      cell: (customer: any) => (
        <div>
          <Link
            href={`/admin/customers/${customer.id}`}
            className="font-bold text-[#00347D] hover:underline block"
          >
            {customer.name || "Khách hàng không tên"}
          </Link>
          <span className="text-[10px] text-[#8A8680] block font-mono">{customer.email}</span>
        </div>
      ),
    },
    {
      header: "Hạng hội viên",
      cell: (customer: any) => renderTierBadge(customer.loyaltyTier),
    },
    {
      header: "Tổng chi tiêu",
      cell: (customer: any) => (
        <span className="font-bold font-mono text-[#1C1C1A]">
          {formatCurrency(customer.totalSpent)}
        </span>
      ),
    },
    {
      header: "Đơn mua",
      cell: (customer: any) => (
        <span className="font-semibold text-xs text-[#1C1C1A] font-mono">
          {customer._count.orders} đơn
        </span>
      ),
    },
    {
      header: "Ngày tham gia",
      cell: (customer: any) => (
        <span className="text-xs text-[#8A8680] font-mono">
          {formatDate(customer.createdAt)}
        </span>
      ),
    },
    {
      header: "Thao tác",
      cell: (customer: any) => (
        <Link
          href={`/admin/customers/${customer.id}`}
          className="inline-flex items-center bg-[#FAF8F5] border border-[#F0EDE8] hover:border-[#1A4331] hover:text-[#1A4331] px-2.5 py-1 text-xs font-semibold rounded-[2px] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1A4331]"
        >
          Chi tiết
        </Link>
      ),
    },
  ];

  // Set filter option mapping
  const filterOptions = [
    { label: "Tất cả", value: "" },
    ...loyaltyTiers.map((t) => ({
      label: `${t.icon} ${t.name}`,
      value: t.slug,
    })),
  ];

  const breadcrumbItems = [{ label: "Khách hàng" }];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#F0EDE8] gap-4">
        <div className="space-y-1">
          <AdminBreadcrumb items={breadcrumbItems} />
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1A]">Quản lý khách hàng</h2>
        </div>
      </div>

      <div className="bg-white border border-[#F0EDE8] p-4 md:p-6 rounded-[2px]">
        <DataTable
          data={customers}
          columns={columns}
          searchParams={params}
          searchPlaceholder="Tìm kiếm tên, email, SĐT..."
          searchParamKey="search"
          filterParamKey="tier"
          filterOptions={filterOptions}
          pagination={{
            page,
            pageSize,
            totalItems,
            totalPages,
          }}
          emptyTitle="Chưa có khách hàng nào"
          emptyDescription="Không tìm thấy bản ghi khách hàng nào khớp với điều kiện tìm kiếm."
        />
      </div>
    </div>
  );
}
