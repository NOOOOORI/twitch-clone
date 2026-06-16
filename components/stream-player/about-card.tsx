"use client";

import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-moddal";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = "フォロワー";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-card p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            {hostName}について
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary mr-1">
            {followedByCount}
          </span>
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "このユーザーはまだ自己紹介を入力していません。"}
        </p>
      </div>
    </div>
  );
};
