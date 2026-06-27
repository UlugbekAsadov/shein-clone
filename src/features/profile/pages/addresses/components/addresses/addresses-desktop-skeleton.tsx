export function AddressesDesktopSkeleton() {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="h-7 w-40 rounded bg-muted animate-pulse" />
        <div className="h-11 w-40 rounded-sm bg-muted animate-pulse" />
      </div>

      <ul className="flex flex-col gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex w-full items-center gap-4">
            <div className="size-5 shrink-0 rounded-full bg-muted animate-pulse" />
            <div className="size-14.5 shrink-0 rounded-md bg-muted animate-pulse" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-muted animate-pulse" />
              <div className="h-3 w-64 max-w-full rounded bg-muted animate-pulse" />
            </div>
            <div className="size-10 shrink-0 rounded-sm bg-muted animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  );
}
