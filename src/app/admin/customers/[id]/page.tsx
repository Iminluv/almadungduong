import React from "react";
import { prisma } from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminCustomerDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch customer details, addresses, and order history
  const customer = await prisma.user.findUnique({
    where: { id },
    include: {
      loyaltyTier: true,
      addresses: true,
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!customer) {
    return (
      <div className="py-16 text-center font-sans space-y-4">
        <h2 className="text-xl font-bold text-[#1C1C1A]">Không tìm thấy khách hàng</h2>
        <p className="text-sm text-[#8A8680]">Khách hàng này không tồn tại trong hệ thống.</p>
        <Link
          href="/admin/customers"
          className="inline-block px-4 py-2 bg-[#1A4331] text-white text-xs font-semibold rounded-[2px]"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loyalty Progression calculation (thresholds matching seed and AccountView)
  const totalSpent = customer.totalSpent;
  let currentTierName = "Ươm mầm";
  let currentTierIcon = "🌱";
  let nextTierName = "Dung dưỡng";
  let nextTierIcon = "💧";
  let progress = 0;
  let remaining = 5000000 - totalSpent;
  let isMaxTier = false;

  if (totalSpent >= 5000000 && totalSpent < 10000000) {
    currentTierName = "Dung dưỡng";
    currentTierIcon = "💧";
    nextTierName = "Nở rộ";
    nextTierIcon = "🌸";
    progress = ((totalSpent - 5000000) / (10000000 - 5000000)) * 100;
    remaining = 10000000 - totalSpent;
  } else if (totalSpent >= 10000000) {
    currentTierName = "Nở rộ";
    currentTierIcon = "🌸";
    nextTierName = "";
    nextTierIcon = "";
    progress = 100;
    remaining = 0;
    isMaxTier = true;
  } else {
    // Under 5 million
    progress = (totalSpent / 5000000) * 100;
  }

  const breadcrumbItems = [
    { label: "Khách hàng", href: "/admin/customers" },
    { label: customer.name || customer.email },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#F0EDE8] gap-4">
        <div className="space-y-1">
          <AdminBreadcrumb items={breadcrumbItems} />
          <h2 className="text-2xl font-bold text-[#1C1C1A]">
            {customer.name || "Khách hàng không tên"}
          </h2>
        </div>
        <div className="text-xs text-[#8A8680]">
          ID Khách: <span className="font-bold text-[#1C1C1A] font-mono">{customer.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Loyalty, Addresses, Orders (span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loyalty Tier Progress Card */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#F0EDE8]">
              <h3 className="font-semibold text-sm text-[#1C1C1A]">Tiến trình thăng hạng hội viên</h3>
              <span className="text-xs text-[#8A8680] font-semibold bg-[#FAF8F5] px-2.5 py-1 rounded-[2px] border border-[#F0EDE8]">
                Tích lũy chi tiêu: <span className="text-[#1A4331] font-mono font-bold">{formatCurrency(totalSpent)}</span>
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#1C1C1A]">
                  Hiện tại: {currentTierIcon} {currentTierName}
                </span>
                {!isMaxTier && (
                  <span className="text-[#8A8680]">
                    Hạng kế tiếp: {nextTierIcon} {nextTierName}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-3 bg-[#FAF8F5] border border-[#F0EDE8] rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full bg-[#1A4331] rounded-full transition-all duration-500"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#8A8680]">
                <span>Mức chi tiêu hiện tại</span>
                {isMaxTier ? (
                  <span className="text-[#1A4331] font-bold">Thành viên ở hạng cao nhất!</span>
                ) : (
                  <span>
                    Cần chi tiêu thêm{" "}
                    <span className="font-bold text-[#1C1C1A] font-mono">{formatCurrency(remaining)}</span> để
                    thăng hạng
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Addresses list */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-3 border-b border-[#F0EDE8]">
              Danh sách địa chỉ giao hàng
            </h3>
            {customer.addresses.length === 0 ? (
              <p className="text-xs text-[#8A8680] text-center py-4">
                Khách hàng này chưa lưu địa chỉ giao hàng nào.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customer.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 border rounded-[2px] bg-[#FAF8F5] text-xs space-y-2 relative ${
                      addr.isDefault ? "border-[#1A4331] bg-green-50/10" : "border-[#F0EDE8]"
                    }`}
                  >
                    {addr.isDefault && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-bold text-white bg-[#1A4331] uppercase rounded-[2px]">
                        Mặc định
                      </span>
                    )}
                    <div className="font-semibold text-sm text-[#1C1C1A]">{addr.label}</div>
                    <div className="space-y-1">
                      <div className="text-[#1C1C1A] font-semibold">{addr.fullName}</div>
                      <div className="text-[#8A8680]">{addr.phone}</div>
                      <div className="text-[#8A8680] leading-relaxed">
                        {addr.street}, {addr.ward ? `${addr.ward}, ` : ""}{addr.district}, {addr.city}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order history table */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-semibold text-sm text-[#1C1C1A] pb-3 border-b border-[#F0EDE8]">
              Lịch sử mua hàng
            </h3>
            {customer.orders.length === 0 ? (
              <p className="text-xs text-[#8A8680] text-center py-4">
                Khách hàng này chưa thực hiện đơn đặt hàng nào.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F0EDE8] text-[#1C1C1A] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-4 rounded-l-[2px]">Mã đơn hàng</th>
                      <th className="py-2.5 px-4">Ngày đặt</th>
                      <th className="py-2.5 px-4">Tổng tiền</th>
                      <th className="py-2.5 px-4">Trạng thái</th>
                      <th className="py-2.5 px-4 text-right rounded-r-[2px]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EDE8]">
                    {customer.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-[#00347D]">
                          <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                            {order.transferCode}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-[#8A8680] font-mono">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#1C1C1A] font-mono">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-block px-2 py-1 bg-white border border-[#F0EDE8] hover:border-[#1A4331] hover:text-[#1A4331] font-semibold rounded-[2px] transition-colors"
                          >
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Customer Card */}
        <div className="space-y-6">
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] text-center space-y-4">
            {/* Avatar Profile */}
            <div className="mx-auto w-24 h-24 rounded-full bg-[#1A4331] border border-[#F0EDE8] text-white flex items-center justify-center text-3xl font-bold uppercase overflow-hidden shadow-inner">
              {customer.image ? (
                <img
                  src={getImageUrl(customer.image)}
                  alt={customer.name || customer.email}
                  className="object-cover w-full h-full"
                />
              ) : (
                customer.name ? customer.name[0] : customer.email[0]
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#1C1C1A]">
                {customer.name || "Chưa thiết lập tên"}
              </h3>
              <p className="text-xs text-[#8A8680] font-mono">{customer.email}</p>
            </div>

            <div className="pt-2 border-t border-[#F0EDE8] grid grid-cols-2 gap-4 text-left text-xs">
              <div>
                <span className="text-[#8A8680] block">Số điện thoại</span>
                <span className="font-semibold text-[#1C1C1A]">{customer.phone || "Chưa có SĐT"}</span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Hội viên</span>
                <span className="font-semibold text-[#1A4331]">
                  {currentTierIcon} {currentTierName}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#8A8680] block">Ngày tham gia hệ thống</span>
                <span className="font-semibold text-[#1C1C1A] font-mono">
                  {formatDate(customer.createdAt)}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#8A8680] block">Email xác thực</span>
                <span
                  className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded-[2px] uppercase mt-1 ${
                    customer.emailVerified
                      ? "bg-green-50 text-[#1A4331] border border-green-200"
                      : "bg-amber-50 text-[#D97706] border border-amber-200"
                  }`}
                >
                  {customer.emailVerified ? "Đã xác thực" : "Chưa xác thực"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
