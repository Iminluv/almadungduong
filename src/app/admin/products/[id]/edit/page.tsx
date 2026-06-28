import React from "react";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditProductPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch categories and product data in parallel
  const [categories, product] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.product.findUnique({
      where: { id },
      include: {
        tags: {
          select: { name: true },
        },
        images: {
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            url: true,
            sortOrder: true,
          },
        },
      },
    }),
  ]);

  if (!product) {
    return (
      <div className="py-16 text-center font-sans space-y-4">
        <h2 className="text-xl font-bold text-[#1C1C1A]">Không tìm thấy sản phẩm</h2>
        <p className="text-sm text-[#8A8680]">Sản phẩm cần chỉnh sửa không tồn tại hoặc đã bị xóa.</p>
        <Link
          href="/admin/products"
          className="inline-block px-4 py-2 bg-[#1A4331] text-white text-xs font-semibold rounded-[2px]"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Sản phẩm", href: "/admin/products" },
    { label: `Sửa: ${product.title}` },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Breadcrumbs */}
      <div className="pb-4 border-b border-[#F0EDE8] space-y-1">
        <AdminBreadcrumb items={breadcrumbItems} />
        <h2 className="text-2xl font-bold text-[#1C1C1A]">Chỉnh sửa sản phẩm</h2>
      </div>

      {/* Main product editing form */}
      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
