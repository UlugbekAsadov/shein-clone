export function CommentsMobileSkeleton() {
  return (
    <div className="pb-6 md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-9 shrink-0 rounded-full bg-muted animate-pulse" />
        <div className="mx-auto h-5 w-32 rounded bg-muted animate-pulse" />
        <div className="size-9 shrink-0 rounded-full bg-muted animate-pulse" />
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-[20px] bg-secondary p-4">
            <div className="flex items-center gap-2">
              <div className="size-9 shrink-0 rounded-full bg-muted animate-pulse" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
                <div className="h-3 w-16 rounded bg-muted animate-pulse" />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-3 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
            </div>

            <div className="mt-3 flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="size-16 rounded-[12px] bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
