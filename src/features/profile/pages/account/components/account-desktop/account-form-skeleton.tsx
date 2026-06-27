export function AccountFormSkeleton() {
  return (
    <div className="max-w-2xl">
      <div className="flex flex-col items-start gap-3">
        <div className="size-20 rounded-full bg-muted animate-pulse" />
        <div className="h-9 w-32 rounded-sm bg-muted animate-pulse" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="h-4 w-28 rounded bg-muted animate-pulse" />
        <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12.5 rounded-sm bg-muted animate-pulse" />
          <div className="h-12.5 rounded-sm bg-muted animate-pulse" />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="h-12.5 w-32 rounded-sm bg-muted animate-pulse" />
      </div>
    </div>
  );
}
