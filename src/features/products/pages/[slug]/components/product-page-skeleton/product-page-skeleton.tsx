import { ProductCardSkeleton } from "@/shared/components/product/product-card-skeleton";

export function ProductPageSkeleton() {
  return (
    <div className="mx-auto flex max-w-360 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="hidden h-4 w-64 rounded bg-muted animate-pulse md:block" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="hidden flex-col gap-2 md:flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 w-22 rounded-[16px] bg-muted animate-pulse"
              />
            ))}
          </div>
          <div className="aspect-3/4 flex-1 rounded-2xl bg-muted animate-pulse" />
        </div>

        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <div className="h-7 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
          </div>

          <div className="h-9 w-40 rounded bg-muted animate-pulse" />

          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="size-12 rounded-full bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-16 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="h-12 w-32 rounded-lg bg-muted animate-pulse" />

          <div className="mt-2 flex gap-3">
            <div className="h-12 flex-1 rounded-lg bg-muted animate-pulse" />
            <div className="h-12 flex-1 rounded-lg bg-muted animate-pulse" />
          </div>

          <div className="space-y-3 rounded-2xl border border-border p-4">
            <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
            <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
            <div className="size-12 shrink-0 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
              <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-9 w-24 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <div className="h-6 w-48 rounded bg-muted animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
