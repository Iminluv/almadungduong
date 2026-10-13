"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Step = "phone" | "otp" | "success";

export default function PhoneVerificationPopupPage() {
  const { data: session, status, update } = useSession();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [autoCloseCountdown, setAutoCloseCountdown] = useState(3);

  const otpInputRef = useRef<HTMLInputElement>(null);

  // Focus OTP input when transitioning to OTP step
  useEffect(() => {
    if (step === "otp") {
      setCountdown(60);
      setCanResend(false);
      setTimeout(() => otpInputRef.current?.focus(), 150);
    }
  }, [step]);

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Success auto-close timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "success") {
      timer = setInterval(() => {
        setAutoCloseCountdown((prev) => {
          if (prev <= 1) {
            handleClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.close();
    }
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const clean = phone.trim();
    if (!clean) {
      setErrorMessage("Vui lòng nhập số điện thoại.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/phone-verification/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Gửi mã OTP thất bại. Vui lòng thử lại.");
        return;
      }

      setStep("otp");
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (otp.length !== 6) {
      setErrorMessage("Mã OTP phải gồm 6 chữ số.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/phone-verification/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), otp: otp.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Mã xác thực không hợp lệ.");
        return;
      }

      // Notify parent window (Google One Tap pattern)
      if (typeof window !== "undefined" && window.opener) {
        window.opener.postMessage(
          { type: "PHONE_VERIFIED", phone: data.phone },
          "*"
        );
      }

      // Trigger session refresh in current context if supported
      await update?.();

      setStep("success");
    } catch {
      setErrorMessage("Đã có lỗi xảy ra trong quá trình xác thực mã OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Loading Session State
  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FDFBF7] p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2D5A27] border-t-transparent" />
          <p className="text-sm font-medium text-navy/70">Đang tải thông tin tài khoản...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#FDFBF7] p-6">
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/web-icon-192.png"
              alt="Alma Dung Dưỡng"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="font-serif text-sm font-semibold tracking-wide text-navy">
              Alma Dung Dưỡng
            </span>
          </div>
          <button
            onClick={handleClose}
            className="rounded p-1 text-black/40 hover:bg-black/5 hover:text-black/80"
          >
            ✕
          </button>
        </div>

        <div className="my-auto text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="font-serif text-lg font-bold text-navy">Yêu cầu đăng nhập</h2>
          <p className="mt-2 text-sm leading-relaxed text-black/60">
            Vui lòng đăng nhập tài khoản Alma Dungduong của bạn trên trang web trước khi thực hiện xác thực số điện thoại.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <button
            onClick={handleClose}
            className="w-full rounded-[3px] bg-navy py-3 text-xs font-semibold tracking-wider text-white uppercase hover:bg-navy/90"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    );
  }

  // 3. Already Verified State
  if (session?.user?.phoneVerified) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#FDFBF7] p-6 text-center">
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/web-icon-192.png"
              alt="Alma Dung Dưỡng"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="font-serif text-sm font-semibold tracking-wide text-navy">
              Alma Dung Dưỡng
            </span>
          </div>
          <button
            onClick={handleClose}
            className="rounded p-1 text-black/40 hover:bg-black/5 hover:text-black/80"
          >
            ✕
          </button>
        </div>

        <div className="my-auto">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-[#2D5A27]">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-lg font-bold text-navy">Số điện thoại đã được xác thực</h2>
          <p className="mt-2 text-sm text-black/60">
            Tài khoản của bạn đã được liên kết và bảo vệ với số điện thoại:
          </p>
          <div className="mt-3 inline-block rounded-full bg-emerald-50 px-4 py-1.5 font-mono text-sm font-semibold text-[#2D5A27]">
            {session.user.phone || "Đã xác thực"}
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleClose}
            className="w-full rounded-[3px] bg-navy py-3 text-xs font-semibold tracking-wider text-white uppercase hover:bg-navy/90"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    );
  }

  // 4. Main Verification Workflow
  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#FDFBF7] p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/web-icon-192.png"
            alt="Alma Dung Dưỡng"
            width={26}
            height={26}
            className="rounded-full"
          />
          <div>
            <div className="font-serif text-xs font-semibold tracking-wider text-navy uppercase">
              Alma Dung Dưỡng
            </div>
            <div className="text-[11px] text-black/40">Bảo mật tài khoản</div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="rounded p-1 text-black/40 hover:bg-black/5 hover:text-black/80"
          title="Đóng cửa sổ"
        >
          ✕
        </button>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-2">
        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.div
              key="step-phone"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#2D5A27]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-lg font-bold text-navy">Xác thực số điện thoại</h2>
                <p className="mt-1 text-xs text-black/60">
                  Nhập số điện thoại của bạn để nhận mã xác thực OTP qua tin nhắn SMS
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 rounded border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold tracking-wider text-navy uppercase">
                    Số điện thoại (+84)
                  </label>
                  <div className="relative flex rounded border border-black/15 bg-white transition-focus focus-within:border-[#2D5A27] focus-within:ring-1 focus-within:ring-[#2D5A27]">
                    <span className="flex items-center border-r border-black/10 px-3 font-mono text-xs font-semibold text-black/50">
                      🇻🇳 +84
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full bg-transparent px-3 py-2.5 font-mono text-sm tracking-wide text-navy placeholder:text-black/30 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-[3px] bg-[#2D5A27] py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#23461e] disabled:opacity-50"
                >
                  {isLoading ? "Đang gửi mã..." : "Gửi mã xác thực"}
                </button>
              </form>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="step-otp"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#2D5A27]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-lg font-bold text-navy">Nhập mã OTP</h2>
                <p className="mt-1 text-xs text-black/60">
                  Đã gửi mã đến số{" "}
                  <span className="font-semibold text-navy">{phone}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep("phone");
                  }}
                  className="mt-1 text-[11px] text-[#2D5A27] underline hover:opacity-80"
                >
                  Thay đổi số điện thoại
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 rounded border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="mb-1 block text-center text-xs font-semibold tracking-wider text-navy uppercase">
                    Mã 6 chữ số
                  </label>
                  <input
                    ref={otpInputRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="w-full rounded border border-black/15 bg-white py-3 text-center font-mono text-2xl tracking-[0.5em] text-navy focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-black/60">
                  <span>Chưa nhận được mã?</span>
                  {canResend ? (
                    <button
                      type="button"
                      onClick={() => handleSendOtp()}
                      disabled={isLoading}
                      className="font-semibold text-[#2D5A27] hover:underline"
                    >
                      Gửi lại mã OTP
                    </button>
                  ) : (
                    <span className="font-mono text-black/40">Gửi lại sau {countdown}s</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full rounded-[3px] bg-[#2D5A27] py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#23461e] disabled:opacity-50"
                >
                  {isLoading ? "Đang xác thực..." : "Xác nhận & Hoàn tất"}
                </button>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="py-4 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#2D5A27]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-xl font-bold text-navy">Xác thực thành công!</h2>
              <p className="mt-2 text-xs leading-relaxed text-black/60">
                Số điện thoại của bạn đã được liên kết với tài khoản Alma Dungduong thành công.
              </p>
              <p className="mt-4 text-[11px] text-black/40">
                Cửa sổ sẽ tự động đóng sau{" "}
                <span className="font-mono font-bold text-navy">{autoCloseCountdown}s</span>
              </p>

              <button
                onClick={handleClose}
                className="mt-5 w-full rounded-[3px] bg-navy py-3 text-xs font-semibold tracking-wider text-white uppercase hover:bg-navy/90"
              >
                Đóng cửa sổ ngay
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="border-t border-black/5 pt-3 text-center text-[10px] text-black/40">
        Alma Dung Dưỡng · Mỹ phẩm Vi sinh Hoa Ngân
      </div>
    </div>
  );
}
