import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProductsFeatures } from "@/components/home/ProductsFeatures";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <TrustStrip />
      <ProductsFeatures />
      
      {/* Featured Products Segment */}
      <section className="py-20 bg-bg">
        <div className="container-custom space-y-12">
          <div className="flex justify-between items-end border-b border-surface pb-8">
            <h2 className="text-2xl md:text-3xl font-display font-semibold uppercase tracking-tight">
              Sản phẩm đề cử
            </h2>
            <a href="/san-pham" className="text-sm font-medium underline underline-offset-4 hover:text-accent transition-colors">
              Tất cả sản phẩm →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviewsCount={product.reviewsCount}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

