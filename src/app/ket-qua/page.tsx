import { Metadata } from "next";
import ResultsView from "./ResultsView";

export const metadata: Metadata = {
  title: "Kết Quả Thực Tế & Đánh Giá — Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng",
  description: "Khách hàng chia sẻ kết quả phục hồi da thực tế sau khi sử dụng mỹ phẩm vi sinh và mỹ phẩm thiên nhiên Hoa Ngân.",
  alternates: {
    canonical: "https://almadungduong.com/ket-qua",
  },
  keywords: [
    "kết quả mỹ phẩm vi sinh",
    "đánh giá mỹ phẩm hoa ngân",
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm thiên nhiên",
  ],
};

export default function ResultsPage() {
  return <ResultsView />;
}
