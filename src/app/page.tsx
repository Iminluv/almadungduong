import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProductsFeatures } from "@/components/home/ProductsFeatures";
import { MicrobialScienceBanner } from "@/components/home/MicrobialScienceBanner";
import { MonthlyDeal } from "@/components/home/MonthlyDeal";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroCarousel />
      <TrustStrip />
      <ProductsFeatures />
      <MicrobialScienceBanner />
      <MonthlyDeal />
      <ProductCarousel products={products} title="Sản phẩm đề cử" />
    </main>
  );
}

