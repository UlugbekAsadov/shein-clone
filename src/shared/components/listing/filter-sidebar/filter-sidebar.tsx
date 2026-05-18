import { cn } from "@/lib/utils";
import { FilterSidebarContent } from "./filter-sidebar-content";

interface IProps {
  dict: {
    title: string;
    quickFilters: string;
    category: string;
    size: string;
    sizeClothing: string;
    sizeShoes: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
    brandsSearch: string;
    style: string;
    material: string;
  };
  quickFiltersLabels: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
}

export function FilterSidebar({ dict, quickFiltersLabels }: IProps) {
  return (
    <aside className={cn("w-60 shrink-0 hidden", "md:block")}>
      <h2 className="pb-3 text-lg font-bold border-b">{dict.title}</h2>

      <FilterSidebarContent
        dict={dict}
        quickFiltersLabels={quickFiltersLabels}
      />
    </aside>
  );
}
