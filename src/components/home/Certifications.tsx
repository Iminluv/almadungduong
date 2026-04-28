"use client";

import React from "react";
import { motion } from "framer-motion";

const certs = [
  {
    name: "Chất lượng FDA",
    country: "Hoa Kỳ",
    desc: "Đạt chuẩn an toàn dược mỹ phẩm theo quy định của Cục quản lý Thực phẩm và Dược phẩm Hoa Kỳ.",
    icon: "🇺🇸",
  },
  {
    name: "Chuẩn GMP",
    country: "Quốc tế",
    desc: "Quy trình sản xuất đạt tiêu chuẩn Thực hành kỹ thuật sản xuất tốt nhất toàn cầu.",
    icon: "⚙️",
  },
  {
    name: "ISO 9001:2015",
    country: "Hệ thống quản lý",
    desc: "Hệ thống quản lý chất lượng đạt tiêu chuẩn quốc tế cho quy trình vận hành và kiểm soát.",
    icon: "✅",
  },
  {
    name: "Hữu cơ USDA",
    country: "Nguyên liệu",
    desc: "Các thành phần thảo dược được canh tác và thu hoạch theo phương pháp hữu cơ nghiệm ngặt.",
    icon: "🍃",
  },
];

export function Certifications() {
  return (
    <section className="py-20 bg-surface/50 border-y border-text/5">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Cam Kết <br />
                <span className="text-accent italic font-serif">Chất Lượng</span> <br />
                Quốc Tế.
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Mọi sản phẩm của Alma Dungduong đều trải qua quy trình kiểm soát nghiêm ngặt và đạt các chứng chỉ uy tín nhất trong ngành mỹ phẩm.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {certs.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-bg p-6 rounded-xl border border-text/5 hover:border-accent/20 transition-all group"
              >
                <div className="flex gap-5">
                    <div className="w-12 h-12 flex-shrink-0 bg-surface rounded-full flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all">
                        {cert.icon}
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-display font-bold text-text">{cert.name}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-accent font-bold">{cert.country}</p>
                        <p className="text-xs text-muted leading-relaxed pt-2">{cert.desc}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
