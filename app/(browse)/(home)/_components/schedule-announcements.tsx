import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

import { getFollowedStreamSchedules } from "@/lib/follow-service";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const ScheduleAnnouncements = async () => {
  const schedules = await getFollowedStreamSchedules();

  if (schedules.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-x-2">
        <CalendarClock className="h-5 w-5" />
        フォロー中の配信予定
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {schedules.map((user) => (
          <Link
            key={user.id}
            href={`/${user.username}`}
            className="rounded-xl bg-background p-4 hover:bg-accent/50 transition"
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
      </div>
    </div>
  );
};

export const ScheduleAnnouncementsSkeleton = () => {
  return (
    <div className="mb-6">
      <Skeleton className="h-7 w-[180px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[88px] rounded-xl" />
        ))}
      </div>
    </div>
  );
};
