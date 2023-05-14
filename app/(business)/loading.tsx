import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="flex h-32 w-full space-x-4 bg-background p-2">
        <Skeleton className="h-28 w-28 shrink-0" />
        <div className="flex w-full flex-col space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </Skeleton>
      <Skeleton className="flex h-32 w-full space-x-4 bg-background p-2">
        <Skeleton className="h-28 w-28 shrink-0" />
        <div className="flex w-full flex-col space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </Skeleton>
      <Skeleton className="flex h-32 w-full space-x-4 bg-background p-2">
        <Skeleton className="h-28 w-28 shrink-0" />
        <div className="flex w-full flex-col space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </Skeleton>
    </div>
  );
}
