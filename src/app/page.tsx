import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProductsFeatures } from "@/components/home/ProductsFeatures";
import { MonthlyDeal } from "@/components/home/MonthlyDeal";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { MicrobialHighlights } from "@/components/home/MicrobialHighlights";
import { Certifications } from "@/components/home/Certifications";
import { CustomerFeedback } from "@/components/home/CustomerFeedback";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroCarousel />
      <TrustStrip />
      <MicrobialHighlights />
      <ProductsFeatures />
      <MonthlyDeal />
      <Certifications />
      <ProductCarousel products={products} title="Gợi ý dành cho bạn" />
      <CustomerFeedback />
    </main>
  );
}
