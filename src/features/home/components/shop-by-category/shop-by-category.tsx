import { shopByCategory } from "@/shared/mocks";
import type { locales } from "@/core/config/i18n/i18n-config";
import { SectionHeader } from "../section-header";
import { CategoryRail } from "./category-rail";

interface IProps {
  lang: (typeof locales)[number];
  title: string;
  viewAllLabel: string;
}

export function ShopByCategory({ lang, title, viewAllLabel }: IProps) {
  return (
    <section className="mx-auto max-w-360 px-4 py-2 md:px-6 md:py-3 md:pt-6">
      <SectionHeader
        title={title}
        viewAllHref="#"
        viewAllLabel={viewAllLabel}
      />
      <CategoryRail lang={lang} items={shopByCategory} />
    </section>
  );
}
