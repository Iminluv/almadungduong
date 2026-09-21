import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ContentProtectionProvider } from "@/components/providers/ContentProtectionProvider";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almadungduong.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Alma Dungduong | Mỹ phẩm Vi sinh Hoa Ngân",
    template: "%s | Alma Dungduong",
  },
  description: "Trải nghiệm mỹ phẩm vi sinh thiên nhiên Hoa Ngân tối giản, khoa học và hiệu quả cho làn da nguyên bản. Đồng hành cùng bạn tìm lại vẻ đẹp tự nhiên.",
  keywords: [
    "mỹ phẩm vi sinh Hoa Ngân",
    "mỹ phẩm vi sinh",
    "mỹ phẩm thiên nhiên",
    "alma dungduong",
    "chăm sóc da thảo dược",
    "phục hồi hệ vi sinh",
    "skincare thuần việt",
  ],
  openGraph: {
    title: "Alma Dungduong | Mỹ phẩm Vi sinh Hoa Ngân",
    description: "Giải pháp chăm sóc da chuyên sâu dựa trên triết lý hệ vi sinh và thảo dược bản địa.",
    url: "https://almadungduong.com",
    siteName: "Alma Dungduong",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mỹ phẩm Vi sinh Hoa Ngân — Alma Dung Dưỡng",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma Dungduong | Mỹ phẩm Vi sinh Hoa Ngân",
    description: "Giải pháp chăm sóc da chuyên sâu dựa trên triết lý hệ vi sinh và thảo dược bản địa.",
    images: ["/og-image.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alma Dung Dưỡng",
  alternateName: "Mỹ phẩm Vi sinh Hoa Ngân",
  url: "https://almadungduong.com",
  logo: "https://almadungduong.com/og-image.jpg",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta name="robots" content="noai, noimageai" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} ${cormorant.variable} antialiased bg-bg text-text font-body selection:bg-accent selection:text-white`}
      >
        <AuthProvider>
          <ContentProtectionProvider>
            <Header />
            <CartDrawer />
            <ToastNotification />
            <ChatWidget />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ContentProtectionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

