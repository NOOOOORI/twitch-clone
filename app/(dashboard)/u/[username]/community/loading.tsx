import { Skeleton } from "@/components/ui/skeleton";

const CommunityLoading = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default CommunityLoading;
