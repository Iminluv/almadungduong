import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import ProductDetailView from "./ProductDetailView";
import { notFound } from "next/navigation";
import { getImageUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let product: any = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { take: 1, orderBy: { sortOrder: "asc" } },
        category: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching product for metadata (${slug}):`, error);
  }

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại | Alma Dung Dưỡng",
      description: "Sản phẩm không tồn tại hoặc đã ngừng kinh doanh.",
    };
  }

  const title = `${product.title} — Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng`;
  const description =
    product.description && product.description.trim().length > 0
      ? product.description.slice(0, 155)
      : `${product.title} — Mỹ phẩm vi sinh Hoa Ngân và mỹ phẩm thiên nhiên chính hãng tại Alma Dung Dưỡng.`;
  const rawOgImage = product.images?.[0]?.url || product.image;
  const ogImageUrl = getImageUrl(rawOgImage);

  return {
    title,
    description,
    alternates: {
      canonical: `https://almadungduong.com/san-pham/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://almadungduong.com/san-pham/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 800,
          alt: `${product.title} — Mỹ phẩm Vi sinh Hoa Ngân`,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    keywords: [
      product.title,
      "mỹ phẩm vi sinh Hoa Ngân",
      "mỹ phẩm vi sinh",
      "mỹ phẩm thiên nhiên",
      product.category?.name || "chăm sóc da",
      "Alma Dung Dưỡng",
    ],
  };
}

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
    image: getImageUrl(dbProduct.image),
    images: dbProduct.images.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((img: any) => getImageUrl(img.url)),
    reviews: dbProduct.reviews,
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `${product.title} — Mỹ phẩm Vi sinh Hoa Ngân`,
    image: product.images.length > 0 ? product.images : [product.image],
    brand: {
      "@type": "Brand",
      name: "Hoa Ngân",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: product.price,
      availability: product.isPublished ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://almadungduong.com/san-pham/${product.slug}`,
    },
    ...(product.reviews && product.reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating || 5,
        reviewCount: product.reviewsCount || product.reviews.length,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://almadungduong.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sản phẩm",
        item: "https://almadungduong.com/san-pham",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `https://almadungduong.com/san-pham/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <ProductDetailView product={product} />
    </>
  );
}
