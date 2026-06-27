export function CommentsReviewCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-5">
      <div className="flex items-center gap-3">
        <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-28 rounded bg-muted animate-pulse" />
          <div className="h-3 w-20 rounded bg-muted animate-pulse" />
        </div>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-5 w-20 rounded bg-muted animate-pulse" />
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-muted animate-pulse" />
        <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 w-20 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
