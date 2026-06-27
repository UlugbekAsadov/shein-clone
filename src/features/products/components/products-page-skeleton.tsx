import { ProductCardSkeleton } from "@/shared/components/product/product-card-skeleton";

export function ProductsPageSkeleton() {
  return (
    <div className="mx-auto max-w-360 px-4 pb-6 pt-2 md:px-6 md:pt-4">
      <div className="mb-4 hidden h-6 w-64 rounded bg-muted animate-pulse md:block" />

      <div className="mb-6 hidden items-center gap-3 md:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 rounded-full bg-muted animate-pulse"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
