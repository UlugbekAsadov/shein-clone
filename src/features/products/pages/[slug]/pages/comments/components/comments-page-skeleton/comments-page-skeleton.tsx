import { CommentsReviewCardSkeleton } from "./comments-review-card-skeleton";

export function CommentsPageSkeleton() {
  return (
    <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
      <div className="h-4 w-64 rounded bg-muted animate-pulse" />

      <section className="flex flex-col gap-4">
        <div className="h-6 w-56 rounded bg-muted animate-pulse" />

        <div className="h-36 rounded-lg bg-muted animate-pulse" />

        <div className="rounded-lg border border-border p-5">
          <div className="mb-3.5 h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9.5 w-24 rounded-[10px] bg-muted animate-pulse"
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommentsReviewCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
