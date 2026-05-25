"use client";

import type { IProduct } from "@/types/product.interface";
import { ProductCard } from "@/shared/components/product/product-card";
import { ProductListItem } from "@/shared/components/product/product-list-item";
import { cn } from "@/lib/utils";
import { useListingView } from "./hooks/use-listing-view";

interface IProps {
  products: IProduct[];
  className?: string;
  mobileGridClassName?: string;
}

const desktopGridByView = {
  comfortable: "md:grid-cols-3",
  compact: "md:grid-cols-4",
  list: "md:grid-cols-1",
} as const;

export function ListingProductGrid({
  products,
  className,
  mobileGridClassName = "grid-cols-2 sm:grid-cols-3",
}: IProps) {
  const { view } = useListingView();

  return (
    <div className={cn("mt-2 md:mt-6", className)}>
      <div className={cn("grid gap-3 md:hidden", mobileGridClassName)}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {view === "list" ? (
        <div className="hidden flex-col gap-3 md:flex">
          {products.map((p) => (
            <ProductListItem key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className={cn("hidden gap-3 md:grid", desktopGridByView[view])}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
