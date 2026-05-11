import { moreToExplore } from "@/lib/mock-data";
import { ProductGrid } from "@/components/common/product/product-grid";
import { SectionHeader } from "./section-header";

type Props = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
};

export function MoreToExplore({ title, subtitle, viewAllLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="rounded-xl bg-blue-50/50 p-5">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref="#"
          viewAllLabel={viewAllLabel}
        />
        <ProductGrid products={moreToExplore} />
      </div>
    </section>
  );
}
