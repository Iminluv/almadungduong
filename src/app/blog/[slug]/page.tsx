import { Metadata } from "next";
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
        title: "Không tìm thấy bài viết",
     };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
       title: post.title,
       description: post.excerpt,
       images: [post.image],
    }
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return notFound();
  }

  return <BlogDetailView />;
}
