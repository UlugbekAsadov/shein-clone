export function AddressFormDesktopSkeleton() {
  return (
    <div className="grid h-screen grid-cols-[minmax(320px,440px)_1fr] gap-6 p-6">
      <div className="flex flex-col gap-5 px-3">
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-40 rounded bg-muted animate-pulse" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-4 w-28 rounded bg-muted animate-pulse" />
          <div className="flex items-center gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="size-12 rounded-sm bg-muted animate-pulse" />
            ))}
          </div>
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-12 w-full rounded-sm bg-muted animate-pulse" />
          </div>
        ))}

        <div className="mt-auto flex flex-col gap-2 pt-6">
          <div className="h-12 w-full rounded-sm bg-muted animate-pulse" />
          <div className="h-12 w-full rounded-sm bg-muted animate-pulse" />
        </div>
      </div>

      <div className="rounded-3xl bg-muted animate-pulse" />
    </div>
  );
}
