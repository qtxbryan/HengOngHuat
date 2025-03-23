import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function MetricsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 border-border/40 bg-card/80">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-20 mb-1" />
          <Skeleton className="h-4 w-16" />
        </Card>

        <Card className="p-3 border-border/40 bg-card/80">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-20 mb-1" />
          <Skeleton className="h-4 w-16" />
        </Card>
      </div>

      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full mb-1" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </Card>

      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 border-border/40 bg-card/80">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-5 w-20" />
        </Card>

        <Card className="p-3 border-border/40 bg-card/80">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-5 w-20" />
        </Card>
      </div>
    </div>
  );
}

export function NewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between mb-1">
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-4 border-border/40 bg-card/80">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-3" />

            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AnalysisSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <Card className="p-4 border-border/40 bg-card/80">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />

        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-2 w-full rounded-full mb-4" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-border/40 bg-card/80">
          <Skeleton className="h-5 w-32 mb-3" />

          <div className="space-y-2">
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-1 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-1 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-1 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/40 bg-card/80">
          <Skeleton className="h-5 w-32 mb-3" />

          <div className="space-y-2">
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-1 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-1 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-1 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 border-border/40 bg-card/80">
        <Skeleton className="h-5 w-32 mb-3" />

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
