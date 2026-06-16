import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";
import { MobileToggle } from "./mobile-toggle";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-[50px] z-[49] bg-[#1f1f23] px-2 lg:px-4 flex items-center gap-x-2 shadow-sm border-b border-border">
      {/* 左: ハンバーガー + ロゴ */}
      <div className="flex items-center gap-x-1 shrink-0">
        <MobileToggle />
        <Logo />
      </div>
      {/* 中央: デスクトップは検索バー、スマホは検索アイコン */}
      <div className="flex-1 flex justify-center">
        <Search />
      </div>
      {/* 右: アクション */}
      <Actions />
    </nav>
  );
};
