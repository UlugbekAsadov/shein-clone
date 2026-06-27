import { Separator } from "@/shared/components/ui/separator";

export function CardsDesktopSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="h-7 w-40 rounded bg-muted animate-pulse" />
        <div className="h-10.5 w-36 rounded-sm bg-muted animate-pulse" />
      </div>

      <Separator className="my-5" />

      <ul className="flex flex-col">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="flex w-full items-center gap-4 py-3">
            <div className="size-5 shrink-0 rounded-full bg-muted animate-pulse" />
            <div className="h-10 w-14 shrink-0 rounded-md bg-muted animate-pulse" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              <div className="h-3.5 w-44 rounded bg-muted animate-pulse" />
            </div>
            <div className="size-11.5 shrink-0 rounded-sm bg-muted animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  );
}
