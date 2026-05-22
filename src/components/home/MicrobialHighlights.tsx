"use client";

import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Khoa Học Vi Sinh",
    subtitle: "Chứa lợi khuẩn sống",
    description: "Mỹ phẩm vi sinh chứa lợi khuẩn sống (probiotics) như Lactobacillus spp., Bacillus spp. và Saccharomyces hoạt động dựa trên cơ chế cân bằng hệ vi sinh tự nhiên trên da, củng cố hàng rào bảo vệ da và điều hòa miễn dịch da.",
  },
  {
    number: "02",
    title: "Thảo Dược Bản Địa",
    subtitle: "Tinh túy từ đất mẹ Việt",
    description: "Chiết xuất thảo dược quý như Hoa Kim Ngân, Trinh Nữ Hoàng Cung được canh tác hữu cơ tại Việt Nam đóng vai trò “nuôi dưỡng và hỗ trợ” để hệ lợi khuẩn hoạt động hiệu quả hơn.",
  },
  {
    number: "03",
    title: "An Toàn Tuyệt Đối",
    subtitle: "Không hóa chất độc hại",
    description: "Độ an toàn đáp ứng tiêu chí 7 không: Không cồn xấu, Không Paraben & dầu khoàng, Không hương liệu & chất tạo màu, Không hóa chất gây hại cho da, Không chất bảo quản độc hại , Không chất tẩy rửa. Đạt chứng nhận không kích ứng da .",
  },
  {
    number: "04",
    title: "Phục Hồi Đa Tầng",
    subtitle: "Khỏe đẹp từ bên trong",
    description: "Cơ chế tác động sâu, tái thiết hệ sinh thái da từ gốc, phục hồi đa tầng Tầng vi sinh, Tầng hàng rào bảo vệ da, Tầng miễn dịch da:, Tầng cấu trúc & tái tạo. Giúp da khỏe, ổn định và ít tái phát các vấn đề như mụn, nám, kích ứng hay khô yếu.",
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
