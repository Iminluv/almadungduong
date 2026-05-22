import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/70 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-display font-bold text-xl tracking-tight text-white block">ALMA DUNGDUONG</span>
              <span className="text-xs tracking-[0.12em] uppercase opacity-60">Dung dưỡng làn da khỏe mạnh từ bên trong</span>
            </div>

            <p className="font-serif italic text-lg text-white/60 max-w-sm mb-8">
              "Một làn da khỏe không cần hoàn hảo, nhưng cần được yêu thương đúng cách."
            </p>

            <div className="inline-block bg-white text-navy px-3 py-1.5 rounded-[2px] text-[11px] font-semibold tracking-wider">
              ĐẠI LÝ CHÍNH HÃNG MỸ PHẨM VI SINH HOA NGÂN
            </div>
          </div>

          {/* Links: Sản phẩm */}
          <div>
            <h4 className="text-[12px] uppercase font-medium tracking-[0.1em] text-white mb-6">Sản phẩm</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/san-pham/xit-duong" className="hover:text-white hover:underline transition-all">Xịt dưỡng</Link></li>
              <li><Link href="/san-pham/vi-sinh" className="hover:text-white hover:underline transition-all">Vi sinh</Link></li>
              <li><Link href="/san-pham/sua-rua-mat" className="hover:text-white hover:underline transition-all">Sữa rửa mặt</Link></li>
              <li><Link href="/san-pham/kem-chong-nang" className="hover:text-white hover:underline transition-all">Kem chống nắng</Link></li>
              <li><Link href="/san-pham/dung-cu-lam-dep" className="hover:text-white hover:underline transition-all">Dụng cụ làm đẹp</Link></li>
            </ul>
          </div>

          {/* Links: Thông tin & Kết nối */}
          <div>
            <h4 className="text-[12px] uppercase font-medium tracking-[0.1em] text-white mb-6">Thông tin</h4>
            <ul className="space-y-4 text-sm mb-10">
              <li><Link href="/ve-chung-toi" className="hover:text-white hover:underline transition-all">Về chúng tôi</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:underline transition-all">Blog</Link></li>
              <li><Link href="/lien-he" className="hover:text-white hover:underline transition-all">Liên hệ</Link></li>
              <li><Link href="/chinh-sach" className="hover:text-white hover:underline transition-all">Chính sách & Đổi trả</Link></li>
            </ul>

            <h4 className="text-[12px] uppercase font-medium tracking-[0.1em] text-white mb-6">Kết nối</h4>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li><Link href="#" className="hover:text-white hover:underline transition-all">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline transition-all">TikTok</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline transition-all">Zalo</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline transition-all">Facebook</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[12px]">
          <div className="space-y-2">
            <p>Email: contact@almadungduong.com · Hotline: 09xx xxx xxx</p>
            <p>© {currentYear} Alma Dungduong · Website đã thông báo Bộ Công thương</p>
          </div>
          <div className="flex gap-4 opacity-60">
            <span>COD</span>
            <span>Chuyển khoản</span>
            <span>MoMo</span>
            <span>ZaloPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
