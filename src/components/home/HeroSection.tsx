"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg pt-16">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2000&auto=format&fit=crop"
          alt="Natural skincare background"
          fill
          className="object-cover opacity-20 grayscale-[20%]"
          priority
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to right, rgba(250,248,245,0.92) 45%, transparent 85%)' 
          }} 
        />
      </div>

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1]"
            >
              Khoa Học Vi Sinh<br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Cho Làn Da
              </motion.span><br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-accent"
              >
                Nguyên Bản.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="space-y-2 text-muted text-lg border-l-2 border-surface pl-6"
            >
              <p>4 sản phẩm · 28 vấn đề da.</p>
              <p>Không hóa chất độc hại.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <Button variant="primary" size="lg">
              Mua ngay
            </Button>
            <Button variant="text" size="lg" className="group">
              Tìm hiểu thêm <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </motion.div>
        </div>

        {/* Product Highlight Image */}
        <motion.div 
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="relative aspect-[4/5] max-w-sm ml-auto hidden lg:block"
        >
          <div className="absolute inset-0 bg-surface rounded-sm -rotate-2" />
          <div className="relative z-10 w-full h-full overflow-hidden rounded-sm border border-surface shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800&auto=format&fit=crop"
              alt="Featured Product"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[11px] uppercase tracking-[0.12em] text-muted flex flex-col items-center gap-2"
        >
          <span>Cuộn để khám phá</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
