import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";
import {
  ScheduleAnnouncements,
  ScheduleAnnouncementsSkeleton,
} from "./_components/schedule-announcements";

export default function Home() {
  return (
    <div className="h-full p-3 sm:p-4 lg:p-6 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ScheduleAnnouncementsSkeleton />}>
        <ScheduleAnnouncements />
      </Suspense>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
