"use client";

import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Khoa Học Vi Sinh",
    subtitle: "Chứa lợi khuẩn sống",
    description: "Sử dụng công nghệ bào tử lợi khuẩn Bacillus tinh khiết, giúp cân bằng hệ sinh thái trên da và tiêu diệt hại khuẩn tự nhiên.",
  },
  {
    number: "02",
    title: "Thảo Dược Bản Địa",
    subtitle: "Tinh túy từ đất mẹ Việt",
    description: "Kết hợp các loại thảo dược quý như Hoa Kim Ngân, Trinh Nữ Hoàng Cung được canh tác hữu cơ tại Việt Nam.",
  },
  {
    number: "03",
    title: "An Toàn Tuyệt Đối",
    subtitle: "Không hóa chất độc hại",
    description: "Cam kết 100% không Corticoid, không Paraben, không hương liệu tổng hợp. An toàn cho cả làn da nhạy cảm nhất.",
  },
  {
    number: "04",
    title: "Phục Hồi Đa Tầng",
    subtitle: "Khỏe đẹp từ bên trong",
    description: "Cơ chế tác động sâu giúp phục hồi hàng rào bảo vệ da, đưa làn da trở về trạng thái nguyên bản rạng rỡ.",
  },
];

export function MicrobialHighlights() {
  return (
    <section className="py-24 md:py-32 bg-bg relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent block">Giá trị cốt lõi</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium leading-[1.1] text-text">
              Triết lý dưỡng da <br />
              <span className="italic font-serif text-accent">Dung Dưỡng</span> & Thuận Khiết.
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <div className="flex flex-col space-y-6">
                <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-display font-light text-text/10 group-hover:text-accent/20 transition-colors duration-500">
                      {pillar.number}
                    </span>
                    <div className="h-px flex-1 bg-text/5 mt-auto mb-2" />
                </div>
                
                <div className="space-y-3">
                    <h3 className="text-xl font-display font-bold text-text uppercase tracking-wide">
                        {pillar.title}
                    </h3>
                    <p className="text-accent text-xs font-bold uppercase tracking-wider">
                        {pillar.subtitle}
                    </p>
                </div>

                <p className="text-muted text-sm leading-relaxed group-hover:text-text transition-colors duration-300">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
