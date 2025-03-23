import { Skeleton } from "@/components/ui/skeleton";

export function AllocationChartSkeleton() {
  return (
    <div className="flex justify-center items-center p-4 h-[250px]">
      <div className="relative">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-[80px] w-[80px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
