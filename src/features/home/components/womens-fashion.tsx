import { SlidersHorizontal } from "lucide-react";
import { womensFashion } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductGroupHeader } from "./product-group/product-group-header";

interface IProps {
  title: string;
  subtitle: string;
  filtersLabel: string;
}

export function WomensFashion({ title, subtitle, filtersLabel }: IProps) {
  return (
    <section className="mx-auto max-w-360 px-4 py-2 md:px-6 md:py-3">
      <ProductGroupHeader
        title={title}
        subtitle={subtitle}
        rightAction={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <SlidersHorizontal className="size-3.5" />
            {filtersLabel}
          </button>
        }
      />
      <ProductGrid products={womensFashion} variant="dark" />
    </section>
  );
}
