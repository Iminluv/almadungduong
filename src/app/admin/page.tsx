import React from "react";
import { prisma } from "@/lib/db";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Simple Inline SVG Icons
const CashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125H3.75c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9.75v3m0 0v3m0-3h3m-3 0H9"
    />
  </svg>
);

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.59 0l4.318-4.317a1.125 1.125 0 000-1.591L9.581 4.66a2.25 2.25 0 00-1.591-.659zm-2.443 4.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
    />
  </svg>
);

export default async function AdminDashboardPage() {
  // Define time frames
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  // 1. Fetch total revenue (completed orders)
  const revenueAggregate = await prisma.order.aggregate({
    where: { status: "completed" },
    _sum: {
      totalAmount: true,
    },
  });
  const totalRevenue = revenueAggregate._sum.totalAmount || 0;

  // rolling revenue calculations (current 7 days vs previous 7 days)
  const currentOrders = await prisma.order.findMany({
    where: {
      status: "completed",
      completedAt: { gte: sevenDaysAgo },
    },
    select: { totalAmount: true },
  });
  const currentRevenue = currentOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const previousOrders = await prisma.order.findMany({
    where: {
      status: "completed",
      completedAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo },
    },
    select: { totalAmount: true },
  });
  const previousRevenue = previousOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  let revenueGrowth = 0;
  if (previousRevenue > 0) {
    revenueGrowth = Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100);
  } else if (currentRevenue > 0) {
    revenueGrowth = 100;
  }

  // 2. Fetch order counts
  const ordersGrouped = await prisma.order.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const orderCounts = {
    pending: 0,
    completed: 0,
    expired: 0,
    total: 0,
  };

  ordersGrouped.forEach((group) => {
    const status = group.status.toLowerCase();
    const count = group._count.id;
    if (status === "pending") orderCounts.pending = count;
    else if (status === "completed") orderCounts.completed = count;
    else if (status === "expired") orderCounts.expired = count;
  });
  orderCounts.total = orderCounts.pending + orderCounts.completed + orderCounts.expired;

  // rolling orders growth
  const currentOrderCount = await prisma.order.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });
  const previousOrderCount = await prisma.order.count({
    where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } },
  });

  let ordersGrowth = 0;
  if (previousOrderCount > 0) {
    ordersGrowth = Math.round(((currentOrderCount - previousOrderCount) / previousOrderCount) * 100);
  } else if (currentOrderCount > 0) {
    ordersGrowth = 100;
  }

  // 3. Fetch customer (user) counts
  const userCount = await prisma.user.count();
  const newCustomersCurrent = await prisma.user.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });
  const newCustomersPrevious = await prisma.user.count({
    where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } },
  });

  let customersGrowth = 0;
  if (newCustomersPrevious > 0) {
    customersGrowth = Math.round(((newCustomersCurrent - newCustomersPrevious) / newCustomersPrevious) * 100);
  } else if (newCustomersCurrent > 0) {
    customersGrowth = 100;
  }

  // 4. Fetch product counts
  const totalProducts = await prisma.product.count();
  const publishedProducts = await prisma.product.count({
    where: { isPublished: true },
  });

  // 5. Fetch recent 5 orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // 6. Calculate daily revenue array for last 7 days
  const completedOrdersLast7Days = await prisma.order.findMany({
    where: {
      status: "completed",
      completedAt: { gte: sevenDaysAgo },
    },
    select: {
      totalAmount: true,
      completedAt: true,
      createdAt: true,
    },
  });

  const dailyRevenueMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
    dailyRevenueMap[dateStr] = 0;
  }

  completedOrdersLast7Days.forEach((order) => {
    const date = order.completedAt || order.createdAt;
    const dateStr = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
    if (dateStr in dailyRevenueMap) {
      dailyRevenueMap[dateStr] += order.totalAmount;
    }
  });

  const dailyRevenue = Object.entries(dailyRevenueMap).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  const maxRevenue = Math.max(...dailyRevenue.map((d) => d.revenue), 1);

  // Format Helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-[#F0EDE8] gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1A]">Tổng quan</h2>
          <p className="text-xs text-[#8A8680] mt-1">
            Số liệu thống kê bán hàng và vận hành của Alma Dungduong
          </p>
        </div>
        <div className="text-xs text-[#8A8680] font-medium bg-white px-3 py-1.5 border border-[#F0EDE8] rounded-[2px] self-start sm:self-auto">
          Cập nhật: {new Date().toLocaleDateString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Tổng doanh thu"
          value={formatCurrency(totalRevenue)}
          icon={<CashIcon />}
          delta={{ pct: revenueGrowth, label: "So với 7 ngày trước" }}
          href="/admin/orders?status=completed"
        />
        <StatCard
          label="Tổng số đơn hàng"
          value={`${orderCounts.total} đơn`}
          icon={<BagIcon />}
          delta={{ pct: ordersGrowth, label: "So với 7 ngày trước" }}
          href="/admin/orders"
        />
        <StatCard
          label="Tổng số khách hàng"
          value={`${userCount} người`}
          icon={<UsersIcon />}
          delta={{ pct: customersGrowth, label: "So với 7 ngày trước" }}
          href="/admin/customers"
        />
        <StatCard
          label="Sản phẩm hoạt động"
          value={`${publishedProducts}/${totalProducts}`}
          icon={<TagIcon />}
          href="/admin/products"
        />
      </div>

      {/* Analytics Grid: Trend + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue trend (CSS bar chart) */}
        <div className="lg:col-span-2 bg-white border border-[#F0EDE8] p-6 rounded-[2px] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EDE8]">
            <div>
              <h3 className="font-semibold text-sm text-[#1C1C1A]">Xu hướng doanh thu</h3>
              <p className="text-[11px] text-[#8A8680]">Doanh thu từ đơn hàng hoàn thành trong 7 ngày gần đây</p>
            </div>
            <span className="text-xs font-semibold text-[#1A4331] bg-green-50 px-2 py-1 rounded-[2px]">
              + {formatCurrency(currentRevenue)} / tuần
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-8 relative">
            {dailyRevenue.map((day, idx) => {
              const heightPercent = maxRevenue > 0 ? (day.revenue / maxRevenue) * 80 : 0;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end relative">
                  {/* Tooltip */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#1C1C1A] text-white text-[10px] font-mono font-bold py-1 px-1.5 rounded-[2px] absolute bottom-full mb-1 pointer-events-none z-15 whitespace-nowrap shadow-sm">
                    {formatCurrency(day.revenue)}
                  </span>
                  {/* Bar */}
                  <div
                    style={{ height: `${Math.max(heightPercent, 2)}%` }}
                    className={`w-full rounded-t-[2px] transition-all duration-300 ${
                      day.revenue > 0 ? "bg-[#1A4331] hover:bg-[#1A4331]/90" : "bg-[#F0EDE8]"
                    }`}
                  />
                  {/* Label */}
                  <span className="text-[10px] font-semibold text-[#8A8680] mt-2 font-mono">
                    {day.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders Mini-List */}
        <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EDE8] mb-4">
            <div>
              <h3 className="font-semibold text-sm text-[#1C1C1A]">Đơn hàng mới</h3>
              <p className="text-[11px] text-[#8A8680]">5 đơn hàng vừa được thiết lập gần đây</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#00347D] hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="flex-1 divide-y divide-[#FAF8F5]">
            {recentOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#8A8680]">
                Chưa có đơn hàng nào được ghi nhận.
              </div>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-bold text-[#1C1C1A] hover:text-[#00347D] hover:underline block truncate"
                    >
                      {order.transferCode}
                    </Link>
                    <span className="text-[10px] text-[#8A8680] block truncate">
                      {order.user?.name || "Khách vãng lai"} ({order.user?.email || "không có email"})
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="font-bold text-[#1C1C1A] font-mono">
                      {formatCurrency(order.totalAmount)}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
