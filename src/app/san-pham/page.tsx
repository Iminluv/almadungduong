import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function ProductsPage() {
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  } catch (error) {
    console.error("Error fetching products for Products page:", error);
  }

  const products = dbProducts.map((p: any) => ({
    ...p,
    features: [],
    skinConcerns: [],
    variants: [],
    images: [],
  }));

  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
