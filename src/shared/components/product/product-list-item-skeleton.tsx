export function ProductListItemSkeleton() {
  return (
    <article className="flex gap-4 rounded-[19px] bg-secondary p-3">
      <div className="aspect-3/4 w-[165px] shrink-0 rounded-[10px] bg-muted animate-pulse" />

      <div className="flex flex-1 flex-col gap-2 py-2 pr-10">
        <div className="space-y-1.5">
          <div className="h-6 w-full rounded bg-muted animate-pulse" />
          <div className="h-6 w-3/4 rounded bg-muted animate-pulse" />
        </div>

        <div className="space-y-1.5">
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
        </div>

        <div className="flex gap-3 mt-1">
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
          <div className="h-4 w-16 rounded bg-muted animate-pulse" />
        </div>

        <div className="mt-auto flex flex-col gap-1">
          <div className="h-4 w-16 rounded bg-muted animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-7 w-24 rounded bg-muted animate-pulse" />
            <div className="h-5 w-16 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  );
}
