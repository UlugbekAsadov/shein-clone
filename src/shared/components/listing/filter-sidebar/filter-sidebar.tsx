import {
  filterCategoryTree,
  materialOptions,
  styleOptions,
} from "@/shared/mocks";
import { FilterSection } from "./filter-section";
import { QuickFilters } from "./quick-filters";
import { CategoryTree } from "./category-tree";
import { SizeFilter } from "./size-filter";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { BrandFilter } from "./brand-filter";
import { ChipToggleGroup } from "./chip-toggle-group";

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
    <aside className="w-60 shrink-0">
      <h2 className="pb-3 text-base font-bold">{dict.title}</h2>

      <FilterSection title={dict.quickFilters}>
        <QuickFilters filters={quickFiltersLabels} />
      </FilterSection>

      <FilterSection title={dict.category}>
        <CategoryTree nodes={filterCategoryTree} />
      </FilterSection>

      <FilterSection title={dict.size}>
        <SizeFilter
          clothingLabel={dict.sizeClothing}
          shoesLabel={dict.sizeShoes}
        />
      </FilterSection>

      <FilterSection title={dict.color}>
        <ColorFilter />
      </FilterSection>

      <FilterSection title={dict.priceRange}>
        <PriceFilter toLabel={dict.priceTo} />
      </FilterSection>

      <FilterSection title={dict.brands}>
        <BrandFilter searchPlaceholder={dict.brandsSearch} />
      </FilterSection>

      <FilterSection title={dict.style}>
        <ChipToggleGroup options={styleOptions} initialSelected={["formal"]} />
      </FilterSection>

      <FilterSection title={dict.material}>
        <ChipToggleGroup options={materialOptions} />
      </FilterSection>
    </aside>
  );
}
