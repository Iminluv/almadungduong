import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProductsFeatures } from "@/components/home/ProductsFeatures";
import { MonthlyDeal } from "@/components/home/MonthlyDeal";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { MicrobialHighlights } from "@/components/home/MicrobialHighlights";
import { Certifications } from "@/components/home/Certifications";
import { CustomerFeedback } from "@/components/home/CustomerFeedback";
import { prisma } from "@/lib/db";

export const revalidate = 60;

export default async function Home() {
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  } catch (error) {
    console.error("Error fetching products for Home page:", error);
  }

  const products = dbProducts.map((p: any) => ({
    ...p,
    features: [],
    skinConcerns: [],
    variants: [],
    images: [],
  }));

  return (
    <main className="flex flex-col">
      <HeroCarousel />
      <TrustStrip />
      <MicrobialHighlights />
      <ProductsFeatures />
      <MonthlyDeal products={products} />
      <Certifications />
      <ProductCarousel products={products} title="Gợi ý dành cho bạn" />
      <CustomerFeedback />
    </main>
  );
}
