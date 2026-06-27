import { ProductCardSkeleton } from "@/shared/components/product/product-card-skeleton";
import { ShopHighlightsSkeleton } from "@/features/shop/pages/[slug]/components/shop-highlights/shop-highlights-skeleton";

export function ShopPageSkeleton() {
  return (
    <div className="space-y-6 py-4 md:py-6">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <section className="overflow-hidden rounded-[24px] border border-border bg-card">
          <div className="h-40 w-full bg-muted animate-pulse md:h-56" />

          <div className="px-4 pb-6 md:px-8">
            <div className="-mt-12 flex items-end gap-5">
              <div className="size-24 shrink-0 rounded-full bg-muted animate-pulse ring-4 ring-card md:size-28" />
            </div>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 space-y-3">
                <div className="h-7 w-48 rounded bg-muted animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                <div className="flex gap-6 pt-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-5 w-12 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-10 w-28 rounded-full bg-muted animate-pulse" />
            </div>
          </div>
        </section>
      </div>

      <ShopHighlightsSkeleton />

      <div className="mx-auto max-w-360 space-y-6 px-4 md:px-6">
        <div className="flex gap-4 border-b border-border pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-24 rounded bg-muted animate-pulse" />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
