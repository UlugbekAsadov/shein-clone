export function CategoryNavSkeleton() {
  return (
    <div className="relative hidden md:block">
      <div className="flex w-screen items-center gap-6 px-6 pb-2">
        <div className="h-5 w-28 shrink-0 rounded bg-white/20 animate-pulse" />
        <div className="flex items-center gap-6 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-16 shrink-0 rounded bg-white/20 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
