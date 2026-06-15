import { Skeleton } from "@/components/ui/skeleton";

const KeysLoading = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-9 w-[120px]" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default KeysLoading;
