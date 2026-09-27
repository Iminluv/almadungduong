import { Metadata } from "next";
import BlogView from "./BlogView";

export const metadata: Metadata = {
  title: "Blog Kiến Thức Mỹ phẩm Vi sinh & Thiên Nhiên | Alma Dung Dưỡng",
  description: "Cập nhật kiến thức chuyên sâu về chăm sóc da hệ vi sinh, routine phục hồi da mụn nhạy cảm từ mỹ phẩm thiên nhiên Hoa Ngân.",
  alternates: {
    canonical: "https://almadungduong.com/blog",
  },
  keywords: [
    "blog mỹ phẩm vi sinh",
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm thiên nhiên",
    "chăm sóc da hệ vi sinh",
    "kiến thức skincare",
  ],
};

export default function BlogPage() {
  return <BlogView />;
}
