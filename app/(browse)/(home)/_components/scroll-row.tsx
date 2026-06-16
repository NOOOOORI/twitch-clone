"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRowProps {
  children: React.ReactNode;
}

// スマホはネイティブの横スワイプ、PCはホバーで左右の矢印ボタンを表示する横スクロール棚
export const ScrollRow = ({ children }: ScrollRowProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {/* 左矢印 (PCのみ) */}
      <button
        type="button"
        aria-label="前へ"
        onClick={() => scrollBy(-1)}
        className="hidden lg:flex absolute left-0 top-0 bottom-0 z-10 w-10 items-center justify-center bg-gradient-to-r from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary/90 hover:bg-accent shadow-md">
          <ChevronLeft className="h-5 w-5" />
        </span>
      </button>

      <div
        ref={ref}
        className="flex gap-2 sm:gap-3 overflow-x-auto hidden-scrollbar scroll-smooth pb-1"
      >
        {children}
      </div>

      {/* 右矢印 (PCのみ) */}
      <button
        type="button"
        aria-label="次へ"
        onClick={() => scrollBy(1)}
        className="hidden lg:flex absolute right-0 top-0 bottom-0 z-10 w-10 items-center justify-center bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary/90 hover:bg-accent shadow-md">
          <ChevronRight className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
};
