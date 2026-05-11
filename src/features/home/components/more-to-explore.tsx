import { moreToExplore } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { SectionHeader } from "./section-header";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export function MoreToExplore({ title, subtitle, viewAllLabel }: IProps) {
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
