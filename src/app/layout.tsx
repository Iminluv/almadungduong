import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { ChatWidget } from "@/components/layout/ChatWidget";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alma Dungduong | Mỹ phẩm Vi sinh Hoa Ngân",
    template: "%s | Alma Dungduong"
  },
  description: "Trải nghiệm mỹ phẩm vi sinh tối giản, khoa học và hiệu quả cho làn da nguyên bản. Đồng hành cùng bạn tìm lại vẻ đẹp tự nhiên.",
  keywords: ["mỹ phẩm vi sinh", "alma dungduong", "chăm sóc da thảo dược", "phục hồi hệ vi sinh", "skincare thuần việt"],
  openGraph: {
    title: "Alma Dungduong | Mỹ phẩm Vi sinh Hoa Ngân",
    description: "Giải pháp chăm sóc da chuyên sâu dựa trên triết lý hệ vi sinh và thảo dược bản địa.",
    url: "https://almadungduong.vn",
    siteName: "Alma Dungduong",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma Dungduong",
    description: "Mỹ phẩm Vi sinh Hoa Ngân",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased bg-bg text-text font-body selection:bg-accent selection:text-white`}
      >
        <Header />
        <CartDrawer />
        <ToastNotification />
        <ChatWidget />
        <main className="min-h-screen pt-[64px] md:pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
