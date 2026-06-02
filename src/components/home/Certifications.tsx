"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const qualityProofs = [
  {
    id: "01",
    tag: "Chất lượng",
    title: "Cam kết chất lượng",
    desc: "Mọi sản phẩm Mỹ phẩm vi sinh Hoa Ngân đều trải qua quy trình kiểm soát nghiêm ngặt và đạt các chứng chỉ uy tín trong ngành mỹ phẩm.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "02",
    tag: "Pháp lý",
    title: "Giấy công bố từ Sở Y tế",
    desc: "Tất cả các sản phẩm của Hoa Ngân đều có đầy đủ phiếu công bố hợp lệ và đủ điều kiện lưu hành tự do trên thị trường.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "03",
    tag: "An toàn",
    title: "Thử nghiệm không kích ứng",
    desc: "Tuân thủ nghiêm ngặt tiêu chí 7 KHÔNG, được chứng minh lâm sàng an toàn tuyệt đối và 0% gây kích ứng cho da nhạy cảm.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    id: "04",
    tag: "Hiệu quả",
    title: "Kiểm nghiệm chống nắng FDA",
    desc: "Chỉ số SPF và màng lọc chống nắng thế hệ mới được kiểm chứng nghiêm ngặt đạt các tiêu chuẩn quốc tế cao nhất.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707m12.728 0l-.707-.707M6.364 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export function Certifications() {
  return (
    <section className="py-24 bg-[#FAF8F5] border-y border-text/5 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header Block */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent bg-accent/5 px-4 py-1.5 rounded-full mb-4">
              Kiểm định lâm sàng & Minh bạch
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-[1.15] text-text">
              Chất Lượng Vượt Trội.<br />
              Minh Bạch <span className="text-accent italic font-serif">Tuyệt Đối</span>.
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mt-6 max-w-xl">
              Mọi sản phẩm của Alma Dungduong đều được thử nghiệm nghiêm ngặt, công bố hợp quy và kiểm nghiệm an toàn lành tính tối đa trước khi trao đến tay bạn.
            </p>
          </motion.div>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {qualityProofs.map((proof, idx) => (
            <motion.div
              key={proof.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative bg-white border border-text/5 p-8 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:border-accent/20 hover:-translate-y-1 transition-all duration-500 group"
            >
              {/* Backlight / Glow Effect on Hover */}
              <div className="absolute -inset-px bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              
              {/* Large editorial watermark background numbering */}
              <span className="absolute top-4 right-6 text-6xl font-serif font-bold text-accent/[0.03] select-none group-hover:text-accent/[0.06] transition-colors duration-500 pointer-events-none">
                {proof.id}
              </span>

              <div className="relative z-10 flex flex-col h-full">
                {/* Micro badge */}
                <span className="inline-block text-[9px] uppercase font-bold tracking-wider text-accent bg-accent/5 px-2.5 py-1 rounded-md mb-6 self-start">
                  {proof.tag}
                </span>

                {/* Circle Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-accent/5 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  {proof.icon}
                </div>

                {/* Text Details */}
                <h4 className="text-base font-display font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300">
                  {proof.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  {proof.desc}
                </p>
              </div>

              {/* Fine Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA & Notice Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 md:mt-20 p-6 md:p-8 rounded-2xl bg-white border border-text/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/20 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                Tra cứu công khai
              </span>
              <p className="text-xs text-muted leading-relaxed max-w-xl">
                Tất cả phiếu công bố và kết quả thử nghiệm được số hóa công khai minh bạch. Quý khách hàng có thể tra cứu chi tiết bằng cách xem chứng thư kiểm nghiệm đầy đủ.
              </p>
            </div>
          </div>
          <Link
            href="/chung-chi"
            className="inline-flex h-11 items-center justify-center bg-accent text-white px-6 rounded-lg text-xs font-semibold tracking-wider hover:bg-[#193a2b] shadow-md shadow-accent/10 whitespace-nowrap group transition-all duration-300"
          >
            <span>Xem chứng thư đầy đủ</span>
            <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300">
              ⟶
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
