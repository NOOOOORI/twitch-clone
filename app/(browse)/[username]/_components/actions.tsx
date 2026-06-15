"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`${data.following.username}をフォローしました`)
        )
        .catch(() => toast.error("エラーが発生しました"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`${data.following.username}のフォローをやめました`)
        )
        .catch(() => toast.error("エラーが発生しました"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          if (data) {
            toast.success(`${data.blocked.username}ブロックを解除しました`);
          } else {
            toast.error("エラーが発生しました");
          }
        })
        .catch(() => toast.error("エラーが発生しました"));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "フォローをやめる" : "フォロー"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        ブロック
      </Button>
    </>
  );
};
