"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const feedbacks = [
  {
    id: 1,
    name: "Lê Phương Thảo",
    role: "Khách hàng thân thiết",
    content: "Mình dùng Tinh chất 2.0 được 1 tháng rồi, da mụn và nhạy cảm của mình đã ổn định hẳn. Trước đây dùng gì cũng bị đỏ mà dùng vi sinh này thấy rất êm và da khỏe lên trông thấy.",
    product: "Tinh chất 2.0",
    avatarColor: "bg-[#D9E2D5]",
  },
  {
    id: 2,
    name: "Nguyễn Minh Anh",
    role: "Diễn viên tự do",
    content: "Được bạn giới thiệu Xịt dưỡng Miracle Essence, ban đầu cũng hơi ngại vì da mình mỏng lắm. Nhưng dùng xong thấy da mướt, không còn lộ mạch máu nhiều như trước. Rất đáng đầu tư!",
    product: "Xịt dưỡng Miracle",
    avatarColor: "bg-[#E5D5D9]",
  },
  {
    id: 3,
    name: "Trần Hoàng Yến",
    role: "Vlogger làm đẹp",
    content: "Combo 1 thực sự đỉnh. Sữa rửa mặt nước băng dùng cực thích, sạch sâu mà da vẫn mềm. Kem chống nắng thì mỏng nhẹ, không bị bí da tẹo nào.",
    product: "Combo 1",
    avatarColor: "bg-[#D5D9E5]",
  },
  {
      id: 4,
      name: "Hoàng Linh Chi",
      role: "Khách hàng",
      content: "Alma Dung dưỡng là shop mình tin tưởng nhất về các sản phẩm dưỡng sinh. Guasha ở đây đá thật rất mát, tối nào cũng massage thấy mặt thon gọn hẳn.",
      product: "Đá Guasha",
      avatarColor: "bg-[#E2E5D5]",
  }
];

export function CustomerFeedback() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-bg overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block">Trải nghiệm thực tế</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-text">
                Tiếng nói từ <br />
                <span className="italic font-serif text-accent">Cộng đồng</span> Alma.
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="w-12 h-12 rounded-full border border-text/10 flex items-center justify-center hover:bg-surface transition-colors"
            >
              ←
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="w-12 h-12 rounded-full bg-text text-bg flex items-center justify-center hover:bg-accent hover:text-bg transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {feedbacks.map((f) => (
              <div key={f.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_45%] min-w-0 px-4">
                <div className="bg-surface p-10 rounded-3xl border border-text/5 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex gap-1 text-accent text-lg">
                      {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <p className="text-lg md:text-xl text-text font-display leading-relaxed italic">
                      "{f.content}"
                    </p>
                  </div>
                  
                  <div className="mt-10 flex items-center justify-between border-t border-text/5 pt-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${f.avatarColor} flex items-center justify-center font-bold text-text/50`}>
                        {f.name.split(" ").pop()?.[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-text">{f.name}</h4>
                        <p className="text-xs text-muted uppercase tracking-wider">{f.role}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-3 py-1 rounded-full">
                            Sản phẩm: {f.product}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
