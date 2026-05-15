import Link from "next/link";
import { moreToExplore } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductHorizontalList } from "@/shared/components/product/product-horizontal-list";
import { SectionHeader } from "./section-header";
import { ECommerceBagBlueBag } from "@/shared/components/icons/solid";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export function MoreToExplore({ title, subtitle, viewAllLabel }: IProps) {
  return (
    <section className={cn("mx-auto max-w-360 px-4 py-2", "md:px-6 md:py-3")}>
      <div className={cn("rounded-md md:rounded-xl bg-[#FF3C0614]", "md:p-5")}>
        <SectionHeader
          title={
            <span className="flex items-center gap-2">
              {title}
              <ECommerceBagBlueBag className="size-6" />
            </span>
          }
          subtitle={subtitle}
          viewAllHref="#"
          viewAllLabel={viewAllLabel}
          viewAllHiddenOnMobile
        />

        <div className="md:hidden">
          <ProductHorizontalList products={moreToExplore} />
          <div className="px-3 pb-3">
            <Link
              href="#"
              className="mt-3 grid h-12 w-full place-items-center rounded-[12px] bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <ProductGrid products={moreToExplore} />
        </div>
      </div>
    </section>
  );
}
