import { create } from "zustand";

interface MobileSidebarStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

// スマホ表示でサイドバーをドロワーとして開閉するための状態
export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  open: false,
  onOpen: () => set(() => ({ open: true })),
  onClose: () => set(() => ({ open: false })),
  onToggle: () => set((state) => ({ open: !state.open })),
}));
