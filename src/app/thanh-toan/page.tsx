"use client";

import { useCart } from "@/lib/store/useCart";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Step = "info" | "shipping" | "payment" | "success";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <p className="text-xl font-display font-medium text-muted italic">Giỏ hàng của bạn đang trống.</p>
        <Link href="/san-pham">
          <Button variant="primary" size="lg">Quay lại mua sắm</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <main className="min-h-screen bg-bg py-12 md:py-20">
      <div className="container-custom max-w-6xl">
        {step !== "success" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Main Flow */}
            <div className="lg:col-span-7 space-y-12">
              {/* Stepper */}
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-surface z-0 -translate-y-1/2" />

                {[
                  { id: "info", label: "Thông tin", stepNum: 1 },
                  { id: "shipping", label: "Vận chuyển", stepNum: 2 },
                  { id: "payment", label: "Thanh toán", stepNum: 3 }
                ].map((s, idx) => {
                  const isActive = step === s.id;
                  const isCompleted = ["shipping", "payment", "success"].includes(step) && idx < ["info", "shipping", "payment"].indexOf(step);

                  return (
                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 bg-bg px-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                        isActive ? "bg-accent text-white" : isCompleted ? "bg-surface text-text" : "bg-bg border border-surface text-muted"
                      )}>
                        {isCompleted ? "✓" : s.stepNum}
                      </div>
                      <span className={cn(
                        "text-[11px] uppercase tracking-widest font-bold",
                        isActive ? "text-text" : "text-muted"
                      )}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {step === "info" && <InfoStep onNext={() => setStep("shipping")} />}
                  {step === "shipping" && <ShippingStep onNext={() => setStep("payment")} onBack={() => setStep("info")} />}
                  {step === "payment" && <PaymentStep onNext={() => setStep("success")} onBack={() => setStep("shipping")} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5">
              <div className="bg-surface p-8 rounded-sm sticky top-28">
                <h2 className="text-xl font-display font-bold mb-8">Tóm tắt đơn hàng</h2>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                      <div className="relative w-16 aspect-square bg-bg rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-bg text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-semibold text-text">{item.title}</p>
                        {item.variant && <p className="text-[11px] text-muted uppercase tracking-wider">{item.variant}</p>}
                        <p className="mt-1 font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-bg/50 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Tạm tính</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Giao hàng</span>
                    <span className="text-accent font-medium uppercase tracking-widest text-[11px]">Miễn phí</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-bold uppercase tracking-wider">Tổng cộng</span>
                    <span className="text-2xl font-bold text-text">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SuccessStep />
        )}
      </div>
    </main>
  );
}

function InputField({ label, type = "text", placeholder }: { label: string, type?: string, placeholder?: string }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] uppercase font-bold tracking-[0.1em] text-muted group-focus-within:text-accent transition-colors">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-surface py-2 focus:outline-none focus:border-accent transition-all text-sm placeholder:text-muted/40"
      />
    </div>
  );
}

function InfoStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Họ & Tên" placeholder="Nguyễn Văn A" />
        <InputField label="Số điện thoại" placeholder="0901 xxx xxx" />
      </div>
      <InputField label="Email" type="email" placeholder="example@gmail.com" />
      <div className="space-y-6 pt-4">
        <h3 className="text-lg font-display font-semibold">Địa chỉ giao hàng</h3>
        <InputField label="Địa chỉ cụ thể" placeholder="Số nhà, tên đường, phường/xã..." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Tỉnh / Thành phố" placeholder="Hồ Chí Minh" />
          <InputField label="Quận / Huyện" placeholder="Quận 1" />
        </div>
      </div>
      <Button variant="primary" size="lg" className="w-full md:w-auto px-12" onClick={onNext}>
        Tiếp tục vận chuyển
      </Button>
    </div>
  );
}

function ShippingStep({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-display font-semibold">Phương thức vận chuyển</h3>
        <div className="p-4 border border-accent bg-accent/5 rounded-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold">Giao hàng tiêu chuẩn</p>
              <p className="text-xs text-muted">2-4 ngày làm việc</p>
            </div>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Miễn phí</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="primary" size="lg" className="px-12" onClick={onNext}>
          Tiếp tục thanh toán
        </Button>
        <button onClick={onBack} className="text-sm font-bold uppercase tracking-widest text-muted hover:text-text py-4 px-6 transition-colors">
          Quay lại
        </button>
      </div>
    </div>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-display font-semibold">Phương thức thanh toán</h3>
        <div className="space-y-3">
          {[
            { id: "cod", label: "COD — Thanh toán khi nhận hàng", desc: "Trả tiền mặt khi Shipper giao hàng đến." },
            { id: "vnpay", label: "VNPay", desc: "Quét mã QR hoặc thanh toán qua cổng VNPay." },
            { id: "momo", label: "Ví MoMo", desc: "Thanh toán nhanh qua ứng dụng MoMo." }
          ].map((method) => (
            <div key={method.id} className="p-4 border border-surface hover:border-text/30 rounded-sm cursor-pointer transition-all flex items-start gap-4">
              <div className="w-4 h-4 rounded-full border border-muted mt-1" />
              <div>
                <p className="text-sm font-semibold">{method.label}</p>
                <p className="text-[12px] text-muted">{method.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="primary" size="lg" className="px-12" onClick={onNext}>
          Hoàn tất đặt hàng
        </Button>
        <button onClick={onBack} className="text-sm font-bold uppercase tracking-widest text-muted hover:text-text py-4 px-6 transition-colors">
          Quay lại
        </button>
      </div>
    </div>
  );
}

function SuccessStep() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto text-center space-y-8 py-20"
    >
      <div className="w-20 h-20 bg-accent text-bg rounded-full text-4xl flex items-center justify-center mx-auto mb-12">
        ✓
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold">Đặt hàng thành công!</h1>
        <p className="text-lg text-muted italic font-serif">Mã đơn hàng: #ALMA-180422. Cảm ơn bạn đã tin chọn Mỹ phẩm Vi sinh Hoa Ngân.</p>
      </div>
      <p className="text-text/70 leading-relaxed">Thông tin xác nhận đơn hàng đã được gửi về email của bạn. Chuyên viên tư vấn sẽ liên hệ sớm nhất để xác nhận lộ trình chăm sóc da 1:1.</p>
      <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/san-pham">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">Tiếp tục mua sắm</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">Về trang chủ</Button>
        </Link>
      </div>
    </motion.div>
  );
}

import { cn } from "@/lib/utils";
