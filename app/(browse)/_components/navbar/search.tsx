"use client";

import qs from "query-string";
import { useState, useRef, useEffect } from "react";
import { SearchIcon, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // モバイル検索オーバーレイを開いたら自動フォーカス
  useEffect(() => {
    if (mobileOpen) {
      const t = setTimeout(() => mobileInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [mobileOpen]);

  // ESC で閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setValue("");
  };

  const navigate = (q: string) => {
    if (!q.trim()) return;
    router.push(
      qs.stringifyUrl(
        { url: "/search", query: { term: q } },
        { skipEmptyString: true }
      )
    );
  };

  const onDesktopSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(value);
  };

  const onMobileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(value);
    closeMobile();
  };

  return (
    <>
      {/* ── スマホ: 検索アイコンボタン ── */}
      <Button
        onClick={() => setMobileOpen(true)}
        variant="ghost"
        size="icon"
        aria-label="検索"
        className="lg:hidden text-muted-foreground hover:text-primary shrink-0"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>

      {/* ── スマホ: フルスクリーン検索オーバーレイ ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-[#1f1f23] flex flex-col">
          {/* ヘッダー行 */}
          <div className="flex items-center gap-x-2 px-2 h-[50px] border-b border-border shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={closeMobile}
              aria-label="戻る"
              className="shrink-0 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <form
              onSubmit={onMobileSubmit}
              className="flex-1 flex items-center gap-x-2"
            >
              <div className="relative flex-1">
                <Input
                  ref={mobileInputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="配信・ユーザーを検索"
                  className="bg-secondary border-border pr-8 h-9"
                  autoComplete="off"
                />
                {value && (
                  <button
                    type="button"
                    onClick={() => setValue("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="クリア"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button type="submit" variant="primary" size="sm">
                検索
              </Button>
            </form>
          </div>
          {/* 検索ヒントエリア */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              配信者名やキーワードで検索
            </p>
          </div>
        </div>
      )}

      {/* ── デスクトップ: 通常の検索バー ── */}
      <form
        onSubmit={onDesktopSubmit}
        className="relative hidden lg:flex items-center w-[400px]"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="検索"
          className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-secondary border-border"
        />
        {value && (
          <X
            className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
            onClick={() => setValue("")}
          />
        )}
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="rounded-l-none"
        >
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>
    </>
  );
};
