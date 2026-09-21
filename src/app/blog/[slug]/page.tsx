import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import BlogDetailView from "./BlogDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | Alma Dung Dưỡng",
      description: "Bài viết không tồn tại hoặc đã được chuyển sang đường dẫn khác.",
    };
  }

  const title = `${post.title} — Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng`;
  const description = post.excerpt || `${post.title} — Kiến thức chăm sóc da hệ vi sinh cùng Alma Dung Dưỡng.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://almadungduong.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://almadungduong.com/blog/${slug}`,
      images: [
        {
          url: post.image,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ],
      locale: "vi_VN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },
    keywords: [
      post.title,
      post.category,
      "mỹ phẩm vi sinh Hoa Ngân",
      "mỹ phẩm vi sinh",
      "mỹ phẩm thiên nhiên",
      "chăm sóc da hệ vi sinh",
      "Alma Dung Dưỡng",
    ],
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    author: {
      "@type": "Organization",
      name: "Alma Dung Dưỡng",
      url: "https://almadungduong.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Alma Dung Dưỡng",
      logo: {
        "@type": "ImageObject",
        url: "https://almadungduong.com/og-image.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://almadungduong.com/blog/${slug}`,
    },
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
        name: "Blog & Kiến thức",
        item: "https://almadungduong.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://almadungduong.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <BlogDetailView post={post} />
    </>
  );
}
