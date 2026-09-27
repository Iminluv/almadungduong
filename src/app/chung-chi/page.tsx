import { Metadata } from "next";
import ChungChiView from "./ChungChiView";

export const metadata: Metadata = {
  title: "Chứng Nhận & Kiểm Nghiệm Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng",
  description: "Minh bạch chứng nhận kiểm nghiệm Sở Y Tế, tiêu chuẩn an toàn cho dòng mỹ phẩm vi sinh và mỹ phẩm thiên nhiên Hoa Ngân.",
  alternates: {
    canonical: "https://almadungduong.com/chung-chi",
  },
  keywords: [
    "chứng nhận mỹ phẩm vi sinh",
    "kiểm nghiệm hoa ngân",
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm thiên nhiên an toàn",
  ],
};

export default function ChungChiPage() {
  return <ChungChiView />;
}
