"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skinConcerns } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function ProductsFeatures() {
  const [openId, setOpenId] = useState<string | null>("viem-mun");

  return (
    <section className="py-20 md:py-32 bg-bg">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        {/* Left Column: Vision */}
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
        <div className="space-y-4">
          {skinConcerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-surface last:border-0"
            >
              <button
                onClick={() => setOpenId(openId === concern.id ? null : concern.id)}
                className="w-full py-6 flex justify-between items-center group text-left"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display italic text-2xl text-muted/30">
                    +
                  </span>
                  <span className={`text-xl md:text-2xl font-display font-medium transition-colors ${openId === concern.id ? 'text-text' : 'text-text/60 group-hover:text-text'}`}>
                    {concern.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted/60 bg-surface px-2 py-1 rounded-sm">
                  {concern.count}
                </span>
              </button>

              <AnimatePresence>
                {openId === concern.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-14 pr-4">
                      <p className="text-muted leading-relaxed max-w-lg italic font-serif text-lg">
                        "{concern.description}"
                      </p>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 flex gap-2"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                         <span className="text-sm text-accent uppercase tracking-widest font-semibold">Từng bước phục hồi nguyên bản</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
