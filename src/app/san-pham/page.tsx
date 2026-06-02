import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent";
import { prisma } from "@/lib/db";

export const revalidate = 60;

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
    category: p.category.parent ? p.category.parent.name : p.category.name,
    subcategory: p.category.parent ? p.category.name : null,
    flag: p.tags.map((t: any) => t.name).join('/ ') || null,
    features: [],
    skinConcerns: [],
    variants: [],
    images: p.images.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((img: any) => img.url),
    reviews: p.reviews,
  }));

  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
