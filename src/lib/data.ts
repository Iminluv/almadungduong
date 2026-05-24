export interface Product {
  id: string;
  title: string;
  englishName?: string | null;
  category: string;
  flag?: string | null;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewsCount: number;
  description: string;
  fullDescription?: string | null;
  ingredients?: string | null;
  certifications?: string | null;
  usage?: string | null;
  volume?: string | null;
  gift?: string | null;
  features?: string[];
  skinConcerns?: string[];
  variants?: string[] | null;
  tagline?: string | null;
  subcategory?: string | null;
}

export interface SkinConcern {
  id: string;
  label: string;
  count: number;
  description: string;
}


export const skinConcerns: SkinConcern[] = [
  { id: "phuc-hoi", label: "Phục hồi", count: 8, description: "Phục hồi làn da mỏng yếu, tổn thương do hóa chất hoặc môi trường." },
  { id: "da-mun", label: "Da mụn", count: 12, description: "Kháng viêm, gom nhân mụn và ngăn ngừa mụn tái phát." },
  { id: "lao-hoa", label: "Lão hóa", count: 6, description: "Cải thiện nếp nhăn, tăng độ đàn hồi và làm đều màu da." },
  { id: "da-nhay-cam", label: "Da nhạy cảm", count: 10, description: "Dịu da tức thì, giảm mẩn đỏ và tăng cường hàng rào bảo vệ." },
];

export const categories = [
  "Khuyến mãi",
  "Mỹ phẩm vi sinh Hoa Ngân",
  "Dụng cụ làm đẹp",
  "Sản phẩm dưỡng sinh",
];

export interface SkinConcernGroup {
  id: string;
  label: string;
  count: number;
  issues: string[];
}

export const skinConcernGroups: SkinConcernGroup[] = [
  { id: "do-am", label: "Độ ẩm", count: 4, issues: ["Da khô, bong tróc", "Da tiết dầu do thiếu ẩm (oil imbalance)", "Lỗ chân lông to do mất nước", "Da xỉn màu, thiếu sức sống"] },
  { id: "viem-mun", label: "Viêm mụn", count: 8, issues: ["Bóng nhờn, tắc nghẽn lỗ chân lông", "Mụn cám, mụn đầu đen", "Mụn viêm nhẹ, viêm nang, bọc mủ", "Mụn ẩn", "Viêm nang lông", "Viêm da tiếp xúc, dị ứng", "Viêm da tiết bã", "Bệnh lý gây mụn khác (dậy thì, nội tiết,...)"] },
  { id: "da-nhay-cam", label: "Da nhạy cảm", count: 5, issues: ["Da mỏng yếu", "Đỏ da", "Giãn mao mạch", "Nhạy cảm cơ địa", "Kích ứng da"] },
  { id: "sac-to-da", label: "Sắc tố da", count: 7, issues: ["Sạm da", "Da không đều màu", "Thâm mụn", "Tàn nhang, đồi mồi", "Nám", "Rám da / Tăng sắc tố do đi nắng / Sử dụng lột tẩy,...", "Da bị sạm do dùng kem trộn / mỹ phẩm kém chất lượng / corticoid,..."] },
  { id: "lao-hoa-da", label: "Lão hóa da", count: 4, issues: ["Dày sừng, lỗ chân lông to, giãn cấu trúc bề mặt", "Nếp nhăn li ti, Nếp nhăn sâu", "Lão hóa Collagen/Elastin", "Lão hóa cơ, kém săn chắc (Chảy xệ)"] },
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
    id: "he-vi-sinh-va-mun",
    title: "Hệ vi sinh trên da là gì? Vì sao mất cân bằng gây mụn?",
    category: "Kiến thức",
    excerpt: "Hiểu rõ về 'hàng xóm' vi khuẩn trên da để có lộ trình trị mụn đúng đắn.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800",
    date: "26/04/2026",
    readTime: "6 phút",
    content: "Làn da chúng ta không chỉ có tế bào da..."
  },
  {
    id: "phan-biet-probiotic",
    title: "Phân biệt: Probiotic – Prebiotic – Postbiotic",
    category: "Skincare",
    excerpt: "Ba khái niệm cốt lõi trong mỹ phẩm vi sinh mà mọi tín đồ làm đẹp cần biết.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    date: "24/04/2026",
    readTime: "5 phút",
    content: "Trong những năm gần đây, mỹ phẩm vi sinh..."
  },
  {
    id: "soi-da-hieu-qua",
    title: "Soi da: Chìa khóa xác định mỹ phẩm có thực sự tác dụng",
    category: "Kiến thức",
    excerpt: "Tại sao bạn cần soi da định kỳ để đánh giá sự thay đổi của tầng sâu biểu bì.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=800",
    date: "22/04/2026",
    readTime: "7 phút",
    content: "Không thể đánh giá da chỉ bằng mắt thường..."
  },
  {
    id: "peel-da-sinh-hoc",
    title: "Peel da sinh học khác gì với peel da hóa học?",
    category: "Phục hồi",
    excerpt: "Lựa chọn phương pháp tái tạo da an toàn mà không gây bào mòn hay mỏng da.",
    image: "https://images.unsplash.com/photo-1556228444-7164923f1489?q=80&w=800",
    date: "20/04/2026",
    readTime: "8 phút",
    content: "Cơ chế của peel da sinh học là..."
  },
  {
    id: "skincare-bim-sua",
    title: "Hướng dẫn Skincare tối giản cho mẹ bỉm",
    category: "Lối sống",
    excerpt: "Cách duy trì làn da rạng rỡ chỉ với 5 phút mỗi ngày cho các mẹ bận rộn.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800",
    date: "18/04/2026",
    readTime: "4 phút",
    content: "Làm mẹ là hành trình tuyệt vời nhưng bận rộn..."
  }
];

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase?: boolean;
}

export const allReviews: Review[] = [
  {
    id: "rev-1",
    userName: "Huyền My",
    rating: 5,
    comment: "Sản phẩm xịt dưỡng Miracle thực sự cứu lấy làn da mỏng yếu của mình. Cảm ơn Alma!",
    date: "15/04/2026",
    isVerifiedPurchase: true
  },
  {
    id: "rev-2",
    userName: "Quốc Khánh",
    rating: 5,
    comment: "Guasha rất chất lượng, đá cầm nặng tay và rất mát. Dùng xong thấy mặt nhẹ hẳn.",
    date: "12/04/2026",
    isVerifiedPurchase: true
  },
  {
    id: "rev-3",
    userName: "Lan Anh",
    rating: 4,
    comment: "Mật ong hoa hồng thơm, dễ uống. Sữa rửa mặt Glacier dùng rất thích, không khô da.",
    date: "10/04/2026",
    isVerifiedPurchase: true
  }
];
