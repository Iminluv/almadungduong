import React from "react";
import { prisma } from "@/lib/db";
import DataTable from "@/components/admin/DataTable";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import ProductInlineEditor from "@/components/admin/ProductInlineEditor";
import ProductDeleteButton from "@/components/admin/ProductDeleteButton";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    published?: string;
    search?: string;
  }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const category = params.category || "";
  const published = params.published || "";
  const search = params.search || "";

  const pageSize = 15;
  const skip = (page - 1) * pageSize;

  // Build query where clause
  const where: any = {};
  if (category) {
    where.category = {
      OR: [
        { id: category },
        { slug: category },
      ],
    };
  }

  if (published === "true") {
    where.isPublished = true;
  } else if (published === "false") {
    where.isPublished = false;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { tagline: { contains: search, mode: "insensitive" } },
      { englishName: { contains: search, mode: "insensitive" } },
    ];
  }

  // Fetch products, categories count, and listing
  const [products, totalItems, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { sortOrder: "asc" },
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
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

  // DataTable column definitions
  const columns = [
    {
      header: "Hình ảnh",
      cell: (product: any) => (
        <div className="w-10 h-10 bg-[#FAF8F5] border border-[#F0EDE8] rounded-[2px] overflow-hidden flex-shrink-0 relative">
          <img
            src={getImageUrl(product.image)}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },
    {
      header: "Tên sản phẩm",
      accessorKey: "title",
      scopeRow: true,
      cell: (product: any) => (
        <div className="max-w-[200px] md:max-w-xs">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="font-bold text-[#00347D] hover:underline block truncate"
            title={product.title}
          >
            {product.title}
          </Link>
          <span className="text-[10px] text-[#8A8680] block truncate">
            {product.englishName || product.tagline || "Không có tên phụ"}
          </span>
        </div>
      ),
    },
    {
      header: "Danh mục",
      cell: (product: any) => (
        <span className="text-xs font-semibold text-[#1C1C1A]">
          {product.category?.name}
        </span>
      ),
    },
    {
      header: "Giá bán",
      cell: (product: any) => (
        <div className="font-mono">
          <div className="font-bold text-[#1C1C1A]">{formatCurrency(product.price)}</div>
          {product.originalPrice && (
            <div className="text-[10px] text-[#8A8680] line-through">
              {formatCurrency(product.originalPrice)}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Sắp xếp",
      cell: (product: any) => (
        <ProductInlineEditor
          productId={product.id}
          field="sortOrder"
          initialValue={product.sortOrder}
        />
      ),
    },
    {
      header: "Trang chủ",
      cell: (product: any) => (
        <ProductInlineEditor
          productId={product.id}
          field="showOnHomepage"
          initialValue={product.showOnHomepage}
        />
      ),
    },
    {
      header: "Bán",
      cell: (product: any) => (
        <ProductInlineEditor
          productId={product.id}
          field="isPublished"
          initialValue={product.isPublished}
        />
      ),
    },
    {
      header: "Thao tác",
      cell: (product: any) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="inline-flex items-center bg-[#FAF8F5] border border-[#F0EDE8] hover:border-[#1A4331] hover:text-[#1A4331] px-2 py-1 text-xs font-semibold rounded-[2px] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#1A4331]"
          >
            Sửa
          </Link>
          <ProductDeleteButton productId={product.id} productTitle={product.title} />
        </div>
      ),
    },
  ];

  // Tab filter choices
  const filterOptions = [
    { label: "Tất cả", value: "" },
    { label: "Hoạt động", value: "true" },
    { label: "Ngừng hoạt động", value: "false" },
  ];

  const breadcrumbItems = [{ label: "Sản phẩm" }];

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#F0EDE8] gap-4">
        <div className="space-y-1">
          <AdminBreadcrumb items={breadcrumbItems} />
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1A]">Quản lý sản phẩm</h2>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center bg-[#1A4331] hover:bg-[#1A4331]/90 border border-[#1A4331] px-4 py-2 text-xs font-bold text-white rounded-[2px] transition-colors uppercase tracking-wider self-start sm:self-auto shadow-sm cursor-pointer"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      {/* Main product box */}
      <div className="bg-white border border-[#F0EDE8] p-4 md:p-6 rounded-[2px] space-y-4">
        {/* Sub-Filters: Category Selector Form */}
        <div className="flex items-center justify-between pb-2 border-b border-[#FAF8F5]">
          <form method="GET" className="flex items-center gap-3">
            {/* Retain search and published options inside form fields */}
            {search && <input type="hidden" name="search" value={search} />}
            {published && <input type="hidden" name="published" value={published} />}

            <select
              name="category"
              defaultValue={category}
              className="bg-white border border-[#F0EDE8] px-3 py-1.5 text-xs font-semibold rounded-[2px] text-[#8A8680] focus:outline-none focus:border-[#1A4331] focus:ring-1 focus:ring-[#1A4331] cursor-pointer"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold bg-[#FAF8F5] border border-[#F0EDE8] hover:border-[#1A4331] hover:text-[#1A4331] rounded-[2px] cursor-pointer transition-all"
            >
              Lọc danh mục
            </button>
          </form>
        </div>

        {/* DataTable */}
        <DataTable
          data={products}
          columns={columns}
          searchParams={params}
          searchPlaceholder="Tìm tên sản phẩm, tên tiếng Anh..."
          searchParamKey="search"
          filterParamKey="published"
          filterOptions={filterOptions}
          pagination={{
            page,
            pageSize,
            totalItems,
            totalPages,
          }}
          emptyTitle="Chưa có sản phẩm nào"
          emptyDescription="Không tìm thấy bản ghi sản phẩm nào khớp với điều kiện lọc."
        />
      </div>
    </div>
  );
}
