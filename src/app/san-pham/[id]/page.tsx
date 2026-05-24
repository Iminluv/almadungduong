import { prisma } from "@/lib/db";
import ProductDetailView from "./ProductDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true }
  });
  return products.map((product: any) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const dbProduct = await prisma.product.findUnique({
    where: { id }
  });

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
