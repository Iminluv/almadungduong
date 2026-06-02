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
      where: { slug },
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
    });
  } catch (error) {
    console.error(`Error fetching product details for slug ${slug}:`, error);
  }

  if (!dbProduct) {
    notFound();
  }

  const product = {
    ...dbProduct,
    category: dbProduct.category.parent ? dbProduct.category.parent.name : dbProduct.category.name,
    subcategory: dbProduct.category.parent ? dbProduct.category.name : null,
    flag: dbProduct.tags.map((t: any) => t.name).join('/ ') || null,
    features: [],
    skinConcerns: [],
    variants: [],
    images: dbProduct.images.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((img: any) => img.url),
    reviews: dbProduct.reviews,
  };

  return <ProductDetailView product={product} />;
}
