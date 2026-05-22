"use client";

import { motion } from "framer-motion";

const trustItems = [
  "Khoa học vi sinh",
  "Thảo dược Việt Nam",
  "Không hoá chất độc hại",
  "Cam kết hiệu quả",
  "Đồng hành trọn đời"
];

export function TrustStrip() {
  return (
    <section className="bg-surface border-y border-surface py-5 overflow-hidden">
      <div className="container-custom">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center px-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 text-xs lg:text-sm font-medium tracking-[0.05em] uppercase text-text/80"
            >
              <span>{item}</span>
              {index < trustItems.length - 1 && (
                <span className="text-muted">·</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Marquee */}
        <div className="md:hidden">
          <motion.div
            className="flex whitespace-nowrap gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...trustItems, ...trustItems].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-4 text-[13px] font-medium tracking-[0.05em] uppercase text-text/80"
              >
                <span>{item}</span>
                <span className="text-muted">·</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
