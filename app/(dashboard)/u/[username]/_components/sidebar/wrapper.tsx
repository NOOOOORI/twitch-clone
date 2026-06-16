"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed top-[50px] left-0 bottom-0 flex flex-col w-[70px] lg:w-60 bg-[#1f1f23] border-r border-border z-50 overflow-y-auto hidden-scrollbar",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
