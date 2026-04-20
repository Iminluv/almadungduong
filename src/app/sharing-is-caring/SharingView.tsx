"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const stories = [
  {
    id: 1,
    name: "Lan Phương",
    tag: "@lanphuong.skin",
    quote: "Quá trình 6 tháng đồng hành cùng Alma đã giúp mình từ một người tự ti về da trở nên yêu bản thân hơn rất nhiều.",
    image: "https://images.unsplash.com/photo-1590159763121-7c9ff3149e04?q=80&w=800",
    concern: "Mụn & Viêm",
  },
  {
    id: 2,
    name: "Thùy Dương",
    tag: "@duong.glow",
    quote: "Mình yêu triết lý của hệ vi sinh. Da không cần hoàn hảo, da chỉ cần khỏe.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800",
    concern: "Làn Da Nhạy Cảm",
  },
  {
    id: 3,
    name: "Huyền My",
    tag: "@myhuyen_beauty",
    quote: "Sản phẩm thực sự thấm thấu và làm dịu ngay lập tức. Cảm ơn Alma rất nhiều!",
    image: "https://images.unsplash.com/photo-1552668693-d0738e00eca8?q=80&w=800",
    concern: "Độ Ẩm & Sáng Da",
  }
];

export default function SharingPage() {
  const [isLoggedIn] = useState(true); // Mock auth state for submission

  return (
    <main className="min-h-screen bg-bg pb-32">
      {/* Hero Section */}
      <section className="py-24 bg-surface text-center">
        <div className="container-custom space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight"
          >
            Chia sẻ · Lan tỏa · <span className="text-accent underline">Nhận quà</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-serif italic text-muted max-w-2xl mx-auto"
          >
            Mỗi làn da là một hành trình riêng. Hãy chia sẻ câu chuyện của bạn để nhận được những phần quà tri ân từ Alma Dungduong.
          </motion.p>
        </div>
      </section>

      {/* Community Grid */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {stories.map((story, idx) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface">
                   <Image 
                      src={story.image} 
                      alt={story.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-accent">
                    <span>{story.concern}</span>
                    <span className="text-muted">Tháng 06/2025</span>
                  </div>
                  <blockquote className="text-lg leading-relaxed italic font-serif">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{story.name}</span>
                    <span className="text-xs text-muted">{story.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Form Gate */}
      <section className="py-24 bg-navy text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-bold leading-tight uppercase tracking-tight"> Gửi câu chuyện <br /> của bạn </h2>
              <div className="space-y-6 text-white/70 max-w-md">
                 <p className="border-l-2 border-accent pl-6 py-2">
                    Các câu chuyện tiêu biểu trong tháng sẽ nhận được bộ quà tặng Vi sinh Hoa Ngân trị giá lên tới 1.000.000đ.
                 </p>
                 <p className="text-sm italic">
                    Lưu ý: Bạn cần đăng nhập để gửi bài viết này để chúng tôi có thể gửi quà đến địa chỉ đã lưu của bạn.
                 </p>
              </div>
            </div>

            <div className="bg-bg text-text p-8 md:p-12 rounded-sm shadow-2xl relative">
              {!isLoggedIn ? (
                 <div className="absolute inset-0 z-10 bg-bg/95 flex flex-col items-center justify-center text-center p-8 space-y-6">
                    <p className="font-serif italic text-lg">Vui lòng đăng nhập để bắt đầu chia sẻ.</p>
                    <button className="bg-navy text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-sm">Đăng nhập ngay</button>
                 </div>
              ) : null}
              
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Tiêu đề hành trình</label>
                  <input type="text" className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none" placeholder="Ví dụ: 6 tuần phục hồi da mụn..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Câu chuyện của bạn</label>
                  <textarea className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none min-h-[120px]" placeholder="Hãy kể về sự thay đổi của làn da bạn..." />
                </div>
                <div className="border border-dashed border-text/20 p-8 text-center space-y-2 hover:bg-surface transition-colors cursor-pointer group">
                   <p className="text-xs font-bold uppercase tracking-widest group-hover:text-accent transition-colors">Tải ảnh lên (không bắt buộc)</p>
                   <p className="text-[10px] text-muted">Kích thước tối đa 5MB</p>
                </div>
                <button className="w-full bg-accent text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all">Gửi cho Alma →</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
