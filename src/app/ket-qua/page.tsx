import { Metadata } from "next";
import ResultsView from "./ResultsView";

export const metadata: Metadata = {
  title: "Kết quả điều trị & Testimonials",
  description: "Minh chứng thực tế cho hiệu quả của mỹ phẩm vi sinh qua những thay đổi rõ rệt trên làn da khách hàng.",
};

export default function ResultsPage() {
  return <ResultsView />;
}
