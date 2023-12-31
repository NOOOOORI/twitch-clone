import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "../hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "フォロワーのみチャット可能";
    }

    if (isDelayed && !isFollowersOnly) {
      return "メッセージは2秒遅れて表示されます";
    }

    if (isDelayed && isFollowersOnly) {
      return "フォロワーのみチャット可能でメッセージを読みやすくする為、2秒遅れて表示されます。";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "フォロワー限定";
    }

    if (isDelayed && !isFollowersOnly) {
      return "スローモード";
    }

    if (isDelayed && isFollowersOnly) {
      return "フォロワー限定＆スローモード";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
