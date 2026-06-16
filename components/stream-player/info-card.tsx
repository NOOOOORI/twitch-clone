"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import { InfoModal } from "./info-modal";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  description: string | null;
  scheduledAt: Date | null;
  scheduledDescription: string | null;
  blockedWords: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  description,
  scheduledAt,
  scheduledDescription,
  blockedWords,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-card">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold">
              配信情報を編集
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              視聴者へのアピールを充実させましょう
            </p>
          </div>
          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
            initialDescription={description}
            initialScheduledAt={scheduledAt}
            initialScheduledDescription={scheduledDescription}
            initialBlockedWords={blockedWords}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">名前</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
        </div>
        {description && (
          <div className="p-4 lg:p-6 space-y-4">
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">配信概要</h3>
              <p className="text-sm whitespace-pre-wrap">{description}</p>
            </div>
          </div>
        )}
        {scheduledAt && (
          <div className="p-4 lg:p-6 space-y-4">
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">
                次回配信予定
              </h3>
              <p className="text-sm font-semibold">
                {format(scheduledAt, "yyyy/MM/dd HH:mm")}
              </p>
              {scheduledDescription && (
                <p className="text-sm whitespace-pre-wrap mt-1">
                  {scheduledDescription}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">サムネイル</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
