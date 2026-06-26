"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

interface ShippingRate {
  id: string;
  name: string;
  baseFee: number;
  freeThreshold?: number | null;
}

interface LoyaltyConfig {
  key: string;
  value: string;
}

interface WebhookLog {
  id: string;
  sepayId: number;
  source: string;
  payload: any;
  status: string;
  matchedOrderId?: string | null;
  receivedAt: string | Date;
  processedAt?: string | Date | null;
}

interface SettingsFormProps {
  shippingRate: ShippingRate | null;
  loyaltyConfigs: LoyaltyConfig[];
  webhookLogs: WebhookLog[];
}

const CONFIG_LABELS: Record<string, string> = {
  hero_text: "Tiêu đề trang hội viên (Hero Title)",
  hero_subtext: "Phụ đề ngắn biểu ngữ (Hero Subtitle)",
  hero_description: "Nội dung giới thiệu chi tiết (Hero Description)",
  exchange_rate: "Cơ chế tích lũy & đổi giọt (Exchange Rate Rules)",
  closing_quote: "Câu danh ngôn đúc kết chân trang (Closing Quote)",
  closing_description: "Thông điệp đúc kết chân trang (Closing Description)",
};

type TabType = "shipping" | "loyalty" | "webhooks";

export default function SettingsForm({
  shippingRate,
  loyaltyConfigs,
  webhookLogs,
}: SettingsFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("shipping");
  const [isLoading, setIsLoading] = useState(false);

  // Shipping form state
  const [baseFee, setBaseFee] = useState(shippingRate?.baseFee.toString() || "30000");
  const [freeThreshold, setFreeThreshold] = useState(
    shippingRate?.freeThreshold !== undefined && shippingRate?.freeThreshold !== null
      ? shippingRate.freeThreshold.toString()
      : ""
  );

  // Loyalty configs state
  const [configsState, setConfigsState] = useState<Record<string, string>>(
    loyaltyConfigs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
  );

  const handleConfigChange = (key: string, val: string) => {
    setConfigsState((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // Submit shipping settings
  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/settings/shipping", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseFee: parseInt(baseFee, 10) || 0,
          freeThreshold: freeThreshold ? parseInt(freeThreshold, 10) : null,
        }),
      });

      if (res.ok) {
        alert("Đã cập nhật cấu hình phí vận chuyển thành công!");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Cập nhật phí vận chuyển thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit loyalty configs
  const handleLoyaltySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const configsArray = Object.entries(configsState).map(([key, value]) => ({
      key,
      value,
    }));

    try {
      const res = await fetch("/api/admin/settings/loyalty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ configs: configsArray }),
      });

      if (res.ok) {
        alert("Đã lưu các thay đổi cấu hình chương trình hội viên thành công!");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Cập nhật cấu hình hội viên thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr: string | Date) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const TABS = [
    { id: "shipping", label: "Phí vận chuyển" },
    { id: "loyalty", label: "Chương trình hội viên" },
    { id: "webhooks", label: "Nhật ký Webhooks" },
  ] as const;

  return (
    <div className="space-y-6 font-sans">
      {/* Navigation tabs */}
      <div className="border-b border-[#F0EDE8]">
        <nav className="flex space-x-6" aria-label="Cài đặt">
          {TABS.map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer focus:outline-none ${
                  isCurrent
                    ? "border-[#1A4331] text-[#1A4331]"
                    : "border-transparent text-[#8A8680] hover:text-[#1C1C1A]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab contents */}
      <div className="bg-white border border-[#F0EDE8] p-6 rounded-[2px]">
        {/* Shipping Rate form tab */}
        {activeTab === "shipping" && (
          <form onSubmit={handleShippingSubmit} className="space-y-6 max-w-xl">
            <h3 className="text-sm font-bold text-[#1C1C1A] uppercase tracking-wider pb-2 border-b border-[#F0EDE8]">
              Cấu hình phí vận chuyển (Vùng quốc gia VN)
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">
                  Phí vận chuyển cơ bản (VND) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={baseFee}
                  onChange={(e) => setBaseFee(e.target.value)}
                  placeholder="Ví dụ: 30000"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1C1C1A]">
                  Ngưỡng miễn phí vận chuyển (VND - Bỏ trống nếu không áp dụng)
                </label>
                <input
                  type="number"
                  value={freeThreshold}
                  onChange={(e) => setFreeThreshold(e.target.value)}
                  placeholder="Ví dụ: 1000000"
                  className="w-full text-xs bg-white border border-[#F0EDE8] px-3 py-2 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] font-mono"
                />
                <p className="text-[10px] text-[#8A8680] mt-1">
                  Đơn hàng có tổng tiền sản phẩm vượt quá hoặc bằng mức này sẽ được miễn phí giao hàng.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 text-xs font-bold text-white rounded-[2px] border transition-colors uppercase tracking-wider cursor-pointer ${
                  isLoading
                    ? "bg-[#1A4331]/70 border-[#1A4331] cursor-wait"
                    : "bg-[#1A4331] border-[#1A4331] hover:bg-[#1A4331]/90"
                }`}
              >
                {isLoading ? "Đang lưu..." : "Cập nhật phí"}
              </button>
            </div>
          </form>
        )}

        {/* Loyalty configs form tab */}
        {activeTab === "loyalty" && (
          <form onSubmit={handleLoyaltySubmit} className="space-y-6">
            <h3 className="text-sm font-bold text-[#1C1C1A] uppercase tracking-wider pb-2 border-b border-[#F0EDE8]">
              Cấu hình nội dung & tỷ lệ chương trình Hội viên
            </h3>
            <div className="space-y-4">
              {loyaltyConfigs.map((config) => (
                <div key={config.key} className="space-y-1 flex flex-col">
                  <label className="text-xs font-semibold text-[#1C1C1A]">
                    {CONFIG_LABELS[config.key] || config.key}
                  </label>
                  <textarea
                    value={configsState[config.key] || ""}
                    onChange={(e) => handleConfigChange(config.key, e.target.value)}
                    rows={config.key.includes("description") || config.key.includes("subtext") ? 4 : 2}
                    className="w-full text-xs bg-white border border-[#F0EDE8] p-3 rounded-[2px] text-[#1C1C1A] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] resize-none"
                    placeholder="Nhập nội dung cấu hình..."
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 text-xs font-bold text-white rounded-[2px] border transition-colors uppercase tracking-wider cursor-pointer ${
                  isLoading
                    ? "bg-[#1A4331]/70 border-[#1A4331] cursor-wait"
                    : "bg-[#1A4331] border-[#1A4331] hover:bg-[#1A4331]/90"
                }`}
              >
                {isLoading ? "Đang lưu..." : "Lưu các cấu hình"}
              </button>
            </div>
          </form>
        )}

        {/* Webhooks logs audit tab */}
        {activeTab === "webhooks" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#F0EDE8]">
              <h3 className="text-sm font-bold text-[#1C1C1A] uppercase tracking-wider">
                Nhật ký webhook giao dịch (50 sự kiện gần nhất)
              </h3>
            </div>

            {webhookLogs.length === 0 ? (
              <p className="text-xs text-[#8A8680] text-center py-8">
                Chưa nhận được giao dịch webhook nào từ cổng thanh toán.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F0EDE8] text-[#1C1C1A] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-4 rounded-l-[2px]">Log ID</th>
                      <th className="py-2.5 px-4">SePay ID</th>
                      <th className="py-2.5 px-4">Thời gian</th>
                      <th className="py-2.5 px-4">Trạng thái đối soát</th>
                      <th className="py-2.5 px-4">Đơn hàng khớp</th>
                      <th className="py-2.5 px-4 text-right rounded-r-[2px]">Nội dung JSON</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EDE8]">
                    {webhookLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                        <td className="py-3 px-4 font-mono text-[#8A8680] select-all">
                          {log.id}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#1C1C1A] font-mono">
                          {log.sepayId}
                        </td>
                        <td className="py-3 px-4 text-[#8A8680] font-mono">
                          {formatDate(log.receivedAt)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] ${
                              log.status === "processed"
                                ? "bg-green-50 text-[#1A4331] border border-green-200"
                                : log.status === "received"
                                ? "bg-blue-50 text-[#00347D] border border-blue-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {log.matchedOrderId ? (
                            <Link
                              href={`/admin/orders/${log.matchedOrderId}`}
                              className="font-bold text-[#00347D] hover:underline"
                            >
                              Chi tiết đơn
                            </Link>
                          ) : (
                            <span className="text-[#8A8680]">Không có khớp</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <details className="inline-block text-left group">
                            <summary className="text-[11px] font-semibold text-[#00347D] cursor-pointer hover:underline outline-none">
                              Xem Payload
                            </summary>
                            <pre className="absolute right-6 mt-2 p-4 bg-[#1C1C1A] text-green-400 font-mono text-[10px] rounded-[2px] overflow-x-auto max-w-md max-h-60 z-20 shadow-lg border border-[#FAF8F5]/10 whitespace-pre-wrap leading-relaxed">
                              {JSON.stringify(log.payload, null, 2)}
                            </pre>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
