import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent";
import { prisma } from "@/lib/db";
import { getImageUrl } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mỹ phẩm Vi sinh Hoa Ngân — Toàn Bộ Sản Phẩm | Alma Dung Dưỡng",
  description:
    "Khám phá bộ sưu tập mỹ phẩm vi sinh Hoa Ngân và mỹ phẩm thiên nhiên chính hãng: nước dưỡng, serum phục hồi và kem dưỡng cân bằng hệ vi sinh da.",
  alternates: {
    canonical: "https://almadungduong.com/san-pham",
  },
  keywords: [
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm vi sinh",
    "mỹ phẩm thiên nhiên",
    "serum vi sinh",
    "kem dưỡng vi sinh",
    "alma dung dưỡng",
  ],
  openGraph: {
    title: "Mỹ phẩm Vi sinh Hoa Ngân — Toàn Bộ Sản Phẩm | Alma Dung Dưỡng",
    description:
      "Khám phá bộ sưu tập mỹ phẩm vi sinh Hoa Ngân và mỹ phẩm thiên nhiên chính hãng: nước dưỡng, serum phục hồi và kem dưỡng cân bằng hệ vi sinh da.",
    url: "https://almadungduong.com/san-pham",
    type: "website",
  },
};

export default async function ProductsPage() {
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        tags: true,
        images: true,
        reviews: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  } catch (error) {
    console.error("Error fetching products for Products page:", error);
  }

  const products = dbProducts.map((p: any) => ({
    ...p,
    image: getImageUrl(p.image),
    category: p.category.parent ? p.category.parent.name : p.category.name,
    subcategory: p.category.parent ? p.category.name : null,
    flag: p.tags.map((t: any) => t.name).join('/ ') || null,
    features: [],
    skinConcerns: [],
    variants: [],
    images: p.images.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((img: any) => getImageUrl(img.url)),
    reviews: p.reviews,
  }));

  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
