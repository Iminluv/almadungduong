"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const certs = [
  {
    name: "Chất lượng FDA",
    country: "Hoa Kỳ",
    desc: "Đạt chuẩn an toàn dược mỹ phẩm theo quy định của Cục quản lý Thực phẩm và Dược phẩm Hoa Kỳ.",
    badge: "US",
  },
  {
    name: "Chuẩn GMP",
    country: "Quốc tế",
    desc: "Quy trình sản xuất đạt tiêu chuẩn Thực hành kỹ thuật sản xuất tốt nhất toàn cầu.",
    badge: "GMP",
  },
  {
    name: "ISO 9001:2015",
    country: "Hệ thống quản lý",
    desc: "Hệ thống quản lý chất lượng đạt tiêu chuẩn quốc tế cho quy trình vận hành và kiểm soát.",
    badge: "ISO",
  },
  {
    name: "Hữu cơ USDA",
    country: "Nguyên liệu",
    desc: "Các thành phần thảo dược được canh tác và thu hoạch theo phương pháp hữu cơ nghiêm ngặt.",
    badge: "USDA",
  },
];

const qualityProofs = [
  {
    title: "Cam kết chất lượng",
    desc: "Mọi sản phẩm Mỹ phẩm vi sinh Hoa Ngân đều trải qua quy trình kiểm soát nghiêm ngặt và đạt các chứng chỉ uy tín trong ngành mỹ phẩm.",
  },
  {
    title: "Giấy công bố sản phẩm từ Sở y tế",
    desc: "Tất cả các sản phẩm của Hoa Ngân đều đủ điều kiện lưu hành trên thị trường.",
  },
  {
    title: "Phiếu kết quả thử nghiệm không kích ứng",
    desc: "Tuân thủ tiêu chí 7 KHÔNG, đảm bảo an toàn tuyệt đối cho người tiêu dùng.",
  },
  {
    title: "Kiểm nghiệm chỉ số chống nắng theo tiêu chuẩn FDA",
    desc: "Chỉ số SPF và màng lọc chống nắng được kiểm chứng và đạt chuẩn quốc tế.",
  },
];

export function Certifications() {
  return (
    <section className="py-24 bg-[#F9F8F6] border-y border-text/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20 items-stretch">
          
          {/* Left Panel: Header & Cert Badges (Grid 2x2) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div className="space-y-6 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block">
                  Tiêu chuẩn quốc tế
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-[1.1] text-text">
                  Cam Kết <br />
                  <span className="text-accent italic font-serif">Chất Lượng</span> <br />
                  Quốc Tế.
                </h2>
                <p className="text-muted text-sm leading-relaxed max-w-md">
                  Mọi sản phẩm của Alma Dungduong đều trải qua quy trình kiểm soát nghiêm ngặt và đạt các chứng chỉ uy tín nhất trong ngành mỹ phẩm.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certs.map((cert, idx) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="bg-white p-6 rounded-xl border border-text/5 hover:border-accent/20 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="px-3 py-1 bg-accent/5 rounded text-[10px] uppercase tracking-wider text-accent font-bold">
                        {cert.country}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-[10px] font-bold text-accent tracking-wider font-display border border-accent/10">
                        {cert.badge}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-display font-bold text-text group-hover:text-accent transition-colors duration-300">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed">
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vertical Divider for desktop */}
          <div className="hidden lg:block lg:col-span-1 py-4 flex justify-center">
            <div className="w-px h-full bg-text/5" />
          </div>

          {/* Right Panel: Quality proofs & CTA link */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-text/5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/80">
                  Chứng thư kiểm nghiệm
                </span>
                <Link
                  href="/chung-chi"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-[#1e261f] group transition-colors duration-300"
                >
                  <span>Xem thêm</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    ⟶
                  </span>
                </Link>
              </div>

              <div className="space-y-8">
                {qualityProofs.map((proof, idx) => (
                  <motion.div
                    key={proof.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-text group-hover:text-accent transition-colors duration-300">
                        {proof.title}
                      </h5>
                      <p className="text-xs text-muted leading-relaxed">
                        {proof.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-text/5 bg-accent/5 p-5 rounded-lg border border-accent/10">
              <p className="text-xs text-accent font-medium leading-relaxed">
                * Tất cả phiếu công bố và kết quả thử nghiệm được số hóa công khai minh bạch. Quý khách hàng có thể tra cứu chi tiết bằng cách nhấn nút "Xem thêm".
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

