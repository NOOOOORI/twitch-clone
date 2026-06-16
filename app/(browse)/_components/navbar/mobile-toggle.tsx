"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobileSidebar } from "@/store/use-mobile-sidebar";

export const MobileToggle = () => {
  const { onToggle } = useMobileSidebar((state) => state);

  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      size="icon"
      aria-label="メニューを開く"
      className="lg:hidden text-muted-foreground hover:text-primary shrink-0"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};
