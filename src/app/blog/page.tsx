import { Metadata } from "next";
import BlogView from "./BlogView";

export const metadata: Metadata = {
  title: "Blog & Kiến thức Hệ Vi Sinh",
  description: "Chia sẻ kiến thức chuyên sâu về chăm sóc da hệ vi sinh, routine phục hồi và những câu chuyện thật từ khách hàng Alma Dungduong.",
};

export default function BlogPage() {
  return <BlogView />;
}
