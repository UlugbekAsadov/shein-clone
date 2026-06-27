import { ProductCardSkeleton } from "@/shared/components/product/product-card-skeleton";

export function ProductSectionsSkeleton() {
  return (
    <div className="mx-auto max-w-360 space-y-8 px-4 py-4 md:px-6 md:py-6">
      {Array.from({ length: 2 }).map((_, group) => (
        <section key={group} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-40 rounded bg-muted animate-pulse md:h-7 md:w-56" />
            <div className="h-5 w-16 rounded bg-muted animate-pulse" />
          </div>
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-40 shrink-0 md:w-52">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
