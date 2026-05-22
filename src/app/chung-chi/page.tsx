import { Metadata } from "next";
import ChungChiView from "./ChungChiView";

export const metadata: Metadata = {
  title: "Giấy Kiểm Nghiệm & Chứng Nhận Chất Lượng — Alma Dungduong",
  description: "Minh bạch hóa các giấy công bố sản phẩm từ Sở Y Tế, phiếu kết quả thử nghiệm không kích ứng và kiểm nghiệm chỉ số chống nắng theo tiêu chuẩn FDA.",
};

export default function ChungChiPage() {
  return <ChungChiView />;
}
