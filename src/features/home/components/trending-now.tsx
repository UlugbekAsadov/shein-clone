import Link from "next/link";
import { Flame } from "lucide-react";
import { trendingProducts } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductHorizontalList } from "@/shared/components/product/product-horizontal-list";
import { SectionHeader } from "./section-header";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export function TrendingNow({ title, subtitle, viewAllLabel }: IProps) {
  return (
    <section className="mx-auto max-w-360 px-4 py-2 md:px-6 md:py-3">
      <div className="rounded-xl bg-[#FF3C0614] p-3 md:p-5">
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
          viewAllHiddenOnMobile
        />

        <div className="md:hidden">
          <ProductHorizontalList products={trendingProducts} />
          <Link
            href="#"
            className="mt-3 grid h-12 w-full place-items-center rounded-full bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="hidden md:block">
          <ProductGrid products={trendingProducts} />
        </div>
      </div>
    </section>
  );
}
