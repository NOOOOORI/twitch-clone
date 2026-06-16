"use client";

import { format } from "date-fns";
import { cn, stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";

interface ChatMessageProps {
  data: ReceivedChatMessage;
  viewerName?: string;
}

export const ChatMessage = ({ data, viewerName }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");

  const isMentioned =
    !!viewerName &&
    data.from?.name !== viewerName &&
    data.message.toLowerCase().includes(`@${viewerName}`.toLowerCase());

  return (
    <div
      className={cn(
        "flex gap-2 p-2 rounded-md hover:bg-white/5",
        isMentioned && "bg-yellow-500/10 hover:bg-yellow-500/20"
      )}
    >
      <p className="text-sm text-white/40">{format(data.timestamp, "HH:MM")}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-normal">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
          :
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};
