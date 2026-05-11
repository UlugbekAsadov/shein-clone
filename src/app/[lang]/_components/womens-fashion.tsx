import { SlidersHorizontal } from "lucide-react";
import { womensFashion } from "@/lib/mock-data";
import { ProductGrid } from "@/components/common/product/product-grid";
import { SectionHeader } from "./section-header";

type Props = {
  title: string;
  subtitle: string;
  filtersLabel: string;
};

export function WomensFashion({ title, subtitle, filtersLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <SectionHeader
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
      <ProductGrid products={womensFashion} />
    </section>
  );
}
