import React from "react";
import { prisma } from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import MarkCompletedButton from "@/components/admin/MarkCompletedButton";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch full order details
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          totalSpent: true,
          loyaltyTier: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <div className="py-16 text-center font-sans space-y-4">
        <h2 className="text-xl font-bold text-[#1C1C1A]">Không tìm thấy đơn hàng</h2>
        <p className="text-sm text-[#8A8680]">Đơn hàng với mã ID này không tồn tại trong hệ thống.</p>
        <Link
          href="/admin/orders"
          className="inline-block px-4 py-2 bg-[#1A4331] text-white text-xs font-semibold rounded-[2px]"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  // Fetch matched webhook logs for audit trails
  const webhookLogs = await prisma.webhookLog.findMany({
    where: {
      OR: [
        { matchedOrderId: id },
        {
          payload: {
            path: ["description"],
            equals: order.transferCode,
          },
        },
      ],
    },
    orderBy: { receivedAt: "desc" },
  });

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

  const breadcrumbItems = [
    { label: "Đơn hàng", href: "/admin/orders" },
    { label: order.transferCode },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#F0EDE8] gap-4">
        <div className="space-y-1">
          <AdminBreadcrumb items={breadcrumbItems} />
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-[#1C1C1A]">{order.transferCode}</h2>
            <StatusBadge status={order.status} />
          </div>
        </div>
        <div className="text-xs text-[#8A8680]">
          Lập lúc: <span className="font-bold text-[#1C1C1A] font-mono">{formatDate(order.createdAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Items list & Webhook logs (span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line items list */}
          <div className="bg-white border border-[#F0EDE8] rounded-[2px] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F0EDE8] bg-[#FAF8F5]">
              <h3 className="font-semibold text-sm text-[#1C1C1A]">Sản phẩm đã đặt</h3>
            </div>
            <div className="divide-y divide-[#F0EDE8]">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-start gap-4">
                  <div className="relative w-16 h-16 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px] flex-shrink-0 overflow-hidden">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[#1C1C1A] truncate">
                      {item.title}
                    </h4>
                    {item.variant && (
                      <span className="inline-block text-[10px] text-[#8A8680] bg-[#FAF8F5] px-1.5 py-0.5 rounded-[2px] mt-1">
                        Dung tích: {item.variant}
                      </span>
                    )}
                    <div className="text-xs text-[#8A8680] mt-2">
                      Số lượng: <span className="font-bold text-[#1C1C1A] font-mono">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-sm text-[#1C1C1A] font-mono">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                    <div className="text-[10px] text-[#8A8680] mt-1 font-mono">
                      Đơn giá: {formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Footer */}
            <div className="p-6 bg-[#FAF8F5] border-t border-[#F0EDE8] space-y-2 text-sm text-right">
              <div className="flex justify-between items-center text-[#8A8680]">
                <span>Tạm tính</span>
                <span className="font-medium font-mono text-[#1C1C1A]">{formatCurrency(order.amount)}</span>
              </div>
              <div className="flex justify-between items-center text-[#8A8680]">
                <span>Phí vận chuyển</span>
                <span className="font-medium font-mono text-[#1C1C1A]">{formatCurrency(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between items-center text-[#1C1C1A] font-bold text-base pt-2 border-t border-[#F0EDE8]">
                <span>Tổng tiền thanh toán</span>
                <span className="text-[#1A4331] font-mono">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Webhook log details */}
          <div className="bg-white border border-[#F0EDE8] rounded-[2px] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F0EDE8] bg-[#FAF8F5]">
              <h3 className="font-semibold text-sm text-[#1C1C1A]">Nhật ký đối soát thanh toán (SePay Webhook)</h3>
            </div>
            <div className="p-6">
              {webhookLogs.length === 0 ? (
                <p className="text-xs text-[#8A8680] text-center py-4">
                  Chưa ghi nhận dữ liệu webhook nào khớp với mã chuyển khoản này.
                </p>
              ) : (
                <div className="space-y-4">
                  {webhookLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 border border-[#F0EDE8] rounded-[2px] bg-[#FAF8F5] space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[#8A8680]">ID: {log.id}</span>
                        <span className="text-[10px] text-[#8A8680] font-mono">
                          {formatDate(log.receivedAt)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#1C1C1A]">Trạng thái đối soát:</span>
                        <span
                          className={`px-1.5 py-0.5 text-[10px] rounded-[2px] font-bold uppercase ${
                            log.status === "processed"
                              ? "bg-green-50 text-[#1A4331]"
                              : "bg-amber-50 text-[#D97706]"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                      <details className="mt-2 group">
                        <summary className="text-[11px] font-semibold text-[#00347D] cursor-pointer hover:underline outline-none">
                          Xem chi tiết Payload nhận được
                        </summary>
                        <pre className="mt-2 p-3 bg-[#1C1C1A] text-green-400 font-mono text-[10px] rounded-[2px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Customer, Payment, Manual action (span 1) */}
        <div className="space-y-6">
          {/* Operations Actions */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-bold text-sm text-[#1C1C1A] uppercase tracking-wider pb-2 border-b border-[#F0EDE8]">
              Thao tác vận hành
            </h3>
            {order.status === "completed" ? (
              <div className="p-3 bg-green-50 border border-green-200 text-[#1A4331] text-xs font-semibold rounded-[2px] text-center">
                Đơn hàng này đã được thanh toán hoàn thành.
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#8A8680] leading-relaxed">
                  Nếu khách hàng đã chuyển khoản thành công nhưng hệ thống SePay gặp sự cố hoặc đối soát không khớp, bạn có thể thực hiện hoàn thành thủ công tại đây:
                </p>
                <MarkCompletedButton orderId={order.id} isDisabled={order.status !== "pending"} />
              </div>
            )}
          </div>

          {/* Customer profile card */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-bold text-sm text-[#1C1C1A] uppercase tracking-wider pb-2 border-b border-[#F0EDE8]">
              Thông tin khách hàng
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#8A8680] block">Tên tài khoản</span>
                <span className="font-semibold text-[#1C1C1A]">
                  {order.user?.name || "Khách vãng lai"}
                </span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Email liên hệ</span>
                {order.user ? (
                  <Link
                    href={`/admin/customers/${order.user.id}`}
                    className="font-semibold text-[#00347D] hover:underline"
                  >
                    {order.user.email}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#1C1C1A]">{order.shippingEmail}</span>
                )}
              </div>
              <div>
                <span className="text-[#8A8680] block">Hạng thành viên</span>
                <span className="font-semibold text-[#1A4331]">
                  {order.user?.loyaltyTier?.icon} {order.user?.loyaltyTier?.name || "Ươm mầm (Mặc định)"}
                </span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Số điện thoại</span>
                <span className="font-semibold text-[#1C1C1A]">{order.shippingPhone}</span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Địa chỉ giao hàng</span>
                <span className="font-semibold text-[#1C1C1A] leading-relaxed">
                  {order.shippingAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Payment snapshot */}
          <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px] space-y-4">
            <h3 className="font-bold text-sm text-[#1C1C1A] uppercase tracking-wider pb-2 border-b border-[#F0EDE8]">
              Thông tin thanh toán
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#8A8680] block">Ngân hàng</span>
                <span className="font-semibold text-[#1C1C1A]">{order.bankName}</span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Số tài khoản nhận</span>
                <span className="font-semibold text-[#1C1C1A] font-mono">{order.bankAccount}</span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Chủ tài khoản nhận</span>
                <span className="font-semibold text-[#1C1C1A]">{order.accountName}</span>
              </div>
              <div>
                <span className="text-[#8A8680] block">Nội dung chuyển khoản (Mã)</span>
                <span className="font-bold text-[#1C1C1A] font-mono bg-[#FAF8F5] border border-[#F0EDE8] px-2 py-0.5 rounded-[2px]">
                  {order.transferCode}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-[#8A8680] block mb-2">Mã QR Thanh toán</span>
                <div className="relative w-32 h-32 mx-auto border border-[#F0EDE8] rounded-[2px] overflow-hidden bg-white p-1">
                  <img
                    src={order.qrUrl}
                    alt="QR Code thanh toán"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
