import React from "react";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  // Fetch categories to pass down to options selection
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  const breadcrumbItems = [
    { label: "Sản phẩm", href: "/admin/products" },
    { label: "Thêm sản phẩm" },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Breadcrumbs */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-1">
        <AdminBreadcrumb items={breadcrumbItems} />
        <h2 className="text-2xl font-bold text-[#1C1C1A]">Thêm sản phẩm mới</h2>
      </div>

      {/* Main product creation form */}
      <ProductForm categories={categories} />
    </div>
  );
}
