export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  skinConcerns: string[];
  variants?: string[];
}

export interface SkinConcern {
  id: string;
  label: string;
  count: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "xit-duong-vi-sinh",
    title: "Xịt Dưỡng Vi Sinh Hoa Ngân",
    category: "Khuyến mãi",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800&auto=format&fit=crop",
    price: 285000,
    originalPrice: 350000,
    rating: 4.8,
    reviewsCount: 256,
    description: "Cấp ẩm, phục hồi hệ vi sinh tự nhiên trên da nhờ chiết xuất thảo dược và lợi khuẩn.",
    features: ["Cân bằng pH", "Phục hồi hàng rào bảo vệ", "Dịu da tức thì"],
    skinConcerns: ["Da khô", "Da nhạy cảm", "Mụn & viêm"],
  },
  {
    id: "sua-rua-mat-vi-sinh",
    title: "Sữa Rửa Mặt Vi Sinh",
    category: "Mỹ phẩm vi sinh Hoa Ngân",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
    price: 250000,
    rating: 4.9,
    reviewsCount: 124,
    description: "Làm sạch sâu mà không gây khô da, duy trì độ ẩm tự nhiên.",
    features: ["Không Sulfate", "Làm sạch nhẹ nhàng", "Hỗ trợ lợi khuẩn"],
    skinConcerns: ["Dầu & mụn", "Lỗ chân lông to"],
  },
  {
    id: "kem-chong-nang-vi-sinh",
    title: "Kem Chống Nắng Vi Sinh",
    category: "Mỹ phẩm vi sinh Hoa Ngân",
    image: "https://images.unsplash.com/photo-1556228444-2457636e74fc?q=80&w=800&auto=format&fit=crop",
    price: 320000,
    originalPrice: 380000,
    rating: 4.7,
    reviewsCount: 89,
    description: "Bảo vệ da khỏi tia UV đồng thời nuôi dưỡng hệ vi sinh.",
    features: ["SPF 50+ PA++++", "Không bóng dầu", "Lên tone nhẹ"],
    skinConcerns: ["Sắc tố da", "Lão hóa"],
  },
  {
    id: "tinh-chat-vi-sinh",
    title: "Tinh Chất Vi Sinh Phục Hồi",
    category: "Mỹ phẩm vi sinh Hoa Ngân",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
    price: 450000,
    rating: 5.0,
    reviewsCount: 42,
    description: "Nồng độ lợi khuẩn cao giúp phục hồi da hư tổn nặng.",
    features: ["Siêu phục hồi", "Tăng cường miễn dịch da", "Chống lão hóa"],
    skinConcerns: ["Da yếu", "Sau điều trị", "Nếp nhăn"],
  },
];

export const skinConcerns: SkinConcern[] = [
  { id: "do-am", label: "Độ ẩm", count: 1, description: "Giải quyết tình trạng da khô, bong tróc và thiếu nước." },
  { id: "viem-mun", label: "Viêm & Mụn", count: 8, description: "Làm dịu sưng tấy, hỗ trợ kháng viêm và tiêu diệt vi khuẩn gây mụn." },
  { id: "da-nhay-cam", label: "Da nhạy cảm", count: 5, description: "Phục hồi rào cản tự nhiên, giảm kích ứng và mẩn đỏ." },
  { id: "sac-to-da", label: "Sắc tố da", count: 5, description: "Cải thiện vết thâm, nám và đều màu da." },
  { id: "lao-hoa", label: "Lão hóa", count: 4, description: "Tăng sinh collagen, giảm nếp nhăn và săn chắc da." },
];

export const categories = [
  "Khuyến mãi",
  "Mỹ phẩm vi sinh Hoa Ngân",
  "Dụng cụ làm đẹp",
  "Sản phẩm dưỡng sinh",
];

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "he-vi-sinh-la-gi",
    title: "Hệ vi sinh trên da: Lớp màng bảo vệ vô hình",
    category: "Kiến thức",
    excerpt: "Khám phá thế giới lợi khuẩn trên da và tại sao chúng lại quan trọng hơn bạn nghĩ.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800",
    date: "12/04/2026",
    readTime: "5 phút",
    content: "Nội dung chi tiết về hệ vi sinh..."
  },
  {
    id: "routine-cho-da-nhay-cam",
    title: "Lộ trình 3 bước cho làn da nhạy cảm",
    category: "Làm đẹp",
    excerpt: "Đơn giản hóa quy trình chăm sóc da để phục hồi hàng rào bảo vệ vững chắc.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    date: "10/04/2026",
    readTime: "7 phút",
    content: "Nội dung chi tiết về routine..."
  },
  {
    id: "thao-duoc-viet-nam",
    title: "Sức mạnh của thảo dược Việt Nam trong mỹ phẩm vi sinh",
    category: "Câu chuyện",
    excerpt: "Tại sao chúng tôi chọn nguyên liệu bản địa để kết hợp cùng công nghệ vi sinh hiện đại.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=800",
    date: "05/04/2026",
    readTime: "6 phút",
    content: "Nội dung chi tiết về thảo dược..."
  }
];

