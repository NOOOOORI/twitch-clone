import Link from "next/link";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Clapperboard, HelpCircle } from "lucide-react";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <Button
        size="sm"
        variant="ghost"
        className="hidden lg:flex text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/help" aria-label="使い方">
          <HelpCircle className="h-5 w-5 lg:mr-2" />
          <span className="hidden lg:block">使い方</span>
        </Link>
      </Button>
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            ログイン
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`} aria-label="ダッシュボード">
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">ダッシュボード</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
