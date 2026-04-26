"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "favorites">("orders");

  // Mock Data
  const orders = [
    { id: "DH00234", date: "15/06/2025", total: "570.000₫", status: "Đang giao", items: "2 sản phẩm" },
    { id: "DH00212", date: "10/05/2025", total: "285.000₫", status: "Hoàn thành", items: "1 sản phẩm" },
  ];

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-bg pt-20 pb-32">
        <div className="container-custom max-w-[440px]">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-display font-bold uppercase tracking-tight">Tài khoản</h1>
              <p className="text-muted font-serif italic">Chào mừng bạn đồng hành cùng Alma Dungduong.</p>
            </div>

            <div className="bg-surface p-8 shadow-sm">
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

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
                {authMode === "register" && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Họ và tên</label>
                    <input type="text" className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors" placeholder="Nguyễn Văn A" />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Số điện thoại / Email</label>
                  <input type="text" className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Mật khẩu</label>
                  <input type="password" className="w-full bg-transparent border-b border-text/20 py-2 focus:border-accent outline-none transition-colors" required />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-navy text-white py-4 text-xs font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all mt-4"
                >
                  {authMode === "login" ? "Truy cập ngay" : "Tạo tài khoản"}
                </button>

                <div className="mt-6 text-center text-sm text-muted">
                  {authMode === "login" ? (
                    <p>
                      Chưa có tài khoản?{" "}
                      <button 
                        type="button" 
                        onClick={() => setAuthMode("register")} 
                        className="text-text hover:text-accent font-bold transition-colors"
                      >
                        Đăng ký tại đây
                      </button>
                    </p>
                  ) : (
                    <p>
                      Đã có tài khoản?{" "}
                      <button 
                        type="button" 
                        onClick={() => setAuthMode("login")} 
                        className="text-text hover:text-accent font-bold transition-colors"
                      >
                        Đăng nhập tại đây
                      </button>
                    </p>
                  )}
                </div>
              </form>

            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-20 pb-32">
      <div className="container-custom">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold">Xin chào, Lan.</h1>
            <p className="text-muted italic font-serif">Bạn đã đồng hành cùng Alma được 6 tháng.</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-xs font-bold uppercase tracking-widest border-b border-text hover:text-muted hover:border-muted transition-all"
          >
            Đăng xuất
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-1 space-y-4">
             {[
               { id: "orders", label: "Đơn hàng" },
               { id: "addresses", label: "Địa chỉ" },
               { id: "favorites", label: "Yêu thích" }
             ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-all ${
                    activeTab === tab.id ? "text-accent pl-4 border-l-2 border-accent" : "text-muted hover:text-text hover:pl-2"
                  }`}
                >
                  {tab.label}
                </button>
             ))}
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-3 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "orders" && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="orders"
                  className="space-y-6"
                >
                  <div className="divide-y divide-text/10">
                    {orders.map((order) => (
                      <div key={order.id} className="py-6 flex flex-wrap justify-between items-center gap-6 group">
                        <div className="space-y-1">
                           <p className="font-bold text-text uppercase tracking-widest text-xs">#{order.id}</p>
                           <p className="text-sm text-muted">{order.date} · {order.items}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-8">
                           <div className="text-right">
                              <p className="text-sm font-bold text-text">{order.total}</p>
                              <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === "Đang giao" ? "text-accent" : "text-muted"}`}>
                                {order.status}
                              </p>
                           </div>
                           <button className="px-6 py-2 border border-surface text-[10px] font-bold uppercase tracking-widest hover:bg-text hover:text-bg transition-all">
                              Chi tiết
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="addresses"
                  className="p-8 border border-dashed border-text/20 flex flex-col items-center justify-center text-center space-y-4"
                >
                   <p className="text-muted italic font-serif">Bạn chưa lưu địa chỉ nào.</p>
                   <button className="text-xs font-bold uppercase tracking-widest border-b border-text hover:text-accent transition-colors">Thêm địa chỉ mới +</button>
                </motion.div>
              )}

              {activeTab === "favorites" && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="favorites"
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                >
                   <p className="col-span-full text-muted italic font-serif">Chưa có sản phẩm yêu thích.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
