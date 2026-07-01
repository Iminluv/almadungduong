"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  ward: string | null;
  district: string;
  city: string;
  isDefault: boolean;
}

interface Favorite {
  id: string;
  productId: string;
  product: {
    id: string;
    slug: string;
    image: string;
    category?: string;
    title: string;
    rating: number;
    reviewsCount: number;
    price: number;
    originalPrice?: number;
    flag?: string;
    volume?: string;
  };
}

interface LoyaltyBenefit {
  label: string;
  value: string;
}

interface LoyaltyTier {
  name: string;
  slug: string;
  icon: string;
  condition: string;
  benefits: LoyaltyBenefit[];
}

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  image: string | null;
  totalSpent: number;
  createdAt: string;
  loyaltyTier: LoyaltyTier | null;
  hasPassword: boolean;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  "uom-mam": { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", border: "border-[#2E7D32]" },
  "dung-duong": { bg: "bg-[#E3F2FD]", text: "text-[#1565C0]", border: "border-[#1565C0]" },
  "no-ro": { bg: "bg-[#FFF3E0]", text: "text-[#E65100]", border: "border-[#E65100]" },
};

export default function AccountView() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "favorites" | "profile">("overview");

  // Authentication forms
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast("Vui lòng nhập email.", "error");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Đã gửi yêu cầu đặt lại mật khẩu.", "success");
        setForgotEmail("");
        setShowForgotPassword(false);
      } else {
        showToast(data.error || "Gửi yêu cầu thất bại.", "error");
      }
    } catch (e) {
      showToast("Đã xảy ra lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };


  // API loading states
  const [profileLoading, setProfileLoading] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // API data states
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Address CRUD modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    id: "",
    label: "Nhà",
    fullName: "",
    phone: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    isDefault: false,
  });

  // Profile forms
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Fetch functions
  const fetchProfile = async () => {
    setProfileLoading(true);
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (res.ok) {
        setProfile(data.user);
        setProfileName(data.user.name || "");
        setProfilePhone(data.user.phone || "");
      }
    } catch (e) {
      console.error("Fetch profile failed", e);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchAddresses = async () => {
    setAddressesLoading(true);
    try {
      const res = await fetch("/api/user/addresses");
      const data = await res.json();
      if (res.ok) {
        setAddresses(data.addresses);
      }
    } catch (e) {
      console.error("Fetch addresses failed", e);
    } finally {
      setAddressesLoading(false);
    }
  };

  const fetchFavorites = async () => {
    setFavoritesLoading(true);
    try {
      const res = await fetch("/api/user/favorites");
      const data = await res.json();
      if (res.ok) {
        setFavorites(data.favorites);
      }
    } catch (e) {
      console.error("Fetch favorites failed", e);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch("/api/user/orders");
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      }
    } catch (e) {
      console.error("Fetch orders failed", e);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
      fetchAddresses();
      fetchFavorites();
      fetchOrders();
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      router.push("/admin");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (activeTab === "orders" && status === "authenticated") {
      fetchOrders();
    }
  }, [activeTab, status]);

  // Auth actions
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      });

      if (res?.error) {
        showToast("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.", "error");
      } else {
        showToast("Đăng nhập thành công!", "success");
        setLoginEmail("");
        setLoginPassword("");
      }
    } catch (e) {
      showToast("Đã xảy ra lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          phone: registerPhone,
          password: registerPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Đăng ký thất bại.", "error");
      } else {
        showToast("Đăng ký thành công! Đang tự động đăng nhập...", "success");
        // Log in user automatically
        await signIn("credentials", {
          email: registerEmail,
          password: registerPassword,
          redirect: false,
        });
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPhone("");
        setRegisterPassword("");
      }
    } catch (e) {
      showToast("Đã xảy ra lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Address actions
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const isEdit = !!addressForm.id;
    const url = "/api/user/addresses";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressForm),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Thao tác thất bại.", "error");
      } else {
        showToast(data.message, "success");
        setIsAddressModalOpen(false);
        fetchAddresses();
      }
    } catch (e) {
      showToast("Lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    setActionLoading(true);
    try {
      const address = addresses.find((a) => a.id === addressId);
      if (!address) return;

      const res = await fetch("/api/user/addresses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...address, isDefault: true }),
      });

      if (res.ok) {
        showToast("Đã thiết lập địa chỉ mặc định.", "success");
        fetchAddresses();
      } else {
        const data = await res.json();
        showToast(data.error || "Thiết lập thất bại.", "error");
      }
    } catch (e) {
      showToast("Lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/user/addresses?id=${addressId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast("Đã xóa địa chỉ thành công.", "success");
        fetchAddresses();
      } else {
        const data = await res.json();
        showToast(data.error || "Xóa thất bại.", "error");
      }
    } catch (e) {
      showToast("Lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Profile update action
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profileName, phone: profilePhone }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Cập nhật hồ sơ thất bại.", "error");
      } else {
        showToast("Cập nhật hồ sơ thành công!", "success");
        await updateSession({ name: profileName, phone: profilePhone });
        fetchProfile();
      }
    } catch (e) {
      showToast("Lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      showToast("Vui lòng nhập mật khẩu mới.", "error");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Đổi mật khẩu thất bại.", "error");
      } else {
        showToast("Đổi mật khẩu thành công!", "success");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (e) {
      showToast("Lỗi hệ thống.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Loyalty calculations
  const getNextTierInfo = (totalSpent: number) => {
    if (totalSpent < 5000000) {
      return {
        nextTierName: "Dung Dưỡng",
        nextThreshold: 5000000,
        progress: (totalSpent / 5000000) * 100,
        remaining: 5000000 - totalSpent,
      };
    } else if (totalSpent < 15000000) {
      return {
        nextTierName: "Nở Rộ",
        nextThreshold: 15000000,
        progress: ((totalSpent - 5000000) / (15000000 - 5000000)) * 100,
        remaining: 15000000 - totalSpent,
      };
    } else {
      return {
        nextTierName: "Nở Rộ",
        nextThreshold: 15000000,
        progress: 100,
        remaining: 0,
      };
    }
  };

  const getMembershipMonths = (createdDateStr?: string) => {
    if (!createdDateStr) return 1;
    const start = new Date(createdDateStr);
    const end = new Date();
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(1, diffMonths);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-bg pt-28 pb-32">
        <div className="container-custom max-w-[460px]">
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-navy">Tài khoản</h1>
              <p className="text-muted font-serif italic text-sm">Chào mừng bạn đồng hành cùng Alma Dungduong.</p>
            </div>

            <div className="bg-surface p-8 shadow-sm border border-text/5 backdrop-blur-sm bg-surface/90">
              <div className="flex border-b border-text/10 mb-8">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                    authMode === "login" ? "text-text border-b-2 border-text" : "text-muted hover:text-text"
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => setAuthMode("register")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                    authMode === "register" ? "text-text border-b-2 border-text" : "text-muted hover:text-text"
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              {showForgotPassword ? (
                <form className="space-y-5" onSubmit={handleForgotPassword}>
                  <div className="space-y-4 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-navy">Quên mật khẩu?</h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Nhập địa chỉ email của bạn dưới đây. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của bạn nếu nó đã được đăng ký.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Email</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="email@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full bg-navy text-white py-4 text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 disabled:opacity-50 transition-all mt-4"
                  >
                    {actionLoading ? "Đang gửi..." : "Gửi yêu cầu"}
                  </button>

                  <div className="text-center text-xs mt-4">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="text-muted hover:text-text font-bold transition-colors uppercase tracking-wider"
                    >
                      Quay lại Đăng nhập
                    </button>
                  </div>
                </form>
              ) : authMode === "login" ? (
                <form className="space-y-5" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Email</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Mật khẩu</label>
                    <input
                      type="password"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[10px] uppercase tracking-widest text-muted hover:text-text font-bold transition-colors"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full bg-navy text-white py-4 text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 disabled:opacity-50 transition-all mt-4"
                  >
                    {actionLoading ? "Đang xử lý..." : "Truy cập ngay"}
                  </button>

                  <div className="relative flex py-3 items-center text-xs uppercase tracking-widest text-muted font-bold">
                    <div className="flex-grow border-t border-text/10"></div>
                    <span className="flex-shrink mx-4">hoặc</span>
                    <div className="flex-grow border-t border-text/10"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="w-full bg-white text-navy border border-text/10 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-50 transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15.02 0 12 0 7.37 0 3.39 2.67 1.47 6.57l3.79 2.94c.9-2.69 3.42-4.47 6.74-4.47z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.47-5.01 3.47-8.64z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.26 14.49c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.47 6.97C.53 8.87 0 10.97 0 13s.53 4.13 1.47 6.03l3.79-2.54z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.04.7-2.38 1.11-4.2 1.11-3.32 0-6.14-2.27-7.14-5.26L1.07 16.57C3.01 20.8 7.21 24 12 24z"
                      />
                    </svg>
                    Đăng nhập bằng Google
                  </button>

                  <div className="mt-6 text-center text-xs text-muted">
                    Chưa có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("register")}
                      className="text-text hover:text-accent font-bold transition-colors uppercase tracking-wider"
                    >
                      Đăng ký tại đây
                    </button>
                  </div>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleRegister}>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Họ và tên</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="Nguyễn Văn A"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Email</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="email@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Số điện thoại</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="09XXXXXXXX"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Mật khẩu</label>
                    <input
                      type="password"
                      className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors text-sm"
                      placeholder="Tối thiểu 6 ký tự"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      minLength={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full bg-navy text-white py-4 text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 disabled:opacity-50 transition-all mt-6"
                  >
                    {actionLoading ? "Đang xử lý..." : "Tạo tài khoản"}
                  </button>

                  <div className="mt-6 text-center text-xs text-muted">
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className="text-text hover:text-accent font-bold transition-colors uppercase tracking-wider"
                    >
                      Đăng nhập tại đây
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Action Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 z-[250]"
            >
              <div
                className={`px-6 py-4 shadow-2xl text-xs font-bold uppercase tracking-widest rounded-sm ${
                  toast.type === "success" ? "bg-navy text-white border-l-4 border-accent" : "bg-red-950 text-white border-l-4 border-red-500"
                }`}
              >
                {toast.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }

  // Loaded states for active user session
  const displayName = profile?.name || session?.user?.name || "Thành viên";
  const memberMonths = getMembershipMonths(profile?.createdAt);
  const totalSpent = profile?.totalSpent || 0;
  const currentTier = profile?.loyaltyTier;
  const colors = currentTier ? colorMap[currentTier.slug] || { bg: "bg-surface", text: "text-text", border: "border-text/10" } : { bg: "bg-surface", text: "text-text", border: "border-text/10" };
  const nextTierInfo = getNextTierInfo(totalSpent);

  return (
    <main className="min-h-screen bg-bg pt-28 pb-32">
      <div className="container-custom">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-8 border-b border-text/10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy">Xin chào, {displayName}.</h1>
            <p className="text-sm text-muted italic font-serif">
              Bạn đã đồng hành cùng Alma được {memberMonths} tháng.
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/tai-khoan" })}
            className="text-[11px] font-bold uppercase tracking-widest border-b border-text pb-1 hover:text-accent hover:border-accent transition-all"
          >
            Đăng xuất
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b border-text/5 lg:border-b-0 gap-6 lg:gap-4 scrollbar-hide">
            {[
              { id: "overview", label: "Tổng quan" },
              { id: "orders", label: "Đơn hàng" },
              { id: "addresses", label: "Địa chỉ" },
              { id: "favorites", label: "Yêu thích" },
              { id: "profile", label: "Hồ sơ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 text-left py-2 lg:py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "text-accent pl-0 lg:pl-4 border-b-2 border-accent lg:border-b-0 lg:border-l-2 lg:border-accent"
                    : "text-muted hover:text-text hover:lg:pl-2"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-3 min-h-[450px]">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key="overview"
                  className="space-y-8"
                >
                  {profileLoading ? (
                    <div className="py-20 flex justify-center">
                      <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Loyalty Tier Badge Card */}
                      <div className="bg-white border border-surface p-6 shadow-sm flex flex-col justify-between">
                        <div className="space-y-4">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted">Hạng thành viên</p>
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{currentTier?.icon || "🌱"}</span>
                            <div>
                              <h3 className={`text-xl font-display font-bold ${colors.text}`}>
                                {currentTier?.name || "Khách hàng thân thiết"}
                              </h3>
                              <span
                                className={`inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 mt-1 border ${colors.border} ${colors.bg} ${colors.text}`}
                              >
                                {currentTier?.condition || "Đang cập nhật"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {currentTier && (
                          <div className="mt-6 pt-4 border-t border-text/5">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-2">Ưu đãi nổi bật</p>
                            <ul className="text-xs text-text space-y-1">
                              {currentTier.benefits.slice(0, 3).map((benefit, i) => (
                                <li key={i} className="flex justify-between">
                                  <span className="text-muted">{benefit.label}</span>
                                  <span className="font-semibold">{benefit.value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Spent Progress Card */}
                      <div className="bg-white border border-surface p-6 shadow-sm flex flex-col justify-between">
                        <div className="space-y-4">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted">Chi tiêu tích lũy</p>
                          <h2 className="text-3xl font-display font-bold text-navy">{formatCurrency(totalSpent)}</h2>
                        </div>

                        {nextTierInfo.remaining > 0 ? (
                          <div className="mt-6 space-y-3">
                            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-accent h-full" style={{ width: `${nextTierInfo.progress}%` }}></div>
                            </div>
                            <p className="text-[11px] text-muted italic">
                              Tích lũy thêm <span className="font-bold text-text">{formatCurrency(nextTierInfo.remaining)}</span> để nâng hạng <span className="font-bold text-accent">{nextTierInfo.nextTierName}</span>
                            </p>
                          </div>
                        ) : (
                          <div className="mt-6">
                            <p className="text-[11px] text-accent font-bold uppercase tracking-wider">
                              ★ Bạn đã đạt hạng thành viên cao nhất!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Mini Orders Card */}
                      <div className="bg-white border border-surface p-6 shadow-sm md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted">Lịch sử giao dịch</p>
                          <h4 className="text-sm font-semibold text-text">Bạn hiện có {orders.length} đơn hàng.</h4>
                        </div>
                        <button
                          onClick={() => setActiveTab("orders")}
                          className="text-[10px] font-bold uppercase tracking-widest border-b border-text pb-0.5 hover:text-accent hover:border-accent transition-all"
                        >
                          Xem chi tiết lịch sử đặt hàng
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key="orders"
                  className="space-y-6"
                >
                  {ordersLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                      <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs text-muted">Đang tải lịch sử đơn hàng...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="py-12 text-center bg-white border border-surface shadow-sm rounded-sm">
                      <p className="text-sm text-muted italic">Bạn chưa thực hiện giao dịch mua hàng nào.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-text/10 bg-white px-6 border border-surface shadow-sm rounded-sm">
                      {orders.map((order) => {
                        const dateStr = new Date(order.createdAt).toLocaleDateString("vi-VN");
                        const statusLabel =
                          order.status === "completed"
                            ? "Hoàn thành"
                            : order.status === "pending"
                            ? "Chờ thanh toán"
                            : "Đã hủy/Hết hạn";
                        
                        const statusColor =
                          order.status === "completed"
                            ? "text-emerald-600"
                            : order.status === "pending"
                            ? "text-amber-600 animate-pulse font-bold"
                            : "text-neutral-400";

                        const totalProducts = order.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

                        return (
                          <div key={order.id} className="py-6 flex flex-col gap-4 group">
                            <div className="flex flex-wrap justify-between items-center gap-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                  <p className="font-bold text-navy uppercase tracking-widest text-xs">#{order.transferCode}</p>
                                  {order.userClaimed && order.status === "pending" && (
                                    <span className="text-[9px] px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-600 rounded font-medium">
                                      Đang kiểm tra thủ công
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted font-serif">
                                  Ngày đặt: {dateStr} · {totalProducts} sản phẩm
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-8">
                                <div className="text-right">
                                  <p className="text-sm font-bold text-text">
                                    {order.totalAmount.toLocaleString("vi-VN")}đ
                                  </p>
                                  <p className={`text-[10px] font-bold uppercase tracking-widest ${statusColor}`}>
                                    {statusLabel}
                                  </p>
                                </div>
                                <button
                                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                  className="px-6 py-2 border border-text/10 text-[9px] font-bold uppercase tracking-widest hover:bg-navy hover:text-white hover:border-navy transition-all cursor-pointer"
                                >
                                  {expandedOrderId === order.id ? "Đóng" : "Chi tiết"}
                                </button>
                              </div>
                            </div>

                            {expandedOrderId === order.id && (
                              <div
                                className="p-4 bg-neutral-50 border border-neutral-100/70 rounded-sm space-y-4 text-xs"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-600">
                                  <div className="space-y-1.5">
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Thông tin nhận hàng</p>
                                    <p><strong>Người nhận:</strong> {order.shippingName}</p>
                                    <p><strong>Số điện thoại:</strong> {order.shippingPhone}</p>
                                    <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
                                  </div>
                                  <div className="space-y-1.5">
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Chi tiết giao dịch</p>
                                    <p><strong>Phương thức:</strong> Chuyển khoản ngân hàng (SePay)</p>
                                    <p><strong>Nội dung:</strong> <span className="font-mono font-bold text-amber-800 bg-amber-50 border border-amber-100/50 px-1.5 py-0.5 rounded">{order.transferCode}</span></p>
                                    <p><strong>Thời gian tạo đơn:</strong> {new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                                    {order.completedAt && (
                                      <p><strong>Thời gian thanh toán:</strong> {new Date(order.completedAt).toLocaleString("vi-VN")}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="border-t border-neutral-200/50 pt-3">
                                  <p className="font-bold text-neutral-800 mb-2">Chi tiết sản phẩm:</p>
                                  <div className="space-y-3">
                                    {order.items?.map((item: any) => (
                                      <div key={item.id} className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-10 h-10 object-cover rounded border border-neutral-200/60 bg-white"
                                          />
                                          <div>
                                            <p className="font-semibold text-neutral-800">{item.title}</p>
                                            {item.variant && (
                                              <p className="text-[10px] text-muted">Phân loại: {item.variant}</p>
                                            )}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-medium text-neutral-850">
                                            {item.price.toLocaleString("vi-VN")}đ x{item.quantity}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key="addresses"
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xs uppercase tracking-widest text-muted font-bold">Danh sách địa chỉ nhận hàng</p>
                    <button
                      onClick={() => {
                        setAddressForm({
                          id: "",
                          label: "Nhà",
                          fullName: "",
                          phone: "",
                          street: "",
                          ward: "",
                          district: "",
                          city: "",
                          isDefault: false,
                        });
                        setIsAddressModalOpen(true);
                      }}
                      className="text-xs font-bold uppercase tracking-widest border-b border-text hover:text-accent hover:border-accent transition-colors pb-0.5"
                    >
                      Thêm địa chỉ mới +
                    </button>
                  </div>

                  {addressesLoading ? (
                    <div className="py-20 flex justify-center">
                      <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="p-12 border border-dashed border-text/25 flex flex-col items-center justify-center text-center space-y-4 bg-white">
                      <p className="text-muted italic font-serif text-sm">Bạn chưa lưu địa chỉ giao hàng nào.</p>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setAddressForm({
                            id: "",
                            label: "Nhà",
                            fullName: "",
                            phone: "",
                            street: "",
                            ward: "",
                            district: "",
                            city: "",
                            isDefault: false,
                          });
                          setIsAddressModalOpen(true);
                        }}
                      >
                        Tạo địa chỉ đầu tiên
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`bg-white p-6 border shadow-sm flex flex-col justify-between gap-4 ${
                            address.isDefault ? "border-accent ring-1 ring-accent/30" : "border-surface"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-600">
                                {address.label}
                              </span>
                              {address.isDefault && (
                                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/20">
                                  Mặc định
                                </span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-bold text-sm text-text">{address.fullName}</h4>
                              <p className="text-xs text-muted font-mono">{address.phone}</p>
                              <p className="text-xs text-text leading-relaxed mt-2">
                                {address.street}
                                {address.ward && `, ${address.ward}`}
                                {`, ${address.district}, ${address.city}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-text/5 pt-4 mt-2">
                            <div className="flex gap-4">
                              <button
                                onClick={() => {
                                  setAddressForm({
                                    id: address.id,
                                    label: address.label,
                                    fullName: address.fullName,
                                    phone: address.phone,
                                    street: address.street,
                                    ward: address.ward || "",
                                    district: address.district,
                                    city: address.city,
                                    isDefault: address.isDefault,
                                  });
                                  setIsAddressModalOpen(true);
                                }}
                                className="text-[10px] font-bold uppercase tracking-wider text-muted hover:text-navy transition-colors"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-[10px] font-bold uppercase tracking-wider text-muted hover:text-red-600 transition-colors"
                              >
                                Xóa
                              </button>
                            </div>

                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="text-[10px] font-bold uppercase tracking-wider text-accent border-b border-accent/20 hover:border-accent pb-0.5 transition-all"
                              >
                                Đặt làm mặc định
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "favorites" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key="favorites"
                  className="space-y-6"
                >
                  <p className="text-xs uppercase tracking-widest text-muted font-bold">Danh sách yêu thích của bạn</p>

                  {favoritesLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <ProductCardSkeleton />
                      <ProductCardSkeleton />
                      <ProductCardSkeleton />
                    </div>
                  ) : favorites.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-surface shadow-sm">
                      <p className="text-muted italic font-serif text-sm">Chưa có sản phẩm yêu thích nào.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {favorites.map((fav) => (
                        <div key={fav.id} className="relative group">
                          <ProductCard
                            id={fav.product.id}
                            slug={fav.product.slug}
                            image={fav.product.image}
                            title={fav.product.title}
                            price={fav.product.price}
                            originalPrice={fav.product.originalPrice}
                            rating={fav.product.rating}
                            reviewsCount={fav.product.reviewsCount}
                            flag={fav.product.flag}
                            volume={fav.product.volume}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key="profile"
                  className="space-y-8"
                >
                  {profileLoading ? (
                    <div className="py-20 flex justify-center">
                      <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Personal Info Form */}
                      <div className="bg-white p-6 border border-surface shadow-sm space-y-6">
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm uppercase tracking-widest text-navy">Thông tin cá nhân</h3>
                          <p className="text-[11px] text-muted">Cập nhật thông tin định danh và liên hệ.</p>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Họ và tên</label>
                            <input
                              type="text"
                              className="w-full bg-transparent border-b border-text/10 py-2 focus:border-accent outline-none text-sm"
                              value={profileName}
                              onChange={(e) => setProfileName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Số điện thoại</label>
                            <input
                              type="tel"
                              className="w-full bg-transparent border-b border-text/10 py-2 focus:border-accent outline-none text-sm"
                              value={profilePhone}
                              onChange={(e) => setProfilePhone(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Email (Không thể thay đổi)</label>
                            <input
                              type="email"
                              className="w-full bg-transparent border-b border-text/10 py-2 text-muted text-sm cursor-not-allowed outline-none"
                              value={profile?.email || ""}
                              disabled
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={actionLoading}
                            className="bg-navy text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all pt-2.5"
                          >
                            Lưu thông tin
                          </button>
                        </form>
                      </div>

                      {/* Password Change or Google status */}
                      <div className="bg-white p-6 border border-surface shadow-sm space-y-6">
                        {profile?.hasPassword ? (
                          <>
                            <div className="space-y-1">
                              <h3 className="font-bold text-sm uppercase tracking-widest text-navy">Đổi mật khẩu</h3>
                              <p className="text-[11px] text-muted">Đặt lại mật khẩu truy cập của bạn.</p>
                            </div>

                            <form onSubmit={handleChangePassword} className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Mật khẩu hiện tại</label>
                                <input
                                  type="password"
                                  className="w-full bg-transparent border-b border-text/10 py-2 focus:border-accent outline-none text-sm"
                                  placeholder="••••••••"
                                  value={currentPassword}
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Mật khẩu mới</label>
                                <input
                                  type="password"
                                  className="w-full bg-transparent border-b border-text/10 py-2 focus:border-accent outline-none text-sm"
                                  placeholder="Tối thiểu 6 ký tự"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  minLength={6}
                                  required
                                />
                              </div>

                              <button
                                type="submit"
                                disabled={actionLoading}
                                className="bg-navy text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all pt-2.5"
                              >
                                Đổi mật khẩu
                              </button>
                            </form>
                          </>
                        ) : (
                          <div className="h-full flex flex-col justify-between py-2">
                            <div className="space-y-3">
                              <h3 className="font-bold text-sm uppercase tracking-widest text-navy">Bảo mật tài khoản</h3>
                              <p className="text-xs text-muted leading-relaxed">
                                Tài khoản của bạn hiện được liên kết và đăng nhập bảo mật trực tiếp thông qua tài khoản Google (<span className="text-text font-semibold">{profile?.email}</span>).
                              </p>
                              <p className="text-xs text-muted leading-relaxed">
                                Bạn không cần sử dụng mật khẩu để truy cập Alma Dungduong.
                              </p>
                            </div>
                            <div className="mt-8 p-4 bg-neutral-50 border border-text/5 flex items-center gap-3 text-xs text-neutral-600 font-bold uppercase tracking-wider">
                              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path
                                  fill="#4285F4"
                                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.47-5.01 3.47-8.64z"
                                />
                              </svg>
                              Đã liên kết Google
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>

      {/* Address CRUD Modal */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-bg border border-text/10 shadow-2xl w-full max-w-[500px] p-8 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="absolute top-6 right-6 text-muted hover:text-text font-serif text-lg"
              >
                ✕
              </button>

              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-bold text-navy">
                    {addressForm.id ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted font-bold">
                    Cập nhật thông tin giao nhận hàng
                  </p>
                </div>

                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Họ và tên người nhận</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Số điện thoại</label>
                      <input
                        type="tel"
                        className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Tỉnh / Thành phố</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                        placeholder="Ví dụ: Hà Nội"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Quận / Huyện</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                        placeholder="Ví dụ: Cầu Giấy"
                        value={addressForm.district}
                        onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Phường / Xã</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                        placeholder="Ví dụ: Dịch Vọng Hậu"
                        value={addressForm.ward}
                        onChange={(e) => setAddressForm({ ...addressForm, ward: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Nhãn địa chỉ</label>
                      <select
                        className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                        value={addressForm.label}
                        onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                      >
                        <option value="Nhà">Nhà riêng</option>
                        <option value="Văn phòng">Văn phòng</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Địa chỉ chi tiết (Số nhà, tên đường)</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-text/10 py-1.5 focus:border-accent outline-none text-sm"
                      placeholder="Ví dụ: Số 15, ngõ 80, đường Trần Thái Tông"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isDefault"
                      className="w-4 h-4 accent-accent rounded"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                    />
                    <label htmlFor="isDefault" className="text-xs text-text font-semibold select-none cursor-pointer">
                      Đặt làm địa chỉ giao hàng mặc định
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddressModalOpen(false)}
                      className="flex-1 border border-text/10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-navy text-white py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-colors"
                    >
                      {actionLoading ? "Đang lưu..." : "Lưu địa chỉ"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Action Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[250]"
          >
            <div
              className={`px-6 py-4 shadow-2xl text-xs font-bold uppercase tracking-widest rounded-sm ${
                toast.type === "success" ? "bg-navy text-white border-l-4 border-accent" : "bg-red-950 text-white border-l-4 border-red-500"
              }`}
            >
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
