"use client";

import { ConnectionState } from "livekit-client";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";
import { maskBlockedWords, parseBlockedWords } from "@/lib/chat";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  blockedWords: string | null;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  blockedWords,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const blockedWordList = useMemo(
    () => parseBlockedWords(blockedWords),
    [blockedWords]
  );

  const mentionToken = useMemo(
    () => (viewerName ? `@${viewerName}`.toLowerCase() : ""),
    [viewerName]
  );

  // マウント以降に届いた自分宛てメンションだけを通知する
  const lastMentionTimestamp = useRef(Date.now());

  useEffect(() => {
    if (!mentionToken) return;

    const incoming = [...messages].sort((a, b) => a.timestamp - b.timestamp);

    for (const message of incoming) {
      if (message.timestamp <= lastMentionTimestamp.current) continue;
      if (message.from?.name === viewerName) continue;

      if (message.message.toLowerCase().includes(mentionToken)) {
        lastMentionTimestamp.current = message.timestamp;
        toast(`${message.from?.name ?? "誰か"}さんがあなたにメンションしました`, {
          description: message.message,
        });
      }
    }
  }, [messages, mentionToken, viewerName]);

  const reversedMessages = useMemo(() => {
    const sorted = [...messages].sort((a, b) => b.timestamp - a.timestamp);

    if (blockedWordList.length === 0) return sorted;

    return sorted.map((message) => ({
      ...message,
      message: maskBlockedWords(message.message, blockedWordList),
    }));
  }, [messages, blockedWordList]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-[#1f1f23] border-l border-border pt-0 h-[60vh] lg:h-[calc(100vh-50px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
            viewerName={viewerName}
          />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col bg-[#1f1f23] border-l border-border pt-0 h-[60vh] lg:h-[calc(100vh-50px)]">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
