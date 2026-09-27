import { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  title: "Về Chúng Tôi — Mỹ phẩm Vi sinh Hoa Ngân | Alma Dung Dưỡng",
  description: "Khám phá hành trình nghiên cứu mỹ phẩm vi sinh Hoa Ngân và triết lý dung dưỡng làn da từ mỹ phẩm thiên nhiên bản địa bền vững.",
  alternates: {
    canonical: "https://almadungduong.com/ve-chung-toi",
  },
  keywords: [
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm vi sinh",
    "mỹ phẩm thiên nhiên",
    "về alma dung dưỡng",
  ],
};

export default function AboutPage() {
  return <AboutView />;
}
