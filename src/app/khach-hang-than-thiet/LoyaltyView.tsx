"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const levels = [
  {
    name: "Ươm mầm",
    condition: "Đăng ký thành viên",
    icon: "🌱",
    color: "bg-[#E8F5E9]",
    textColor: "text-[#2E7D32]",
    benefits: [
      { label: "Đăng ký thành viên", value: "+10 giọt" },
      { label: "Mỗi 100.000đ chi tiêu", value: "+1 giọt" },
      { label: "Đánh giá sản phẩm", value: "+3 giọt" },
      { label: "Giới thiệu bạn bè", value: "+50 giọt" },
      { label: "Sinh nhật", value: "+50 giọt" },
    ],
  },
  {
    name: "Dung dưỡng",
    condition: "Tổng chi tiêu > 5 triệu",
    icon: "💧",
    color: "bg-[#E3F2FD]",
    textColor: "text-[#1565C0]",
    benefits: [
      { label: "Đăng ký thành viên", value: "+10 giọt" },
      { label: "Mỗi 100.000đ chi tiêu", value: "+1.5 giọt" },
      { label: "Đánh giá sản phẩm", value: "+3 giọt" },
      { label: "Giới thiệu bạn bè", value: "+50 giọt" },
      { label: "Sinh nhật", value: "+50 giọt" },
    ],
  },
  {
    name: "Nở rộ",
    condition: "Tổng chi tiêu > 10 triệu",
    icon: "🌸",
    color: "bg-[#FFF3E0]",
    textColor: "text-[#E65100]",
    benefits: [
      { label: "Đăng ký thành viên", value: "+10 giọt" },
      { label: "Mỗi 100.000đ chi tiêu", value: "+2 giọt" },
      { label: "Đánh giá sản phẩm", value: "+3 giọt" },
      { label: "Giới thiệu bạn bè", value: "+50 giọt" },
      { label: "Sinh nhật", value: "+50 giọt" },
    ],
  },
];

export default function LoyaltyView() {
  return (
    <main className="min-h-screen bg-bg pb-24 pt-32">
      {/* Hero Section */}
      <section className="container-custom mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Loyalty Program</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
            HÀNH TRÌNH ƯƠM MẦM – <br />
            DUNG DƯỠNG – NỞ RỘ
          </h1>
          <div className="w-20 h-px bg-accent mx-auto mt-8 mb-8" />
          <p className="text-xl font-serif italic text-muted leading-relaxed">
            "Mỗi làn da đều có một nhịp phát triển riêng. Không cần vội vàng, chỉ cần được chăm sóc đúng cách — làn da sẽ dần khỏe lên, cân bằng hơn và rạng rỡ theo thời gian."
          </p>
          <p className="text-muted max-w-2xl mx-auto line-clamp-none">
            Chúng tôi tạo ra chương trình này như một hành trình đồng hành lâu dài, nơi mỗi lần bạn quay lại là một bước tiến gần hơn đến phiên bản làn da tốt nhất của mình.
          </p>
        </motion.div>
      </section>

      {/* Tiers Section */}
      <section className="container-custom mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, idx) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white border border-surface p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${level.textColor.replace("text", "bg")}`} />
              <div className="text-5xl mb-6">{level.icon}</div>
              <h3 className={`text-2xl font-display font-bold mb-2 ${level.textColor}`}>{level.name}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-8">{level.condition}</p>
              
              <div className="w-full space-y-4 text-left border-t border-surface pt-8">
                {level.benefits.map((benefit) => (
                  <div key={benefit.label} className="flex justify-between items-center text-sm">
                    <span className="text-muted">{benefit.label}</span>
                    <span className="font-bold text-text">{benefit.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rewards Info */}
      <section className="bg-surface py-24 mb-32 border-y border-navy/5">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold">Quy tắc tích điểm & sử dụng</h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Giá trị giọt nước</h4>
                  <p className="text-muted">1 giọt tương ứng với 1.000 đồng và có thể quy đổi thành voucher khi mua hàng trên website Alma Dungduong.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Tích lũy trọn đời</h4>
                  <p className="text-muted">Tổng chi tiêu của bạn được cộng dồn để nâng cấp hạng thành viên trọn đời, giúp bạn nhận được nhiều ưu đãi hơn theo thời gian.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Đồng hành cùng chuyên gia</h4>
                  <p className="text-muted">Ở mọi cấp độ, bạn đều nhận được sự tư vấn 1:1 từ đội ngũ chuyên gia của chúng tôi cho đến khi đạt được làn da mong muốn.</p>
                </div>
              </div>
            </div>
            <div className="pt-6">
               <Button variant="primary" size="lg" className="w-full md:w-auto">Đăng ký tham gia ngay</Button>
            </div>
          </div>
          <div className="relative aspect-square bg-white border border-surface shadow-xl p-12 flex flex-col justify-center text-center space-y-8">
             <div className="text-6xl">💧</div>
             <div className="space-y-4">
                <p className="text-muted font-serif italic text-lg">"Chăm sóc da không phải là câu chuyện của một sản phẩm, mà là sự kiên trì và thấu hiểu chính làn da của mình."</p>
                <div className="w-12 h-px bg-accent mx-auto" />
                <p className="text-sm font-bold uppercase tracking-widest text-navy">Alma Dungduong Journey</p>
             </div>
             <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="bg-bg py-4 border border-surface">Ươm mầm nhẹ nhàng</div>
                <div className="bg-bg py-4 border border-surface">Dung dưỡng bền vững</div>
                <div className="bg-bg py-4 border border-surface col-span-2">Nở rộ rạng rỡ</div>
             </div>
          </div>
        </div>
      </section>

      {/* Global Review Link Placeholder */}
      <section className="container-custom text-center py-10">
         <p className="text-muted">Bạn có câu hỏi? <button className="font-bold text-text border-b border-text hovler:text-accent hover:border-accent">Liên hệ Chuyên gia tư vấn</button></p>
      </section>
    </main>
  );
}
