import { Skeleton } from "@/components/ui/skeleton";

const HelpLoading = () => {
  return (
    <div className="p-6 max-w-3xl space-y-10">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-[150px]" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default HelpLoading;
