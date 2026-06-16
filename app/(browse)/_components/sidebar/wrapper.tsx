"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useMobileSidebar } from "@/store/use-mobile-sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const { collapsed } = useSidebar((state) => state);
  const { open, onClose } = useMobileSidebar((state) => state);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 画面遷移したらモバイルドロワーを閉じる
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isClient) {
    return (
      <aside className="fixed top-[50px] left-0 bottom-0 hidden lg:flex flex-col w-60 bg-[#1f1f23] border-r border-border z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <>
      {/* モバイル用の背景オーバーレイ */}
      {open && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-x-0 top-[50px] bottom-0 bg-black/60 z-40"
        />
      )}
      <aside
        className={cn(
          "fixed top-[50px] left-0 bottom-0 flex flex-col w-60 bg-[#1f1f23] border-r border-border z-50 overflow-y-auto hidden-scrollbar transition-transform duration-200",
          // スマホ: 既定では画面外、open時にスライドイン
          "-translate-x-full",
          open && "translate-x-0",
          // PC: 常時表示。collapsedで幅を縮小
          "lg:translate-x-0",
          collapsed ? "lg:w-[70px]" : "lg:w-60"
        )}
      >
        {children}
      </aside>
    </>
  );
};
