export function MeasurementsMobileSkeleton() {
  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
        <div className="mx-auto h-5 w-32 rounded bg-muted animate-pulse" />
        <div className="size-10 shrink-0" />
      </div>

      <div className="flex flex-col gap-3 px-4 pt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex w-full items-center gap-3 rounded-[18px] bg-secondary p-3"
          >
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3.5 w-28 rounded bg-muted animate-pulse" />
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            </div>
            <div className="size-6 shrink-0 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
