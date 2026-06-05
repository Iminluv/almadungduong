"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  orderData: {
    id: string;
    transferCode: string;
    amount: number;
    shippingFee: number;
    totalAmount: number;
    bankAccount: string;
    bankName: string;
    accountName: string;
    qrUrl: string;
    expiresAt: string;
  } | null;
}

export function CheckoutModal({ isOpen, onClose, onSuccess, orderData }: CheckoutModalProps) {
  const [status, setStatus] = useState<"pending" | "completed" | "expired">("pending");
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds
  const [claimCooldown, setClaimCooldown] = useState<number>(120); // 2 minutes in seconds
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [claimMessage, setClaimMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [pollInterval, setPollInterval] = useState<number | null>(null);

  // Parse expiry timestamp
  const expiryTime = useMemo(() => {
    if (!orderData?.expiresAt) return 0;
    return new Date(orderData.expiresAt).getTime();
  }, [orderData?.expiresAt]);

  // Handle countdown timers
  useEffect(() => {
    if (!isOpen || !orderData || status !== "pending") return;

    // Calculate initial time left
    const calculateTimeLeft = () => {
      const diff = Math.floor((expiryTime - Date.now()) / 1000);
      if (diff <= 0) {
        setStatus("expired");
        localStorage.removeItem("alma-pending-payment");
        return 0;
      }
      return diff;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, orderData, expiryTime, status]);

  // Handle manual claim cooldown
  useEffect(() => {
    if (!isOpen || status !== "pending" || claimCooldown <= 0) return;

    const timer = setInterval(() => {
      setClaimCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, status, claimCooldown]);

  // Reset local state when modal opens with new order
  useEffect(() => {
    if (isOpen && orderData) {
      setStatus("pending");
      setClaimCooldown(120);
      setClaimMessage(null);
      setCopiedField(null);
      setPollInterval(null);
    }
  }, [isOpen, orderData]);

  // Polling Status Logic
  const checkStatus = async () => {
    if (!orderData) return;
    try {
      const res = await fetch(`/api/payment-status/${orderData.transferCode}`);
      const data = await res.json();

      if (data.status === "completed") {
        setStatus("completed");
        localStorage.removeItem("alma-pending-payment");
        setTimeout(() => {
          onSuccess();
        }, 2500);
      } else if (data.status === "expired") {
        setStatus("expired");
        localStorage.removeItem("alma-pending-payment");
      }
    } catch (error) {
      console.error("Error polling payment status:", error);
    }
  };

  useEffect(() => {
    if (!isOpen || !orderData || status !== "pending") return;

    // Wait 10s before the first poll
    const initialTimeout = setTimeout(() => {
      checkStatus();
      // Start polling at 5s interval
      setPollInterval(5000);
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [isOpen, orderData, status]);

  useEffect(() => {
    if (!pollInterval || status !== "pending" || !isOpen) return;

    const timer = setInterval(() => {
      checkStatus();
    }, pollInterval);

    return () => clearInterval(timer);
  }, [pollInterval, status, isOpen]);

  // Slow down polling to 10s after 2 minutes
  useEffect(() => {
    if (!isOpen || status !== "pending") return;

    const slowDownTimeout = setTimeout(() => {
      setPollInterval(10000);
    }, 120000);

    return () => clearTimeout(slowDownTimeout);
  }, [isOpen, status]);

  // Format time (MM:SS)
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  // Manual payment claim
  const handleManualClaim = async () => {
    if (!orderData || claimCooldown > 0 || isClaiming) return;
    setIsClaiming(true);
    setClaimMessage(null);

    try {
      const res = await fetch("/api/claim-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transferCode: orderData.transferCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setClaimMessage(data.message);
      } else {
        setClaimMessage(data.error || "Gửi yêu cầu thất bại.");
      }
    } catch (err) {
      console.error(err);
      setClaimMessage("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsClaiming(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!orderData || isCancelling) return;
    setIsCancelling(true);

    try {
      const res = await fetch(`/api/payment-status/${orderData.transferCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        localStorage.removeItem("alma-pending-payment");
        onClose();
      } else {
        console.error("Failed to cancel order");
      }
    } catch (err) {
      console.error("Error calling cancel API:", err);
    } finally {
      setIsCancelling(false);
    }
  };

  if (!isOpen || !orderData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => status !== "pending" && onClose()}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-md shadow-2xl border border-neutral-100 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">Thanh toán chuyển khoản</h3>
              <p className="text-xs text-neutral-500">Mã giao dịch: {orderData.transferCode}</p>
            </div>
            {status === "pending" && (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Chờ thanh toán: {formatTime(timeLeft)}
              </div>
            )}
            {status !== "pending" && (
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6">
            {status === "completed" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-neutral-800">Thanh toán thành công!</h4>
                <p className="text-neutral-600 max-w-sm text-sm">
                  Cảm ơn bạn! Alma đã xác thực khoản thanh toán thành công. Đang chuyển hướng bạn đến lịch sử đơn hàng...
                </p>
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mt-4" />
              </motion.div>
            )}

            {status === "expired" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-3xl font-bold">
                  !
                </div>
                <h4 className="text-xl font-bold text-neutral-800">Giao dịch hết hạn</h4>
                <p className="text-neutral-600 max-w-sm text-sm">
                  Thời gian thanh toán 10 phút đã trôi qua. Đơn hàng hiện tại đã bị hủy. Vui lòng đóng cửa sổ này và thực hiện đặt hàng lại.
                </p>
                <Button variant="outline" className="mt-4" onClick={onClose}>
                  Đóng cửa sổ
                </Button>
              </motion.div>
            )}

            {status === "pending" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* QR Code Column */}
                <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-100 pb-6 md:pb-0 md:pr-6">
                  <div className="relative p-2 bg-neutral-50 border border-neutral-200/80 rounded-md shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={orderData.qrUrl}
                      alt="VietQR SePay"
                      className="w-full max-w-[200px] h-auto object-contain mx-auto"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400 text-center mt-3 max-w-[180px]">
                    Quét mã QR bằng ứng dụng ngân hàng để tự động điền thông tin chuyển khoản.
                  </p>
                </div>

                {/* Details Column */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Thông tin chuyển khoản</p>
                    
                    {/* Bank Name */}
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50/50">
                      <span className="text-sm text-neutral-500">Ngân hàng</span>
                      <span className="text-sm font-semibold text-neutral-800">{orderData.bankName}</span>
                    </div>

                    {/* Account Number */}
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50/50">
                      <span className="text-sm text-neutral-500">Số tài khoản</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold text-neutral-800">{orderData.bankAccount}</span>
                        <button
                          onClick={() => handleCopy(orderData.bankAccount, "acc")}
                          className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                          title="Sao chép"
                        >
                          {copiedField === "acc" ? (
                            <span className="text-[10px] text-emerald-600 font-sans font-bold">Đã chép</span>
                          ) : (
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Account Name */}
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50/50">
                      <span className="text-sm text-neutral-500">Chủ tài khoản</span>
                      <span className="text-sm font-semibold text-neutral-850 uppercase">{orderData.accountName}</span>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50/50">
                      <span className="text-sm text-neutral-500">Số tiền chuyển</span>
                      <div className="flex items-center gap-2">
                        <span className="text-md font-extrabold text-neutral-900">
                          {orderData.totalAmount.toLocaleString("vi-VN")}đ
                        </span>
                        <button
                          onClick={() => handleCopy(orderData.totalAmount.toString(), "amt")}
                          className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                          title="Sao chép số tiền"
                        >
                          {copiedField === "amt" ? (
                            <span className="text-[10px] text-emerald-600 font-sans font-bold">Đã chép</span>
                          ) : (
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Transfer Content */}
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50/50">
                      <span className="text-sm text-neutral-500">Nội dung chuyển khoản</span>
                      <div className="flex items-center gap-2 bg-amber-50/40 px-2 py-0.5 border border-amber-100/50 rounded">
                        <span className="text-sm font-mono font-black text-amber-800">{orderData.transferCode}</span>
                        <button
                          onClick={() => handleCopy(orderData.transferCode, "code")}
                          className="text-amber-500 hover:text-amber-700 transition-colors p-1"
                          title="Sao chép nội dung"
                        >
                          {copiedField === "code" ? (
                            <span className="text-[10px] text-emerald-600 font-sans font-bold">Đã chép</span>
                          ) : (
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Note / Warnings */}
                  <div className="bg-neutral-50 border border-neutral-100 rounded p-3 text-xs text-neutral-600 leading-relaxed">
                    <strong className="text-neutral-700">Lưu ý quan trọng:</strong> Quý khách vui lòng điền <span className="font-bold text-amber-700">chính xác nội dung chuyển khoản</span> phía trên để hệ thống tự động xác nhận đơn hàng trong vòng 30 giây.
                  </div>

                  {/* Action / Manual Claim section */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleManualClaim}
                      disabled={claimCooldown > 0 || isClaiming}
                      className={`w-full py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        claimCooldown > 0
                          ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/50"
                          : "bg-neutral-800 hover:bg-neutral-900 text-white shadow-md active:translate-y-0.5"
                      }`}
                    >
                      {isClaiming ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                          Đang gửi yêu cầu...
                        </span>
                      ) : claimCooldown > 0 ? (
                        `Tôi đã chuyển khoản (Chờ xác nhận tự động ${formatTime(claimCooldown)})`
                      ) : (
                        "Tôi đã chuyển khoản (Yêu cầu duyệt thủ công)"
                      )}
                    </button>

                    <button
                      onClick={handleCancelOrder}
                      disabled={isCancelling}
                      className="w-full py-2 px-4 rounded text-xs font-semibold uppercase tracking-wider text-rose-600 hover:bg-rose-50 border border-rose-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isCancelling ? "Đang hủy..." : "Hủy giao dịch & Quay lại"}
                    </button>

                    {claimMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-center font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded py-2 px-3"
                      >
                        {claimMessage}
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
