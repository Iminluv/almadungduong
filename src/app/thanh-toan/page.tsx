"use client";

import { useCart } from "@/lib/store/useCart";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

type Step = "info" | "shipping" | "payment" | "success";

export default function CheckoutPage() {
  const { items, getTotalPrice, updateQuantity, removeItem } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [isMounted, setIsMounted] = useState(false);
  const [shippingRate, setShippingRate] = useState<{ baseFee: number; freeThreshold: number | null } | null>(null);

  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    district: "",
  });

  // Pre-fill profile and default address on auth
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user;
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
      }));

      // Fetch user addresses to find default address
      fetch("/api/user/addresses")
        .then((res) => res.json())
        .then((data) => {
          if (data.addresses && data.addresses.length > 0) {
            const defaultAddress = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
            if (defaultAddress) {
              setFormData((prev) => ({
                ...prev,
                fullName: defaultAddress.fullName || prev.fullName,
                phone: defaultAddress.phone || prev.phone,
                street: defaultAddress.street + (defaultAddress.ward ? `, ${defaultAddress.ward}` : ""),
                city: defaultAddress.city,
                district: defaultAddress.district,
              }));
            }
          }
        })
        .catch((err) => console.error("Failed to fetch user addresses in checkout:", err));
    }
  }, [status, session]);

  useEffect(() => {
    setIsMounted(true);
    fetch("/api/shipping")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data) {
          setShippingRate({
            baseFee: resData.data.baseFee,
            freeThreshold: resData.data.freeThreshold,
          });
        }
      })
      .catch((err) => console.error("Failed to fetch shipping rate:", err));
  }, []);

  const freeThreshold = shippingRate?.freeThreshold ?? 1_000_000;
  const baseFee = shippingRate?.baseFee ?? 30_000;

  // Shipping fee calculation
  const subtotal = useMemo(() => (isMounted ? getTotalPrice() : 0), [isMounted, items, getTotalPrice]);
  const isFreeShipping = subtotal >= freeThreshold;
  const shippingFee = isFreeShipping ? 0 : baseFee;
  const totalPrice = subtotal + shippingFee;
  const amountToFreeShip = Math.max(0, freeThreshold - subtotal);
  const freeShipProgress = Math.min(1, subtotal / freeThreshold);

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
                  {step === "info" && (
                    <InfoStep
                      formData={formData}
                      setFormData={setFormData}
                      onNext={() => setStep("shipping")}
                    />
                  )}
                  {step === "shipping" && <ShippingStep onNext={() => setStep("payment")} onBack={() => setStep("info")} shippingFee={shippingFee} isFreeShipping={isFreeShipping} formatPrice={formatPrice} freeThreshold={freeThreshold} baseFee={baseFee} />}
                  {step === "payment" && <PaymentStep onNext={() => setStep("success")} onBack={() => setStep("shipping")} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-surface p-8 rounded-sm sticky top-28">
                <h2 className="text-xl font-display font-bold mb-8">Tóm tắt đơn hàng</h2>

                {/* Product list with +/- controls */}
                <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.variant}`}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 group"
                      >
                        {/* Product image */}
                        <div className="relative w-16 aspect-square bg-bg rounded-sm overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>

                        {/* Product info + controls */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <p className="font-semibold text-text text-sm line-clamp-1">{item.title}</p>
                              {item.variant && (
                                <p className="text-[11px] text-muted uppercase tracking-wider mt-0.5">{item.variant}</p>
                              )}
                            </div>
                            {/* Remove button */}
                            <button
                              onClick={() => removeItem(item.id, item.variant)}
                              className="text-muted hover:text-red-500 transition-colors p-0.5 opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                              title="Xóa sản phẩm"
                              aria-label={`Xóa ${item.title}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-bg/60 rounded-sm bg-bg">
                              <button
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    updateQuantity(item.id, item.quantity - 1, item.variant);
                                  }
                                }}
                                disabled={item.quantity <= 1}
                                className={cn(
                                  "w-7 h-7 flex items-center justify-center text-sm transition-colors",
                                  item.quantity <= 1
                                    ? "text-muted/40 cursor-not-allowed"
                                    : "text-text hover:bg-surface"
                                )}
                                aria-label="Giảm số lượng"
                              >
                                −
                              </button>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="w-7 text-center text-xs font-bold select-none"
                              >
                                {item.quantity}
                              </motion.span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                                className="w-7 h-7 flex items-center justify-center text-sm text-text hover:bg-surface transition-colors"
                                aria-label="Tăng số lượng"
                              >
                                +
                              </button>
                            </div>

                            {/* Item total price */}
                            <motion.p
                              key={item.price * item.quantity}
                              initial={{ scale: 1.05 }}
                              animate={{ scale: 1 }}
                              className="text-sm font-bold text-text"
                            >
                              {formatPrice(item.price * item.quantity)}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Shipping progress bar */}
                <div className="mt-6 pt-6 border-t border-bg/50">
                  <AnimatePresence mode="wait">
                    {isFreeShipping ? (
                      <motion.div
                        key="freeship-achieved"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2 p-3 bg-accent/10 rounded-sm"
                      >
                        <span className="text-lg">🎉</span>
                        <p className="text-xs font-semibold text-accent">
                          Chúc mừng! Đơn hàng của bạn được <span className="uppercase tracking-wider">miễn phí vận chuyển</span>
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="freeship-progress"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="space-y-2"
                      >
                        <p className="text-xs text-muted">
                          Mua thêm <span className="font-bold text-accent">{formatPrice(amountToFreeShip)}</span> để được <span className="font-semibold text-accent">miễn phí vận chuyển</span>
                        </p>
                        <div className="w-full h-1.5 bg-bg rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${freeShipProgress * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-[10px] text-muted/70 italic">
                          Freeship với đơn hàng trên {formatPrice(freeThreshold)} • Đồng giá {formatPrice(baseFee)} toàn quốc
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price breakdown */}
                <div className="mt-6 pt-6 border-t border-bg/50 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Tạm tính</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      className="font-medium"
                    >
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Phí vận chuyển</span>
                    <AnimatePresence mode="wait">
                      {isFreeShipping ? (
                        <motion.span
                          key="free"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="text-accent font-medium uppercase tracking-widest text-[11px]"
                        >
                          Miễn phí
                        </motion.span>
                      ) : (
                        <motion.span
                          key="paid"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="font-medium text-text"
                        >
                          {formatPrice(baseFee)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-bg/30">
                    <span className="text-lg font-bold uppercase tracking-wider">Tổng cộng</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-2xl font-bold text-text"
                    >
                      {formatPrice(totalPrice)}
                    </motion.span>
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

/* ─── Sub-components ────────────────────────────────────────────── */

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function InputField({ label, type = "text", placeholder, value, onChange, required }: InputFieldProps) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] uppercase font-bold tracking-[0.1em] text-muted group-focus-within:text-accent transition-colors">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-surface py-2 focus:outline-none focus:border-accent transition-all text-sm placeholder:text-muted/40"
      />
    </div>
  );
}

interface InfoStepProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    district: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    district: string;
  }>>;
  onNext: () => void;
}

function InfoStep({ formData, setFormData, onNext }: InfoStepProps) {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Họ & Tên"
          placeholder="Nguyễn Văn A"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          required
        />
        <InputField
          label="Số điện thoại"
          placeholder="0901 xxx xxx"
          value={formData.phone}
          onChange={handleChange("phone")}
          required
        />
      </div>
      <InputField
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        value={formData.email}
        onChange={handleChange("email")}
        required
      />
      <div className="space-y-6 pt-4">
        <h3 className="text-lg font-display font-semibold">Địa chỉ giao hàng</h3>
        <InputField
          label="Địa chỉ cụ thể"
          placeholder="Số nhà, tên đường, phường/xã..."
          value={formData.street}
          onChange={handleChange("street")}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Tỉnh / Thành phố"
            placeholder="Hồ Chí Minh"
            value={formData.city}
            onChange={handleChange("city")}
            required
          />
          <InputField
            label="Quận / Huyện"
            placeholder="Quận 1"
            value={formData.district}
            onChange={handleChange("district")}
            required
          />
        </div>
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto px-12">
        Tiếp tục vận chuyển
      </Button>
    </form>
  );
}

function ShippingStep({ onNext, onBack, shippingFee, isFreeShipping, formatPrice, freeThreshold, baseFee }: {
  onNext: () => void;
  onBack: () => void;
  shippingFee: number;
  isFreeShipping: boolean;
  formatPrice: (p: number) => string;
  freeThreshold: number;
  baseFee: number;
}) {
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
          <AnimatePresence mode="wait">
            {isFreeShipping ? (
              <motion.p
                key="free-label"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-sm font-bold uppercase tracking-widest text-accent"
              >
                Miễn phí
              </motion.p>
            ) : (
              <motion.p
                key="fee-label"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-sm font-bold text-text"
              >
                {formatPrice(shippingFee)}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Shipping fee policy table */}
        <div className="rounded-sm overflow-hidden border border-surface">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-bg">
                <th className="text-left px-4 py-2.5 font-bold text-muted uppercase tracking-wider text-[10px]">Giá trị đơn hàng</th>
                <th className="text-right px-4 py-2.5 font-bold text-muted uppercase tracking-wider text-[10px]">Phí vận chuyển</th>
              </tr>
            </thead>
            <tbody>
              <tr className={cn(
                "border-t border-surface transition-colors",
                !isFreeShipping && "bg-accent/5"
              )}>
                <td className="px-4 py-3 text-text">Dưới {formatPrice(freeThreshold)}</td>
                <td className="px-4 py-3 text-right font-semibold text-text">{formatPrice(baseFee)}</td>
              </tr>
              <tr className={cn(
                "border-t border-surface transition-colors",
                isFreeShipping && "bg-accent/5"
              )}>
                <td className="px-4 py-3 text-text">Từ {formatPrice(freeThreshold)} trở lên</td>
                <td className="px-4 py-3 text-right font-semibold text-accent">Miễn phí ✨</td>
              </tr>
            </tbody>
          </table>
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
