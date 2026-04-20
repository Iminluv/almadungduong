"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function MonthlyDeal() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <div className="bg-bg border border-surface overflow-hidden flex flex-col lg:flex-row">
          {/* Image Side */}
          <div className="lg:w-1/2 relative min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop"
              alt="Monthly Deal"
              fill
              className="object-cover"
            />
            <div className="absolute top-8 left-8 bg-accent text-white px-4 py-2 font-display font-bold uppercase tracking-widest text-sm">
              Deal của tháng
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent">Giới hạn thời gian</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold leading-tight">
                Combo Phục Hồi <br />
                Hệ Vi Sinh Toàn Diện
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-md">
                Bộ 3 sản phẩm chủ chốt giúp tái thiết lập hàng rào bảo vệ tự nhiên, giảm kích ứng và nuôi dưỡng da chuyên sâu.
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-display font-bold text-text">1.250.000đ</span>
              <span className="text-lg text-muted line-through">1.580.000đ</span>
              <span className="bg-accent/10 text-accent px-2 py-1 text-xs font-bold rounded-sm">-20%</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg">
                Sở hữu ngay
              </Button>
              <Button variant="text" size="lg">
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
