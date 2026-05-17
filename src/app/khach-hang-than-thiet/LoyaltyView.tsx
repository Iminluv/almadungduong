"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

import { useEffect, useState } from "react";

interface Benefit {
  label: string;
  value: string;
}

interface Tier {
  name: string;
  slug: string;
  icon: string;
  condition: string;
  color?: string; // We'll add this mapping
  textColor?: string;
  benefits: Benefit[];
}

interface LoyaltyData {
  tiers: Tier[];
  config: Record<string, string>;
}

const colorMap: Record<string, { bg: string, text: string }> = {
  "uom-mam": { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]" },
  "dung-duong": { bg: "bg-[#E3F2FD]", text: "text-[#1565C0]" },
  "no-ro": { bg: "bg-[#FFF3E0]", text: "text-[#E65100]" }
};

export default function LoyaltyView() {
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/loyalty");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to load loyalty data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <main className="min-h-screen bg-bg pb-24 pt-32 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }
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
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight whitespace-pre-line">
            {data.config.hero_text || "HÀNH TRÌNH ƯƠM MẦM – \nDUNG DƯỠNG – NỞ RỘ"}
          </h1>
          <div className="w-20 h-px bg-accent mx-auto mt-8 mb-8" />
          <p className="text-xl font-serif italic text-muted leading-relaxed">
            "{data.config.hero_subtext}"
          </p>
          <p className="text-muted max-w-2xl mx-auto line-clamp-none">
            {data.config.hero_description}
          </p>
        </motion.div>
      </section>

      {/* Tiers Section */}
      <section className="container-custom mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.tiers.map((level, idx) => {
            const colors = colorMap[level.slug] || { bg: "bg-surface", text: "text-text" };
            return (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white border border-surface p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${colors.text.replace("text", "bg")}`} />
                <div className="text-5xl mb-6">{level.icon}</div>
                <h3 className={`text-2xl font-display font-bold mb-2 ${colors.text}`}>{level.name}</h3>
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
          )})}
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
                  <p className="text-muted">{data.config.exchange_rate}</p>
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
                <p className="text-muted font-serif italic text-lg whitespace-pre-line">"{data.config.closing_quote}"</p>
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
