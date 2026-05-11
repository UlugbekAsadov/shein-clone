import { Flame } from "lucide-react";
import { trendingProducts } from "@/lib/mock-data";
import { ProductGrid } from "@/components/common/product/product-grid";
import { SectionHeader } from "./section-header";

type Props = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
};

export function TrendingNow({ title, subtitle, viewAllLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="rounded-xl bg-[#FF3C0614] p-5">
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              {title}
              <Flame className="size-5 text-rose-500" />
            </span>
          }
          subtitle={subtitle}
          viewAllHref="#"
          viewAllLabel={viewAllLabel}
        />
        <ProductGrid products={trendingProducts} />
      </div>
    </section>
  );
}
