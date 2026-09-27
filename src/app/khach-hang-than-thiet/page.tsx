import type { Metadata } from "next";
import LoyaltyView from "./LoyaltyView";

export const metadata: Metadata = {
  title: "Khách Hàng Thân Thiết | Alma Dung Dưỡng — Mỹ phẩm Vi sinh Hoa Ngân",
  description: "Chương trình ưu đãi và quyền lợi thành viên khi đồng hành cùng mỹ phẩm vi sinh Hoa Ngân và mỹ phẩm thiên nhiên Alma Dung Dưỡng.",
  alternates: {
    canonical: "https://almadungduong.com/khach-hang-than-thiet",
  },
  keywords: [
    "khách hàng thân thiết",
    "tích điểm hoa ngân",
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm thiên nhiên",
  ],
};

export default function LoyaltyPage() {
  return <LoyaltyView />;
}
