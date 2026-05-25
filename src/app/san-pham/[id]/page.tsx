import { prisma } from "@/lib/db";
import ProductDetailView from "./ProductDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true }
    });
    return products.map((product: any) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error(`Error fetching product details for ID ${id}:`, error);
  }

  if (!dbProduct) {
    notFound();
  }

  const product = {
    ...dbProduct,
    features: [],
    skinConcerns: [],
    variants: [],
    images: [],
  };

  return <ProductDetailView product={product} />;
}
