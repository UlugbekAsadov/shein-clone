export function AddressesMobileSkeleton() {
  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
        <div className="mx-auto h-5 w-32 rounded bg-muted animate-pulse" />
        <div className="size-10 shrink-0" />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pt-2 pb-32">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex w-full items-center gap-3 rounded-[18px] bg-secondary p-3"
          >
            <div className="size-10 shrink-0 rounded-[8px] bg-muted animate-pulse" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3.5 w-32 rounded bg-muted animate-pulse" />
              <div className="h-3 w-48 max-w-full rounded bg-muted animate-pulse" />
            </div>
            <div className="size-6 shrink-0 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
