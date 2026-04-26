"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function MonthlyDeal() {
  return (
    <section className="py-12 md:py-24 bg-bg overflow-hidden">
      <div className="container-custom">
        <div className="relative bg-surface rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-[#1C1C1A10]">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-bg rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-accent/10 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/4" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center">
            {/* Image Side - Now at the top on mobile/tablet */}
            <div className="w-full lg:flex-1 relative lg:h-[600px] flex items-center justify-center p-10 lg:p-0 order-first lg:order-last">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, type: "spring" }}
                 className="relative w-full aspect-square max-w-[320px] md:max-w-[400px] lg:max-w-[450px] group"
               >
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-accent/10 rounded-full blur-[40px] md:blur-[60px] group-hover:bg-accent/20 transition-all duration-700" />
                  
                  <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-text/5 transform -rotate-2 lg:-rotate-3 transition-transform group-hover:rotate-0 duration-500">
                    <Image
                      src="https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=1200&auto=format&fit=crop"
                      alt="Combo Phục Hồi"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Badges */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-bg text-accent w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-full shadow-xl z-20 border-4 border-surface font-bold leading-none"
                  >
                    <span className="text-[10px] md:text-xs text-accent/80">OFF</span>
                    <span className="text-xl md:text-2xl">20%</span>
                  </motion.div>
               </motion.div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:flex-1 p-8 md:p-12 lg:p-24 space-y-8 md:space-y-10 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-bg/50 backdrop-blur-md px-4 py-2 rounded-full border border-text/5"
              >
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent">Đặc quyền tháng này</span>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
                >
                  Combo <span className="text-accent italic">Phục Hồi</span> <br className="hidden md:block" />
                  Hệ Vi Sinh 
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:ml-0"
                >
                  Giải pháp tối ưu cho làn da nhạy cảm. Bộ 3 sản phẩm giúp tái thiết lập hàng rào bảo vệ vững chắc chỉ sau 14 ngày.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-4 md:gap-8"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-muted text-xs md:text-sm line-through">1.580.000đ</span>
                  <span className="text-3xl md:text-4xl font-display font-bold text-text">1.250.000đ</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-px h-10 md:h-12 bg-text/10 hidden sm:block" />
                   <div className="flex flex-col items-center lg:items-start">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Tiết kiệm</span>
                      <span className="text-lg md:text-xl font-bold text-accent">330.000đ</span>
                   </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4"
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 shadow-md">
                  Sở hữu ngay
                </Button>
                <Button variant="text" size="lg" className="group p-0 text-text hover:text-accent">
                  <span>Xem chi tiết</span> 
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
