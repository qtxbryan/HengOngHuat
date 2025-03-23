import { Skeleton } from "@/components/ui/skeleton";

export function SelectedAssetsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-12" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-3 rounded-md border border-border/40 bg-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-32 mt-1" />
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-7 w-7 rounded-md" />
                </div>
                <Skeleton className="h-4 w-10 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
