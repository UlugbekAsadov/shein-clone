export function ProductCartDrawerSkeleton() {
  return (
    <div className="px-5 py-3">
      <div className="mb-4 h-4 w-20 animate-pulse rounded bg-muted" />
      <div className="mb-5 flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 w-16 animate-pulse rounded-[12px] bg-muted"
          />
        ))}
      </div>
      <div className="mb-3 h-4 w-16 animate-pulse rounded bg-muted" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-11 w-11 animate-pulse rounded-[10px] bg-muted"
          />
        ))}
      </div>
    </div>
  );
}
