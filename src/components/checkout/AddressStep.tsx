"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface AddressItem {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  ward?: string | null;
  district: string;
  city: string;
  isDefault: boolean;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
}

interface AddressStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  savedAddresses: AddressItem[];
  isAuthenticated: boolean;
  onNext: () => void;
}

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

export function AddressStep({
  formData,
  setFormData,
  savedAddresses,
  isAuthenticated,
  onNext,
}: AddressStepProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">("new");
  const [saveToBook, setSaveToBook] = useState(false);
  const [addressLabel, setAddressLabel] = useState("Nhà");
  const [isSaving, setIsSaving] = useState(false);

  // Initialize selection when savedAddresses load
  useEffect(() => {
    if (savedAddresses.length > 0 && selectedAddressId === "new") {
      const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
      setSelectedAddressId(defaultAddr.id);
      applyAddressToForm(defaultAddr);
    }
  }, [savedAddresses]);

  const applyAddressToForm = (addr: AddressItem) => {
    setFormData((prev) => ({
      ...prev,
      fullName: addr.fullName || prev.fullName,
      phone: addr.phone || prev.phone,
      street: addr.street + (addr.ward ? `, ${addr.ward}` : ""),
      city: addr.city,
      district: addr.district,
    }));
  };

  const handleSelectAddress = (addrId: string) => {
    setSelectedAddressId(addrId);
    if (addrId === "new") {
      // Clear fields or leave as user typing
      return;
    }
    const addr = savedAddresses.find((a) => a.id === addrId);
    if (addr) {
      applyAddressToForm(addr);
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If user is adding a new address and opted to save it to address book
    if (selectedAddressId === "new" && isAuthenticated && saveToBook) {
      setIsSaving(true);
      try {
        await fetch("/api/user/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: addressLabel || "Nhà",
            fullName: formData.fullName,
            phone: formData.phone,
            street: formData.street,
            district: formData.district,
            city: formData.city,
            isDefault: savedAddresses.length === 0,
          }),
        });
      } catch (err) {
        console.error("Lỗi lưu địa chỉ vào sổ địa chỉ:", err);
      } finally {
        setIsSaving(false);
      }
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Address Book Picker section for logged-in users */}
      {savedAddresses.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm uppercase font-bold tracking-[0.1em] text-text">
              Sổ địa chỉ của bạn ({savedAddresses.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedAddresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;
              return (
                <div
                  key={addr.id}
                  onClick={() => handleSelectAddress(addr.id)}
                  className={cn(
                    "p-4 rounded-sm border cursor-pointer transition-all relative flex flex-col justify-between space-y-2",
                    isSelected
                      ? "border-accent bg-accent/5 shadow-sm"
                      : "border-surface hover:border-accent/40 bg-bg"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-text">{addr.fullName}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-surface text-muted rounded-full font-medium">
                        {addr.label || "Nhà"}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] px-2 py-0.5 bg-accent/15 text-accent rounded-full font-bold">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                        isSelected ? "border-accent bg-accent text-white" : "border-muted/40"
                      )}
                    >
                      {isSelected && <span className="text-[10px]">✓</span>}
                    </div>
                  </div>

                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {addr.street}
                    {addr.ward ? `, ${addr.ward}` : ""}, {addr.district}, {addr.city}
                  </p>
                  <p className="text-xs text-text font-medium">📞 {addr.phone}</p>
                </div>
              );
            })}

            {/* Option to enter a new address */}
            <div
              onClick={() => handleSelectAddress("new")}
              className={cn(
                "p-4 rounded-sm border border-dashed cursor-pointer transition-all flex items-center justify-center gap-2 text-xs font-semibold min-h-[100px]",
                selectedAddressId === "new"
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-surface hover:border-accent/40 text-muted hover:text-text"
              )}
            >
              <span>+ Giao đến địa chỉ khác</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Info Inputs */}
      <div className="space-y-6">
        <h3 className="text-lg font-display font-semibold">Thông tin người nhận</h3>

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

        {/* Option to save to address book if adding a new address */}
        <AnimatePresence>
          {isAuthenticated && selectedAddressId === "new" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-surface space-y-3"
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={saveToBook}
                  onChange={(e) => setSaveToBook(e.target.checked)}
                  className="w-4 h-4 accent-accent rounded-sm cursor-pointer"
                />
                <span className="text-xs text-text font-medium group-hover:text-accent transition-colors">
                  Lưu địa chỉ này vào sổ địa chỉ cá nhân để dùng lại lần sau
                </span>
              </label>

              {saveToBook && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 pl-7"
                >
                  <span className="text-xs text-muted font-medium">Nhãn địa chỉ:</span>
                  {["Nhà", "Cơ quan", "Khác"].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setAddressLabel(lbl)}
                      className={cn(
                        "text-xs px-3 py-1 rounded-full border transition-all",
                        addressLabel === lbl
                          ? "border-accent bg-accent text-white font-bold"
                          : "border-surface text-muted hover:border-accent/50"
                      )}
                    >
                      {lbl}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSaving}
        className="w-full md:w-auto px-12"
      >
        {isSaving ? "Đang xử lý..." : "Tiếp tục vận chuyển"}
      </Button>
    </form>
  );
}
