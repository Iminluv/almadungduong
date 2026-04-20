"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  labelBefore?: string;
  labelAfter?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  labelBefore = "TRƯỚC", 
  labelAfter = "SAU" 
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleUp = () => setIsResizing(false);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm select-none cursor-ew-resize group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsResizing(true)}
      onTouchStart={() => setIsResizing(true)}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt="After" 
        fill 
        className="object-cover" 
      />

      {/* Comparison Image with clip-path */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image 
          src={beforeImage} 
          alt="Before" 
          fill 
          className="object-cover" 
        />
      </div>


      {/* Divider */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-xl cursor-ew-resize"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-1">
             <span className="text-[10px] text-text font-bold leading-none">←</span>
             <span className="text-[10px] text-text font-bold leading-none">→</span>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 bg-text/40 backdrop-blur-sm text-bg text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px]">
        {labelBefore}
      </div>
      <div className="absolute top-4 right-4 z-10 bg-text/40 backdrop-blur-sm text-bg text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-[2px]">
        {labelAfter}
      </div>
    </div>
  );
}
