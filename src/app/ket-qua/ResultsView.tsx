"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { getImageUrl } from "@/lib/utils";
import {
  caseStudies,
  caseCategories,
  getCategoryStyle,
  treatmentMethods,
  type CaseStudy,
  type CaseCategory,
} from "@/lib/caseStudies";

/* ────────────────────────────────────────────
   Animated Counter
   ──────────────────────────────────────────── */
function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  // Simple counter animation
  if (isInView && count === 0) {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(duration / value);
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
  }

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-display font-bold text-text">
        {isInView ? count : 0}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-xs md:text-sm text-muted uppercase tracking-widest mt-2 font-medium">
        {label}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────
   Case Image Gallery
   ──────────────────────────────────────────── */
function CaseImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Main featured image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={getImageUrl(images[activeIndex])}
              alt={`${name} — ảnh ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Image counter badge */}
        <div className="absolute bottom-3 right-3 z-10 bg-text/50 backdrop-blur-md text-bg text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text hover:bg-white transition-colors shadow-md"
              aria-label="Ảnh trước"
            >
              ←
            </button>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text hover:bg-white transition-colors shadow-md"
              aria-label="Ảnh tiếp"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${idx === activeIndex
                ? "ring-2 ring-accent ring-offset-1 opacity-100"
                : "opacity-50 hover:opacity-80"
                }`}
            >
              <Image
                src={getImageUrl(img)}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Case Study Card
   ──────────────────────────────────────────── */
function CaseCard({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudy;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const style = getCategoryStyle(caseStudy.category);

  // Parse treatment lines
  const treatmentLines = caseStudy.treatment.split("\n").filter(Boolean);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-text/5 overflow-hidden hover:border-accent/20 hover:shadow-xl transition-all duration-500 group"
    >
      {/* Image Gallery */}
      <div className="p-4 pb-0">
        <CaseImageGallery
          images={caseStudy.images}
          name={caseStudy.name}
        />
      </div>

      {/* Content */}
      <div className="p-6 pt-5 space-y-5">
        {/* Category + Name */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.bgColor} ${style.color} ${style.borderColor} border`}
            >
              <span>{style.icon}</span>
              {caseStudy.category}
            </span>
            <h3 className="text-lg font-display font-bold text-text group-hover:text-accent transition-colors">
              {caseStudy.name}
            </h3>
            <p className="text-xs text-muted">{caseStudy.info}</p>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center text-accent font-display font-bold text-xs">
            #{String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Tình trạng da trước điều trị
          </h4>
          <p
            className={`text-sm text-text/80 leading-relaxed ${!isExpanded && caseStudy.condition.length > 120
              ? "line-clamp-3"
              : ""
              }`}
          >
            {caseStudy.condition}
          </p>
          {caseStudy.condition.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-accent font-semibold hover:underline"
            >
              {isExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
            </button>
          )}
        </div>

        {/* Treatment */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Liệu trình
          </h4>
          <div className="space-y-1.5">
            {treatmentLines.map((line, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-sm text-text/80"
              >
                <span className="text-accent mt-0.5 text-xs">●</span>
                <span className="leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="pt-4 border-t border-text/5 space-y-2.5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Sản phẩm sử dụng
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.products.map((product) => (
              <Link
                key={product.slug}
                href={`/san-pham/${product.slug}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface hover:bg-accent/10 text-[11px] font-medium text-text/70 hover:text-accent transition-all group/link"
              >
                <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-[9px]">
                  →
                </span>
                {product.name.split("—")[0].trim()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ────────────────────────────────────────────
   Main Results Page
   ──────────────────────────────────────────── */
export default function ResultsPage() {
  const [activeCategory, setActiveCategory] = useState<
    "ALL" | CaseCategory
  >("ALL");

  const filteredCases =
    activeCategory === "ALL"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 md:pt-36">
      {/* ── Hero Section ── */}
      <div className="container-custom mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:opacity-80 transition-opacity"
          >
            <span>← Quay lại trang chủ</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent block">
            Minh chứng lâm sàng
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-[1.1] text-text">
            Kết Quả{" "}
            <span className="italic font-serif text-accent">
              Điều Trị
            </span>{" "}
            Thực Tế.
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
            Hàng trăm phụ nữ và nam giới Việt đã tìm lại vẻ đẹp nguyên bản
            thông qua lộ trình chăm sóc vi sinh khoa học. Đây là những
            hành trình thật, kết quả thật — được ghi nhận bằng hình ảnh soi
            da chuyên nghiệp.
          </p>
        </motion.div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="container-custom mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 py-10 px-8 bg-white rounded-2xl border border-text/5 shadow-xs"
        >
          <AnimatedStat value={100000} suffix="+" label="Ca điều trị" />
          <AnimatedStat value={5} suffix="" label="Nhóm vấn đề da" />
          <AnimatedStat value={100} suffix="%" label="Vi sinh tự nhiên" />
        </motion.div>
      </div>

      {/* ── Category Filter ── */}
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2.5 pb-4 border-b border-text/10"
        >
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${activeCategory === "ALL"
              ? "bg-accent text-white border-accent"
              : "bg-white text-text/60 border border-text/10 hover:border-text/30"
              }`}
          >
            Tất cả ({caseStudies.length})
          </button>
          {caseCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-1.5 ${activeCategory === cat.label
                ? "bg-accent text-white border-accent"
                : "bg-white text-text/60 border border-text/10 hover:border-text/30"
                }`}
            >
              <span>{cat.icon}</span>
              {cat.label} ({cat.count})
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Case Studies Grid ── */}
      <div className="container-custom mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((cs, idx) => (
              <CaseCard key={cs.id} caseStudy={cs} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              Chưa có ca điều trị nào trong danh mục này.
            </p>
          </div>
        )}
      </div>

      {/* ── Treatment Methodology Section ── */}
      <div className="bg-white py-24 border-y border-text/5">
        <div className="container-custom">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block">
              Phương pháp điều trị
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-text">
              Ba Cấp Độ Liệu Trình
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Tùy theo tình trạng da và mục tiêu điều trị, chuyên viên sẽ
              tư vấn cấp độ liệu trình phù hợp nhất cho bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentMethods.map((method, idx) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-[#FAF8F5] rounded-2xl border border-text/5 p-8 hover:border-accent/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-6">{method.icon}</div>
                <h3 className="text-lg font-display font-bold text-text group-hover:text-accent transition-colors mb-1">
                  {method.title}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-muted font-medium mb-4">
                  {method.subtitle}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {method.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products Used Section ── */}
      <div className="container-custom py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block">
            Liệu trình chuẩn
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-text">
            Bộ 3 Sản Phẩm Vi Sinh{" "}
            <span className="italic font-serif text-accent">Hoa Ngân</span>
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Tất cả các ca điều trị đều sử dụng chung bộ 3 sản phẩm cốt lõi
            — minh chứng cho sức mạnh của hệ vi sinh trong việc tái tạo
            và phục hồi làn da.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Glacier Foam Cleanser",
              vn: "Sữa rửa mặt nước băng",
              step: "Bước 1 — Làm sạch",
              slug: "sua-rua-mat-nuoc-bang-glacier",
              desc: "Làm sạch sâu mà không gây khô da, bảo toàn hàng rào vi sinh tự nhiên.",
            },
            {
              name: "Bio Miracle Essence",
              vn: "Xịt dưỡng chuyên sâu",
              step: "Bước 2 — Cân bằng",
              slug: "xit-duong-chuyen-sau-miracle",
              desc: "Cung cấp chiết xuất lô hội, chiết xuất tổ yến và lợi khuẩn sống giúp dưỡng ẩm và cân bằng hệ vi sinh trên da .",
            },
            {
              name: "Bio Regenerating Essence 2.0/2.7",
              vn: "Tinh chất tái sinh",
              step: "Bước 3 — Tái tạo",
              slug: "tinh-chat-tai-sinh-2-0",
              desc: "Bổ sung lợi khuẩn nồng độ cao kích hoạt cơ chế tái tạo và phục hồi tổn thương ở tầng sâu biểu bì.",
            },
          ].map((product, idx) => (
            <Link
              key={product.slug}
              href={`/san-pham/${product.slug}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-text/5 p-8 h-full hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-4">
                  {product.step}
                </span>
                <h3 className="text-lg font-display font-bold text-text group-hover:text-accent transition-colors mb-1">
                  {product.vn}
                </h3>
                <p className="text-xs text-muted/70 font-medium mb-3 italic">
                  {product.name}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {product.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem sản phẩm →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA Section ── */}
      <div className="container-custom">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 md:p-20 bg-accent rounded-2xl text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white">
            Bắt đầu hành trình của bạn
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Hãy để chuyên viên của chúng tôi phân tích tình trạng da
            và thiết kế lộ trình chăm sóc vi sinh riêng biệt cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button className="px-10 py-4 bg-white text-accent text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-all shadow-lg">
              Tư vấn miễn phí 1:1
            </button>
            <Link
              href="/san-pham"
              className="px-10 py-4 border border-white/40 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
            >
              Xem sản phẩm →
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
