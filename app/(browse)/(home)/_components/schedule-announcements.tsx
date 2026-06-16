import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

import { getFollowedStreamSchedules } from "@/lib/follow-service";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollRow } from "./scroll-row";

export const ScheduleAnnouncements = async () => {
  const schedules = await getFollowedStreamSchedules();

  if (schedules.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-x-2">
        <CalendarClock className="h-5 w-5" />
        フォロー中の配信予定
      </h2>
      <ScrollRow>
        {schedules.map((user) => (
          <Link
            key={user.id}
            href={`/${user.username}`}
            className="shrink-0 w-[240px] sm:w-[260px] rounded-xl bg-card p-4 hover:bg-accent transition"
          >
            <div className="flex gap-x-3">
              <UserAvatar username={user.username} imageUrl={user.imageUrl} />
              <div className="flex flex-col text-sm overflow-hidden">
                <p className="truncate font-semibold">{user.username}</p>
                <p className="text-primary text-xs font-semibold">
                  {format(
                    user.stream!.scheduledAt as Date,
                    "yyyy/MM/dd(EEE) HH:mm",
                    { locale: ja }
                  )}
                  〜
                </p>
              </div>
            </div>
            {user.stream?.scheduledDescription && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 whitespace-pre-wrap">
                {user.stream.scheduledDescription}
              </p>
            )}
          </Link>
        ))}
      </ScrollRow>
    </div>
  );
};

export const ScheduleAnnouncementsSkeleton = () => {
  return (
    <div className="mb-6">
      <Skeleton className="h-7 w-[180px] mb-4" />
      <div className="flex gap-2 sm:gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[88px] w-[240px] sm:w-[260px] shrink-0 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
