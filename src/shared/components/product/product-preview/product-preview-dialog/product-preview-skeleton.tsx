export function ProductPreviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 w-22 animate-pulse rounded-[16px] bg-muted"
            />
          ))}
        </div>
        <div className="aspect-3/4 flex-1 animate-pulse rounded-2xl bg-muted" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-8 w-3/4 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded-lg bg-muted" />
        <div className="h-16 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-10 w-1/3 animate-pulse rounded-lg bg-muted" />
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 w-16 animate-pulse rounded-[9px] bg-muted"
            />
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-14 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
        <div className="mt-2 flex gap-3">
          <div className="h-12 flex-1 animate-pulse rounded-[18px] bg-muted" />
          <div className="h-12 flex-1 animate-pulse rounded-[18px] bg-muted" />
        </div>
      </div>
    </div>
  );
}
