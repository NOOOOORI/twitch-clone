import { Skeleton } from "@/components/ui/skeleton";

const DonationsLoading = () => {
  return (
    <div className="p-6">
      <div className="mb-4 space-y-2">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-5 w-[180px]" />
      </div>
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[72px] w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default DonationsLoading;
