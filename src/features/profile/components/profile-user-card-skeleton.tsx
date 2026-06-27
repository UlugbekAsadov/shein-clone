export function ProfileUserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 pb-3 border-b border-border">
      <div className="size-12 shrink-0 rounded-full bg-muted animate-pulse" />
      <div className="h-5 w-28 rounded bg-muted animate-pulse" />
    </div>
  );
}
