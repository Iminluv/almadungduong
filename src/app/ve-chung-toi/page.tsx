import { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  title: "Về Alma Dungduong — Tâm huyết & Sứ mệnh",
  description: "Tìm hiểu về hành trình 20 năm nghiên cứu hệ vi sinh và triết lý làm đẹp bền vững của Alma Dungduong.",
};

export default function AboutPage() {
  return <AboutView />;
}
