export function AccountMobileSkeleton() {
  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
        <div className="mx-auto h-5 w-32 rounded bg-muted animate-pulse" />
        <div className="size-10 shrink-0 rounded-full bg-muted animate-pulse" />
      </div>

      <div className="flex flex-col items-center px-4 pt-2 pb-6">
        <div className="size-17.5 rounded-full bg-muted animate-pulse" />
        <div className="mt-3 h-7.5 w-32 rounded-[8px] bg-muted animate-pulse" />
      </div>

      <div className="flex flex-col gap-5 px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
          </div>
        ))}
      </div>

      <div className="mt-auto px-4 pt-3 pb-4">
        <div className="h-12.5 w-full rounded-sm bg-muted animate-pulse" />
      </div>
    </div>
  );
}
