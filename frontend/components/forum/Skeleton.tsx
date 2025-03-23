import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ForumTopicSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/40 bg-card/80">
      <div className="flex items-start gap-4 mb-4 md:mb-0 w-full md:w-3/4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="w-full">
          <div className="flex items-center gap-2 mb-1">
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-6 w-full max-w-md mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="flex flex-row md:flex-col lg:flex-row gap-4 w-full md:w-1/4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export function ForumCategorySkeleton() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ForumStatsSkeleton() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ForumContentSkeleton() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ForumTopicSkeleton key={index} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border/30 pt-4">
        <Skeleton className="h-9 w-20" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-8" />
          ))}
        </div>
        <Skeleton className="h-9 w-20" />
      </CardFooter>
    </Card>
  );
}
