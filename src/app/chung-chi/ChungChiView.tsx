"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const coreCerts = [
  {
    id: "fda",
    name: "Chứng nhận FDA Hoa Kỳ",
    authority: "Cục Quản lý Thực phẩm & Dược phẩm Hoa Kỳ",
    code: "Reg. No. 192847582",
    desc: "Đạt chuẩn an toàn dược mỹ phẩm theo quy định nghiêm ngặt của Hoa Kỳ. Cho phép sản phẩm lưu hành và được công nhận rộng rãi trên toàn cầu.",
    scope: "An toàn thành phần & Cơ sở sản xuất",
    badge: "FDA",
  },
  {
    id: "gmp",
    name: "Tiêu chuẩn CGMP ASEAN",
    authority: "Cục Quản lý Dược - Bộ Y Tế",
    code: "CGMP Certified No. 495/2024",
    desc: "Quy trình thực hành tốt sản xuất mỹ phẩm. Đảm bảo điều kiện vô trùng, quy chuẩn sản xuất khép kín và đồng đều về mặt chất lượng trên từng lô hàng.",
    scope: "Nhà máy & Quy trình đóng gói",
    badge: "GMP",
  },
  {
    id: "iso",
    name: "Hệ thống Quản lý ISO 9001:2015",
    authority: "Tổ chức Chứng nhận Quốc tế SGS",
    code: "Certificate VN24/00918",
    desc: "Hệ thống quản lý chất lượng đạt tiêu chuẩn quốc tế toàn diện cho toàn bộ quy trình từ R&D, kiểm soát nguồn nguyên liệu đến chăm sóc khách hàng.",
    scope: "Hệ thống quản trị & Vận hành",
    badge: "ISO",
  },
  {
    id: "usda",
    name: "Chứng nhận Hữu cơ USDA Organic",
    authority: "Bộ Nông nghiệp Hoa Kỳ",
    code: "USDA Organic Ref. 883910",
    desc: "Nguyên liệu thảo dược bản địa như Hoa Kim Ngân, Trinh Nữ Hoàng Cung được canh tác 100% hữu cơ, không phân bón hóa học và thuốc bảo vệ thực vật.",
    scope: "Nguồn nguyên liệu đầu vào",
    badge: "USDA",
  },
];

const testReports = [
  {
    title: "Giấy công bố sản phẩm từ Sở Y Tế",
    category: "Pháp lý & Lưu hành",
    status: "Đã công bố",
    date: "Cập nhật mới nhất: 2026",
    details: [
      { key: "Tên sản phẩm", val: "Mỹ phẩm vi sinh Hoa Ngân (Đầy đủ 4 sản phẩm chính)" },
      { key: "Cơ quan cấp", val: "Sở Y Tế TP. Hồ Chí Minh" },
      { key: "Trạng thái pháp lý", val: "Đầy đủ điều kiện lưu hành tự do trên toàn quốc (Free Sale)" },
      { key: "Số công bố", val: "Xịt Dưỡng: 142/24/CBMP-HCM | Tinh Chất 2.0 & 2.7: 143/24/CBMP-HCM | SRM Nước Băng: 144/24/CBMP-HCM | KCN Smart Suncare: 145/24/CBMP-HCM" }
    ],
    desc: "Toàn bộ danh mục sản phẩm của Alma Dungduong đều có phiếu công bố hợp lệ được duyệt bởi Sở Y Tế trước khi phân phối tới tay người tiêu dùng."
  },
  {
    title: "Phiếu kết quả thử nghiệm không kích ứng",
    category: "Độ an toàn & Da liễu",
    status: "An toàn tuyệt đối (0% Kích ứng)",
    date: "Cập nhật mới nhất: 2026",
    details: [
      { key: "Chỉ tiêu kiểm nghiệm", val: "Kích ứng da sơ cấp (Primary Skin Irritation)" },
      { key: "Phương pháp đánh giá", val: "Thử nghiệm lâm sàng trên da nhạy cảm theo tiêu chuẩn ASEAN" },
      { key: "Tiêu chí 7 KHÔNG", val: "Không cồn xấu, Không Paraben, Không dầu khoáng, Không chất bảo quản độc hại, Không hương liệu nhân tạo, Không chất tạo màu, Không chất tẩy rửa mạnh" },
      { key: "Kết luận da liễu", val: "Chỉ số kích ứng = 0.0 (Không gây mẩn đỏ, ngứa rát hay bất cứ phản ứng phụ nào)" }
    ],
    desc: "Sản phẩm được chứng minh lâm sàng cực kỳ lành tính cho cả những làn da mỏng yếu nhất, da bị tổn thương do lột tẩy hoặc corticoid."
  },
  {
    title: "Kiểm nghiệm chỉ số chống nắng theo tiêu chuẩn FDA",
    category: "Chỉ số kỹ thuật & Hiệu quả",
    status: "Đạt chuẩn SPF 123 / UVA-PF 79",
    date: "Cập nhật mới nhất: 2026",
    details: [
      { key: "Màng lọc chống nắng", val: "Màng lọc thông minh thế hệ mới tích hợp Zinc Oxide tự nhiên" },
      { key: "Chỉ số kiểm nghiệm", val: "SPF 123 & UVA-PF 79 (Bảo vệ quang phổ rộng hoàn hảo)" },
      { key: "Thời gian bảo vệ", val: "Lên đến 12 tiếng liên tục không cần thoa lại nhiều lần" },
      { key: "Khả năng làm sạch", val: "Rửa sạch dễ dàng bằng sữa rửa mặt thông thường, không cần tẩy trang chuyên dụng" }
    ],
    desc: "Được thử nghiệm nghiêm ngặt theo tiêu chuẩn kiểm định chống nắng của FDA Mỹ, cung cấp hiệu quả bảo vệ trước tia UVA, UVB, tia hồng ngoại IR và ánh sáng xanh."
  }
];

export default function ChungChiView() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCerts = activeTab === "all" 
    ? coreCerts 
    : coreCerts.filter(c => c.id === activeTab);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 md:pt-36">
      
      {/* Hero Section */}
      <div className="container-custom mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:opacity-80 transition-opacity"
          >
            <span>← Quay lại trang chủ</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent block">
            Hồ sơ pháp lý minh bạch
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-[1.1] text-text">
            Giấy Kiểm Nghiệm & <br />
            <span className="italic font-serif text-accent">Chứng Nhận</span> Chất Lượng.
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            Tất cả sản phẩm của Alma Dungduong đều được phát triển và kiểm soát nghiêm ngặt theo các tiêu chuẩn y khoa và pháp lý cao nhất, cam kết an toàn tối đa cho mọi làn da.
          </p>
        </motion.div>
      </div>

      {/* Tabs / Filter Navigation */}
      <div className="container-custom mb-12">
        <div className="flex flex-wrap gap-2.5 pb-4 border-b border-text/10">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
              activeTab === "all"
                ? "bg-accent text-white border-accent"
                : "bg-white text-text/60 border border-text/10 hover:border-text/30"
            }`}
          >
            Tất cả chứng nhận
          </button>
          {coreCerts.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                activeTab === c.id
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-text/60 border border-text/10 hover:border-text/30"
              }`}
            >
              {c.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Core Certs Grid */}
      <div className="container-custom mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCerts.map((cert) => (
            <motion.div
              layout
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-text/5 p-8 flex flex-col justify-between hover:border-accent/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center font-display font-bold text-accent text-xs tracking-wider">
                    {cert.badge}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/5 px-2.5 py-1 rounded">
                    {cert.scope}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-text group-hover:text-accent transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-muted/80 font-medium">
                    {cert.authority}
                  </p>
                </div>

                <p className="text-sm text-muted leading-relaxed">
                  {cert.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-text/5 flex justify-between items-center text-[11px] font-mono text-muted/60">
                <span>MÃ CHỨNG THƯ</span>
                <span className="font-semibold text-text/80">{cert.code}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Quality & Laboratory Reports */}
      <div className="bg-white py-24 border-y border-text/5">
        <div className="container-custom">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block">
              Báo cáo & Giấy tờ lưu hành
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-text">
              Hồ Sơ Thử Nghiệm & Công Bố Sản Phẩm
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Các tài liệu kỹ thuật được thiết lập, kiểm duyệt và lưu trữ theo đúng quy chuẩn pháp luật Việt Nam và các hướng dẫn da liễu quốc tế.
            </p>
          </div>

          <div className="space-y-12">
            {testReports.map((report, idx) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-text/5 last:border-0 last:pb-0"
              >
                
                {/* Meta details column */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-accent/5 text-[9px] uppercase tracking-wider font-bold text-accent">
                      {report.category}
                    </span>
                    <span className="text-[10px] text-muted">{report.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-text">
                    {report.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {report.desc}
                  </p>
                </div>

                {/* Styled sheet/report view mock */}
                <div className="lg:col-span-8 bg-[#FAF8F5] border border-text/5 rounded-xl p-6 md:p-8 space-y-6 shadow-xs hover:border-accent/20 transition-all duration-300">
                  <div className="flex justify-between items-center pb-4 border-b border-text/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                        {report.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted/50">REPORT ID: HND-{202600 + idx}</span>
                  </div>

                  <div className="space-y-4">
                    {report.details.map((detail, dIdx) => (
                      <div key={dIdx} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-4 text-xs">
                        <div className="md:col-span-4 font-bold text-text/80 uppercase tracking-wide text-[10px]">
                          {detail.key}
                        </div>
                        <div className="md:col-span-8 text-muted leading-relaxed">
                          {detail.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-text/10 flex justify-between items-center text-[10px] text-muted/60">
                    <span>Đại diện Hoa Ngân & Alma Dungduong</span>
                    <span className="italic">Ký tá & Bảo chứng điện tử</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Footer Banner */}
      <div className="container-custom mt-20 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-sm text-muted">
            Mọi thắc mắc hoặc nhu cầu tra cứu hồ sơ kiểm nghiệm chi tiết cho từng sản phẩm cụ thể, vui lòng liên hệ trực tiếp với bộ phận Chăm Sóc Khách Hàng.
          </p>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center bg-accent text-white px-6 rounded text-xs font-semibold tracking-wider hover:bg-[#1e261f] shadow-md shadow-accent/10 transition-colors"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>

    </div>
  );
}
