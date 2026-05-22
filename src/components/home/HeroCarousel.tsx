"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: ["Hành trình", "ươm mầm dung dưỡng", "NỞ RỘ"],
    subHeadline: "Khỏe từ bên trong, rạng rỡ bên ngoài",
    description: ["Không cần vội vàng, nâng niu làn da tự nhiên", "Chỉ cần đúng sản phẩm, đúng lộ trình"],
    productImage: "https://images.unsplash.com/photo-1556228720-195a672e8ff5?q=80&w=800&auto=format&fit=crop",
    accent: "#2D3A2F" // Deep Moss Green
  },
  {
    id: 2,
    title: ["Khoa học", "phục hồi làn da", "NGUYÊN BẢN"],
    subHeadline: "Phục hồi làn da khỏe mạnh nguyên bản",
    description: ["4 sản phẩm giải quyết 28 vấn đề về da", "Bổ sung lợi khuẩn trực tiếp cho làn da"],
    productImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop",
    accent: "#2D3A2F"
  },
  {
    id: 3,
    title: ["Liệu pháp", "tối giản không xâm lấn", "KHÁNG CAO"],
    subHeadline: "Bằng hệ lợi khuẩn kháng cao",
    description: ["Tập trung phục hồi cốt lõi sâu bên dưới", "Da khỏe đẹp bền vững từ bên trong"],
    productImage: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=800&auto=format&fit=crop",
    accent: "#2D3A2F"
  },
  {
    id: 4,
    title: ["Cam kết", "đồng hành 1-1", "DA ĐẸP"],
    subHeadline: "Đồng hành 1-1 miễn phí tới khi da đẹp",
    description: ["Chăm sóc tận tâm mỗi ngày cùng chuyên gia", "Lộ trình cá nhân hóa cho từng nhịp phát triển da"],
    productImage: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
    accent: "#2D3A2F"
  }
];

export function HeroCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Mouse move listener for premium 3D Parallax Rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, []);

  const handleManualNavigation = useCallback((index: number) => {
    if (isNavigating) return;
    setIsNavigating(true);
    setSelectedIndex(index);
    startAutoplay();
    setTimeout(() => setIsNavigating(false), 800);
  }, [isNavigating, startAutoplay]);

  const scrollPrev = useCallback(() => {
    const nextIndex = selectedIndex === 0 ? slides.length - 1 : selectedIndex - 1;
    handleManualNavigation(nextIndex);
  }, [selectedIndex, handleManualNavigation]);

  const scrollNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % slides.length;
    handleManualNavigation(nextIndex);
  }, [selectedIndex, handleManualNavigation]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [startAutoplay]);

  return (
    <section 
      className="relative min-h-[95vh] h-screen overflow-hidden bg-[#F2F0ED] select-none flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlapping Background Layer: Branch Stream with growing leaves */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <BranchStream selectedIndex={selectedIndex} />
      </div>

      <div className="container-custom h-full relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side & Overlapping Zone: Text Content (Occupies 8 cols on larger screens for overlap) */}
        <div className="lg:col-span-8 max-w-3xl space-y-8 flex flex-col justify-center h-full pr-4 z-20 py-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${selectedIndex}`}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="space-y-8"
            >

              {/* Main Headline (Playfair Display / Cormorant Serif - lowercase elegant feel) */}
              <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-light leading-[1.05] tracking-tight text-[#2B2B28] overflow-visible">
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
                    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } }
                  }}
                  className="block lowercase first-letter:uppercase font-cormorant font-light text-[#2B2B28]"
                >
                  {slides[selectedIndex].title[0]}
                </motion.span>
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
                    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } }
                  }}
                  className="block lowercase italic font-cormorant font-light text-accent/90 mt-2 pl-0"
                >
                  {slides[selectedIndex].title[1]}
                </motion.span>
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
                    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } }
                  }}
                  className="block text-[#2D3A2F] font-body font-black tracking-[10px] uppercase mt-4 text-3xl sm:text-5xl lg:text-[60px]"
                >
                  {slides[selectedIndex].title[2]}
                </motion.span>
              </h1>

              {/* Sub-headline & Description points */}
              <div className="space-y-4 max-w-lg">
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
                    exit: { opacity: 0, y: 10, transition: { duration: 0.4 } }
                  }}
                  className="text-xs uppercase font-medium tracking-[0.15em] text-[#2D3A2F]/85 border-l border-accent/25 pl-4 py-0.5"
                >
                  {slides[selectedIndex].subHeadline}
                </motion.div>

                <motion.ul
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
                    exit: { opacity: 0, y: 10, transition: { duration: 0.4 } }
                  }}
                  className="space-y-2.5 text-muted/90 text-sm font-body pl-1"
                >
                  {slides[selectedIndex].description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed text-left">
                      <span className="text-accent mt-[6px] text-[8px] flex-shrink-0">✦</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* Editorial Text Link CTA */}
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
                  exit: { opacity: 0, y: 10, transition: { duration: 0.4 } }
                }}
                className="pt-2"
              >
                <button
                  onClick={() => window.location.href = '/san-pham'}
                  className="group relative inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2B2B28] hover:text-accent transition-colors duration-300 py-2 border-b border-text/10"
                >
                  <span>Khám phá bộ sưu tập</span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-sm">⟶</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Floating Product cutout (Absolute overlap behind/beside text on large screens) */}
        <div
          className="lg:col-span-4 h-full w-full relative flex items-center justify-center min-h-[350px] lg:min-h-0 overflow-visible lg:absolute lg:right-[5%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[48%] lg:h-[75%] z-10 pointer-events-none"
        >
          {/* Depth-of-Field 3D Parallax Floating Elements (Foreground and Background layers) */}
          <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
            {/* Background elements (behind product) */}
            <motion.div
              animate={{
                y: isHovered ? [0, 8, 0] : [0, 4, 0],
                x: isHovered ? [0, -5, 0] : [0, -2, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[30%] left-[-10%] w-10 h-10 blur-[1px] opacity-20 z-0"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent">
                <path d="M2 22C2 22 6 18 12 17C18 16 22 10 22 2C22 2 14 2 8 8C2 14 2 22 2 22Z" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Foreground elements (highly blurred, in front) */}
            <motion.div
              animate={{
                y: isHovered ? [0, -15, 0] : [0, -7, 0],
                x: isHovered ? [0, 10, 0] : [0, 5, 0],
                rotate: [0, 8, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-[-10%] w-16 h-16 blur-[6px] opacity-25 z-20"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#2D3A2F]">
                <path d="M12 2C16.5 2 20 6.5 20 11C20 17 12 22 12 22C12 22 4 17 4 11C4 6.5 7.5 2 12 2Z" fill="currentColor" />
              </svg>
            </motion.div>
          </div>

          {/* Borderless Product Cutout with interactive 3D Mouse Parallax */}
          <div className="relative z-10 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] aspect-[3/4] overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={`prod-${selectedIndex}`}
                initial={{ opacity: 0, scale: 0.92, x: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: mousePosition.x,
                  y: mousePosition.y + (isHovered ? -12 : 0),
                  rotate: mousePosition.x * 0.18
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  x: 40,
                  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1],
                  y: { duration: 0.5, ease: "easeOut" }
                }}
                className="w-full h-full relative"
              >
                {/* Diffusion soft shadow direct on canvas */}
                <Image
                  src={slides[selectedIndex].productImage}
                  alt="Featured Product Closeup"
                  fill
                  className="object-contain filter drop-shadow-[20px_35px_55px_rgba(0,0,0,0.07)]"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Minimalist Timeline Navigation running at the bottom of the screen */}
      <div className="absolute bottom-10 left-12 right-12 md:left-24 md:right-24 z-20 flex items-center gap-6">
        {/* Fraction pager */}
        <div className="flex items-center gap-2 text-xs tracking-widest font-body text-text/50 whitespace-nowrap">
          <span className="font-serif italic text-accent font-medium text-sm">
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
          <span className="opacity-30">/</span>
          <span className="font-serif text-sm">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Thin full horizontal line running across the bottom */}
        <div className="flex-1 h-[1.5px] bg-[#2B2B28]/10 relative">
          <motion.div
            key={selectedIndex}
            className="absolute left-0 top-0 h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>

        {/* Manual Arrow Controls positioned at the end of the line */}
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="group w-8 h-8 rounded-full border border-text/10 bg-bg/50 backdrop-blur-xs flex items-center justify-center text-text/60 hover:text-accent hover:bg-bg hover:border-accent/30 transition-all duration-300"
            aria-label="Previous slide"
          >
            <span className="text-xs">←</span>
          </button>
          <button
            onClick={scrollNext}
            className="group w-8 h-8 rounded-full border border-text/10 bg-bg/50 backdrop-blur-xs flex items-center justify-center text-text/60 hover:text-accent hover:bg-bg hover:border-accent/30 transition-all duration-300"
            aria-label="Next slide"
          >
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

interface BranchStreamProps {
  selectedIndex: number;
}

function BranchStream({ selectedIndex }: BranchStreamProps) {
  return (
    <svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0 w-full h-full object-cover"
      key={selectedIndex}
    >
      <defs>
        {/* Deep, organic wood/bark gradient */}
        <linearGradient id="branchGradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#17221A" />
          <stop offset="50%" stopColor="#243328" />
          <stop offset="100%" stopColor="#35483B" />
        </linearGradient>
        
        {/* Rich, multi-tone leaf gradient */}
        <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E3123" />
          <stop offset="60%" stopColor="#35513D" />
          <stop offset="100%" stopColor="#55755E" />
        </linearGradient>
      </defs>

      {/* Main branch path - Underneath shadow layer for depth */}
      <motion.path
        d="M1440 50 C 1150 120, 950 350, 650 450 C 400 520, 200 750, 0 850"
        stroke="#111B14"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.08"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />

      {/* Main branch path - Solid wood body */}
      <motion.path
        d="M1440 50 C 1150 120, 950 350, 650 450 C 400 520, 200 750, 0 850"
        stroke="url(#branchGradient)"
        strokeWidth="11"
        strokeLinecap="round"
        opacity="0.26"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />

      {/* Main branch path - Subtle 3D highlight */}
      <motion.path
        d="M1438 48 C 1149 118, 949 348, 649 448 C 399 518, 199 748, -1 848"
        stroke="#5C7A64"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />

      {/* Twig 1 */}
      <motion.path
        d="M1150 110 Q 1110 80, 1080 90"
        stroke="url(#branchGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.26"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Twig 2 */}
      <motion.path
        d="M920 330 Q 870 340, 840 320"
        stroke="url(#branchGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.26"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
      />

      {/* Twig 3 */}
      <motion.path
        d="M620 460 Q 580 430, 550 450"
        stroke="url(#branchGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.26"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      />

      {/* Twig 4 */}
      <motion.path
        d="M380 560 Q 340 590, 310 570"
        stroke="url(#branchGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.26"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.9, duration: 0.8, ease: "easeOut" }}
      />

      {/* Twig 5 */}
      <motion.path
        d="M180 720 Q 140 700, 110 710"
        stroke="url(#branchGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.26"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
      />

      {/* Leaves growing out in lush organic pairs and singles */}
      {/* Node 1: Near base, top right */}
      <Leaf x={1320} y={80} rotate={-15} scale={1.1} delay={0.4} />
      <Leaf x={1320} y={80} rotate={45} scale={0.8} delay={0.6} />
      
      {/* Node 1b: Twig 1 tip */}
      <Leaf x={1080} y={90} rotate={-45} scale={0.9} delay={1.1} />
      <Leaf x={1080} y={90} rotate={-15} scale={0.7} delay={1.3} />
      
      {/* Node 2: Along main branch */}
      <Leaf x={1020} y={230} rotate={35} scale={1.05} delay={0.9} />
      <Leaf x={1020} y={230} rotate={-110} scale={0.75} delay={1.1} />
      
      {/* Node 2b: Twig 2 tip */}
      <Leaf x={840} y={320} rotate={-60} scale={0.95} delay={1.6} />
      <Leaf x={840} y={320} rotate={-20} scale={0.75} delay={1.8} />

      {/* Node 3: Along main branch */}
      <Leaf x={780} y={395} rotate={-25} scale={1.1} delay={1.3} />
      <Leaf x={780} y={395} rotate={140} scale={0.8} delay={1.5} />
      
      {/* Node 3b: Twig 3 tip */}
      <Leaf x={550} y={450} rotate={45} scale={0.9} delay={2.1} />
      <Leaf x={550} y={450} rotate={15} scale={0.7} delay={2.3} />

      {/* Node 4: Along main branch */}
      <Leaf x={500} y={490} rotate={15} scale={1.05} delay={1.7} />
      <Leaf x={500} y={490} rotate={-130} scale={0.75} delay={1.9} />
      
      {/* Node 4b: Twig 4 tip */}
      <Leaf x={310} y={570} rotate={-35} scale={0.9} delay={2.5} />
      <Leaf x={310} y={570} rotate={-5} scale={0.7} delay={2.7} />

      {/* Node 5: Along main branch */}
      <Leaf x={280} y={630} rotate={-45} scale={1.1} delay={2.1} />
      <Leaf x={280} y={630} rotate={120} scale={0.8} delay={2.3} />
      
      {/* Node 5b: Twig 5 tip */}
      <Leaf x={110} y={710} rotate={30} scale={0.95} delay={2.8} />
      <Leaf x={110} y={710} rotate={70} scale={0.75} delay={3.0} />

      {/* Node 6: Near tip, bottom left */}
      <Leaf x={70} y={810} rotate={20} scale={1.2} delay={2.5} />
      <Leaf x={70} y={810} rotate={-40} scale={0.95} delay={2.7} />
    </svg>
  );
}

interface LeafProps {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  delay: number;
}

function Leaf({ x, y, rotate, scale, delay }: LeafProps) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: scale, opacity: 0.95 }}
        transition={{ 
          delay: delay, 
          duration: 1.2, 
          ease: [0.34, 1.56, 0.64, 1] 
        }}
        style={{ transformOrigin: "0px 0px" }}
      >
        {/* Leaf Stem connecting to branch */}
        <path 
          d="M -8 3 Q -4 1, 0 0" 
          stroke="#2D3A2F" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.6"
        />
        
        {/* Leaf blade shape */}
        <path 
          d="M 0 0 C 15 -20, 50 -25, 80 0 C 50 25, 15 20, 0 0 Z" 
          fill="url(#leafGradient)" 
        />
        
        {/* Delicate center vein */}
        <path 
          d="M 0 0 C 20 -2, 55 -2, 78 0" 
          stroke="#A7C2AE" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          opacity="0.6" 
        />
        
        {/* Delicate side veins */}
        <path 
          d="M 20 -2 Q 25 -10, 32 -11" 
          stroke="#A7C2AE" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          opacity="0.35" 
        />
        <path 
          d="M 40 -1 Q 47 -9, 55 -10" 
          stroke="#A7C2AE" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          opacity="0.35" 
        />
        <path 
          d="M 20 2 Q 25 10, 32 11" 
          stroke="#A7C2AE" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          opacity="0.35" 
        />
        <path 
          d="M 40 1 Q 47 9, 55 10" 
          stroke="#A7C2AE" 
          strokeWidth="0.8" 
          strokeLinecap="round"
          opacity="0.35" 
        />
      </motion.g>
    </g>
  );
}

