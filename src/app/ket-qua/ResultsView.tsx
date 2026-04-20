"use client";

import { useState } from "react";
import { skinConcerns } from "@/lib/data";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { motion, AnimatePresence } from "framer-motion";

const results = [
  {
    id: 1,
    name: "Chị Minh Anh",
    age: 28,
    location: "Hà Nội",
    concern: "Mụn & viêm",
    duration: "4 tuần",
    quote: "Mình đã từng tuyệt vọng vì mụn ẩn và viêm đỏ, nhưng hệ vi sinh thực sự đã thay đổi cấu trúc da mình từ bên trong.",
    before: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    after: "https://images.unsplash.com/photo-1552668693-d0738e00eca8?q=80&w=800",
  },
  {
    id: 2,
    name: "Chị Thanh Hằng",
    age: 35,
    location: "TP.HCM",
    concern: "Sắc tố da",
    duration: "8 tuần",
    quote: "Vết thâm mờ hẳn, da đều màu và sáng khỏe hơn mà không hề bị bong tróc hay bào mòn.",
    before: "https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=800",
    after: "https://images.unsplash.com/photo-1512290746422-3c02fc36ad2e?q=80&w=800",
  },
  {
    id: 3,
    name: "Chị Thu Trang",
    age: 42,
    location: "Đà Nẵng",
    concern: "Lão hóa",
    duration: "12 tuần",
    quote: "Các nếp nhăn li ti quanh mắt được cải thiện rõ rệt. Da căng bóng và có độ đàn hồi tốt hơn rất nhiều.",
    before: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800",
    after: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800",
  }
];

export default function ResultsPage() {
  const [activeConcern, setActiveConcern] = useState("Tất cả");

  const filteredResults = activeConcern === "Tất cả" 
    ? results 
    : results.filter(r => r.concern === activeConcern);

  return (
    <main className="min-h-screen bg-bg pt-20 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-semibold">Kết quả khách hàng</h1>
          <p className="text-lg text-muted italic font-serif leading-relaxed">
            Hàng nghìn phụ nữ Việt đã tìm lại vẻ đẹp nguyên bản thông qua lộ trình chăm sóc vi sinh khoa học. Đây là những câu chuyện thật, kết quả thật.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex border-b border-surface overflow-x-auto scrollbar-hide mb-16">
          {["Tất cả", ...skinConcerns.map(c => c.label)].map((concern) => (
            <button
              key={concern}
              onClick={() => setActiveConcern(concern)}
              className={`py-4 px-8 text-sm font-semibold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                activeConcern === concern ? "border-text text-text" : "border-transparent text-muted hover:text-text"
              }`}
            >
              {concern}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <AnimatePresence mode="popLayout">
            {filteredResults.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 flex flex-col"
              >
                {/* Comparison Slider */}
                <div className="relative">
                   <BeforeAfterSlider 
                      beforeImage={item.before} 
                      afterImage={item.after} 
                   />
                </div>

                {/* Content */}
                <div className="space-y-6 flex-1">
                  <div className="flex text-text">
                    {"★".repeat(5)}
                  </div>
                  <blockquote className="text-xl font-display font-medium leading-relaxed italic">
                    "{item.quote}"
                  </blockquote>
                  <div className="pt-4 border-t border-surface flex flex-wrap justify-between items-end gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-text uppercase tracking-widest text-xs">{item.name}</p>
                      <p className="text-sm text-muted">{item.age} tuổi · {item.location}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">{item.concern}</p>
                       <p className="text-sm font-medium">Lộ trình {item.duration}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <section className="mt-32 p-12 md:p-20 bg-surface rounded-sm text-center space-y-8">
           <h2 className="text-3xl md:text-4xl font-display font-semibold">Bắt đầu hành trình của bạn ngay hôm nay</h2>
           <p className="text-muted max-w-2xl mx-auto italic font-serif text-lg">
             Hãy để chuyên viên của chúng tôi phân tích tình trạng da và thiết kế lộ trình chăm sóc vi sinh riêng biệt cho bạn.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="px-10 py-4 bg-navy text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:brightness-110 transition-all">
                Tư vấn miễn phí 1:1
              </button>
              <button className="px-10 py-4 border border-text text-text text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-text hover:text-bg transition-all">
                Gửi câu chuyện của bạn →
              </button>
           </div>
        </section>
      </div>
    </main>
  );
}
