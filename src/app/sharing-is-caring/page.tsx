import { Metadata } from "next";
import SharingView from "./SharingView";

export const metadata: Metadata = {
  title: "Sharing Is Caring — Hành trình của Lan",
  description: "Cùng Alma Dungduong lan tỏa những câu chuyện thật về phục hồi da và nhận quà tri ân.",
};

export default function SharingPage() {
  return <SharingView />;
}
