import { FilterSection } from "@/shared/components/listing/filter-sidebar/filter-section";
import { SizeFilter } from "@/shared/components/listing/filter-sidebar/size-filter";
import { ColorFilter } from "@/shared/components/listing/filter-sidebar/color-filter";
import {
  contentTypeFilterOptions,
  ratingFilterOptions,
} from "@/features/product/pages/[slug]/pages/comments/mocks/comments-filter.mocks";
import { SortFilter } from "./sort-filter";
import { CountedCheckboxList } from "./counted-checkbox-list";

export function CommentsFilterSidebar() {
  return (
    <aside className="w-60 shrink-0">
      <h2 className="pb-3 text-base font-bold">Filter</h2>

      <FilterSection title="Sort">
        <SortFilter />
      </FilterSection>

      <FilterSection title="Rating">
        <CountedCheckboxList
          options={ratingFilterOptions}
          defaultSelected={["4"]}
        />
      </FilterSection>

      <FilterSection title="Content type">
        <CountedCheckboxList
          options={contentTypeFilterOptions}
          defaultSelected={["video"]}
        />
      </FilterSection>

      <FilterSection title="Size">
        <SizeFilter clothingLabel="Clothing" shoesLabel="Shoes" />
      </FilterSection>

      <FilterSection title="Color">
        <ColorFilter />
      </FilterSection>
    </aside>
  );
}
