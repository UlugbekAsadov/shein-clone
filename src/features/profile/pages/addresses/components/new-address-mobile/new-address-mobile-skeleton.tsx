export function NewAddressMobileSkeleton() {
  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
        <div className="mx-auto h-5 w-32 rounded bg-muted animate-pulse" />
        <div className="size-10 shrink-0" />
      </div>

      <div className="flex flex-1 flex-col gap-5 px-4 pt-2 pb-32">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-28 rounded bg-muted animate-pulse" />
            <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
          </div>
        ))}
        <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
      </div>

      <div className="px-4 pt-3 pb-4">
        <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
      </div>
    </div>
  );
}
