export function CategoryRailSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden p-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex w-15 shrink-0 flex-col items-center gap-2.5 md:w-30"
        >
          <div className="size-15 rounded-[28px] bg-muted animate-pulse md:size-30" />
          <div className="h-3 w-10 rounded bg-muted animate-pulse md:h-4 md:w-20" />
        </div>
      ))}
    </div>
  );
}
