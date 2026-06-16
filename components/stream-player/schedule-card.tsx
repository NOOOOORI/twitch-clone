import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarClock } from "lucide-react";

interface ScheduleCardProps {
  description: string | null;
  scheduledAt: Date | null;
  scheduledDescription: string | null;
}

export const ScheduleCard = ({
  description,
  scheduledAt,
  scheduledDescription,
}: ScheduleCardProps) => {
  const hasSchedule = !!scheduledAt && scheduledAt.getTime() > Date.now();

  if (!description && !hasSchedule) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-card p-6 lg:p-10 space-y-4">
        {description && (
          <div>
            <h2 className="font-semibold text-lg lg:text-2xl mb-2">配信概要</h2>
            <p className="text-sm whitespace-pre-wrap">{description}</p>
          </div>
        )}
        {hasSchedule && (
          <div>
            <h2 className="font-semibold text-lg lg:text-2xl mb-2 flex items-center gap-x-2">
              <CalendarClock className="h-5 w-5" />
              次回配信予定
            </h2>
            <p className="text-sm font-semibold text-primary">
              {format(scheduledAt as Date, "yyyy/MM/dd(EEE) HH:mm", {
                locale: ja,
              })}
              〜
            </p>
            {scheduledDescription && (
              <p className="text-sm whitespace-pre-wrap mt-1">
                {scheduledDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
