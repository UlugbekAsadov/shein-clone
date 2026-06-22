"use client";

import { cn } from "@/lib/utils";
import { useListingView } from "./hooks/use-listing-view";
import { ProductCardSkeleton } from "@/shared/components/product/product-card-skeleton";

const desktopGridByView = {
  comfortable: "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  compact: "md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
} as const;

const desktopCountByView = {
  comfortable: 10,
  compact: 12,
} as const;

export function ListingProductGridSkeleton() {
  const { view } = useListingView();

  return (
    <div className="mt-2 md:mt-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      <div className={cn("hidden gap-3 md:grid", desktopGridByView[view])}>
        {Array.from({ length: desktopCountByView[view] }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
