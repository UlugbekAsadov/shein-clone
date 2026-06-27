export function StoriesSkeleton() {
  return (
    <div className="mx-auto mb-3 max-w-360 pt-3 md:mb-8 md:pt-0">
      <div className="flex gap-3 overflow-hidden px-4 md:gap-6 md:px-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 flex-col items-center gap-1 md:gap-2"
          >
            <div className="size-15 rounded-full bg-muted animate-pulse md:size-24" />
            <div className="h-3 w-12 rounded bg-muted animate-pulse md:h-3.5 md:w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
