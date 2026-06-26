import React from "react";
import { prisma } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  // Fetch active configurations, shipping rates, and webhook logs in parallel
  const [shippingRate, loyaltyConfigs, webhookLogs] = await Promise.all([
    prisma.shippingRate.findFirst({
      where: { zone: { code: "VN" } },
      select: {
        id: true,
        name: true,
        baseFee: true,
        freeThreshold: true,
      },
    }),
    prisma.loyaltyConfig.findMany({
      orderBy: { key: "asc" },
      select: {
        key: true,
        value: true,
      },
    }),
    prisma.webhookLog.findMany({
      take: 50,
      orderBy: { receivedAt: "desc" },
    }),
  ]);

  const breadcrumbItems = [{ label: "Cài đặt" }];

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Breadcrumbs */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-1">
        <AdminBreadcrumb items={breadcrumbItems} />
        <h2 className="text-2xl font-bold text-[#1C1C1A]">Cấu hình hệ thống</h2>
      </div>

      {/* Main settings tabs manager form */}
      <SettingsForm
        shippingRate={shippingRate}
        loyaltyConfigs={loyaltyConfigs}
        webhookLogs={webhookLogs}
      />
    </div>
  );
}
