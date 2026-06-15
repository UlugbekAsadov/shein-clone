import { cn } from "@/lib/utils";

export function ProductCardSkeleton() {
  return (
    <article>
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-[10px]",
          "md:p-1.5 md:rounded-lg md:bg-card",
        )}
      >
        <div
          className={cn(
            "aspect-4/5 rounded-[10px] bg-muted animate-pulse",
            "md:rounded-md",
          )}
        />

        <div
          className={cn(
            "flex flex-col gap-2 p-0 pt-2 pb-0.5",
            "md:p-2.5 md:pb-3.5",
          )}
        >
          <div className="space-y-1.5">
            <div className="h-4 md:h-5 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 md:h-5 w-4/5 rounded bg-muted animate-pulse" />
          </div>

          <div className="h-3.5 w-3/4 rounded bg-muted animate-pulse" />

          <div className="flex items-center gap-2">
            <div className="h-5 md:h-6 w-20 rounded bg-muted animate-pulse" />
            <div className="h-4 w-14 rounded bg-muted animate-pulse" />
            <div className="ml-auto hidden h-4 w-16 rounded bg-muted animate-pulse md:block" />
          </div>

          <div className="mt-2 hidden items-center gap-2 md:flex">
            <div className="h-9 flex-1 rounded-[10px] bg-muted animate-pulse" />
            <div className="size-9 shrink-0 rounded-[10px] bg-muted animate-pulse" />
          </div>

          <div className="mt-1 h-10 rounded-[8px] bg-muted animate-pulse md:hidden" />
        </div>
      </div>
    </article>
  );
}
