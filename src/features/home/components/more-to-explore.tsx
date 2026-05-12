import Link from "next/link";
import { moreToExplore } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductHorizontalList } from "@/shared/components/product/product-horizontal-list";
import { SectionHeader } from "./section-header";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export function MoreToExplore({ title, subtitle, viewAllLabel }: IProps) {
  return (
    <section className="mx-auto max-w-360 px-4 py-4 md:px-6 md:py-6">
      <div className="rounded-xl bg-blue-50/50 p-3 md:p-5">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref="#"
          viewAllLabel={viewAllLabel}
          viewAllHiddenOnMobile
        />

        <div className="md:hidden">
          <ProductHorizontalList products={moreToExplore} />
          <Link
            href="#"
            className="mt-3 grid h-12 w-full place-items-center rounded-full bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="hidden md:block">
          <ProductGrid products={moreToExplore} />
        </div>
      </div>
    </section>
  );
}
