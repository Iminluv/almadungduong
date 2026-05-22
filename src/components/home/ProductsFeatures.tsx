"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skinConcernGroups } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function ProductsFeatures() {
  const [activeId, setActiveId] = useState<string | null>("do-am");
  const accordionRef = useRef<HTMLDivElement>(null);

  const handlePillClick = (id: string) => {
    setActiveId(id);
    // Smooth scroll to the accordion on mobile/tablet views when a pill is tapped
    if (typeof window !== "undefined" && window.innerWidth < 1024 && accordionRef.current) {
      const yOffset = -80; // offset to not hide behind sticky header
      const element = accordionRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-bg relative overflow-hidden">
      {/* Decorative background elements for premium feel */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[130px] pointer-events-none translate-x-1/3" />

      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start relative z-10">
        {/* Left Column: Vision & Filter Pills */}
        <div className="space-y-8 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-display font-semibold leading-tight capitalize">
              Chỉ 4 sản phẩm.<br />
              Giải quyết 28<br />
              vấn đề về da.
            </h2>
            <p className="text-muted text-base md:text-lg max-w-md leading-relaxed">
              Nhờ cơ chế tác động của Hệ Lợi Khuẩn và Tinh Chất Thảo Dược Việt Nam, chúng tôi tối giản quy trình nhưng tối đa hiệu quả.
            </p>
          </motion.div>

          {/* Filter Pills Container */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Chọn nhóm vấn đề:</span>
            <div className="flex flex-wrap gap-2.5 max-w-lg">
              {skinConcernGroups.map((group) => {
                const isActive = activeId === group.id;
                return (
                  <button
                    key={group.id}
                    onClick={() => handlePillClick(group.id)}
                    className={`px-4 py-2.5 text-sm rounded-full transition-all duration-300 font-medium cursor-pointer border flex items-center gap-2 ${
                      isActive
                        ? "bg-accent text-white border-accent shadow-md shadow-accent/15 scale-[1.03]"
                        : "bg-surface/30 backdrop-blur-sm text-text/70 border-text/10 hover:text-text hover:border-text/30 hover:bg-surface/60"
                    }`}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <span>{group.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive ? "bg-white/20 text-white font-semibold" : "bg-text/5 text-muted"
                    }`}>
                      {group.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="text" size="lg" className="group p-0">
              <span className="relative">
                Xem sản phẩm
                <span className="absolute bottom-0 left-0 w-0 h-px bg-text transition-all group-hover:w-full" />
              </span>
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Accordion */}
        <div ref={accordionRef} className="space-y-4 lg:pt-4">
          {skinConcernGroups.map((group, index) => {
            const isOpen = activeId === group.id;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`border-b border-surface last:border-0 transition-all duration-500 rounded-lg px-4 ${
                  isOpen ? "bg-surface/20 border-accent/20 shadow-sm shadow-accent/2" : "hover:bg-surface/10"
                }`}
              >
                <button
                  onClick={() => setActiveId(isOpen ? null : group.id)}
                  className="w-full py-6 flex justify-between items-center group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className={`font-display italic text-2xl transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-muted/30 group-hover:text-accent/50"
                    }`}>
                      +
                    </span>
                    <span className={`text-xl md:text-2xl font-display font-medium transition-colors ${
                      isOpen ? 'text-accent' : 'text-text/60 group-hover:text-text'
                    }`}>
                      {group.label}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold transition-all duration-300 px-3 py-1 rounded-full ${
                    isOpen ? 'text-accent bg-accent/15' : 'text-muted/60 bg-surface'
                  }`}>
                    {group.count} vấn đề
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-12 pr-4 space-y-6">
                        <ul className="space-y-3">
                          {group.issues.map((issue, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.04 }}
                              className="flex items-start gap-3.5 text-muted text-base md:text-[17px] leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0 animate-pulse" />
                              <span className="text-text/80">{issue}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: group.issues.length * 0.04 + 0.1 }}
                          className="pt-4 border-t border-surface flex gap-2 items-center"
                        >
                           <span className="text-[10px] text-accent uppercase tracking-widest font-bold bg-accent/5 px-2.5 py-1 rounded-sm">
                             Từng bước phục hồi nguyên bản
                           </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
