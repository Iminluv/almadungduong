import { prisma } from "@/lib/db";
import ProductDetailView from "./ProductDetailView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true }
    });
    return products.map((product: any) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug }
    });
  } catch (error) {
    console.error(`Error fetching product details for slug ${slug}:`, error);
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
