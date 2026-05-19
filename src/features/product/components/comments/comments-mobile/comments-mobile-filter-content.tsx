import { FilterMobileSection } from "@/shared/components/listing/filter-mobile/filter-mobile-section";
import { FilterMobileRating } from "@/shared/components/listing/filter-mobile/filter-mobile-rating";
import { FilterMobileSize } from "@/shared/components/listing/filter-mobile/filter-mobile-size";
import { FilterMobileContentType } from "@/shared/components/listing/filter-mobile/filter-mobile-content-type";
import { ColorFilter } from "@/shared/components/listing/filter-sidebar/color-filter";
import { CommentsMobileSort } from "./comments-mobile-sort";

export function CommentsMobileFilterContent() {
  return (
    <>
      <FilterMobileSection title="Sort">
        <CommentsMobileSort />
      </FilterMobileSection>

      <FilterMobileSection title="Rating">
        <FilterMobileRating />
      </FilterMobileSection>

      <FilterMobileSection>
        <FilterMobileSize />
      </FilterMobileSection>

      <FilterMobileSection title="Content type">
        <FilterMobileContentType />
      </FilterMobileSection>

      <FilterMobileSection title="Colors">
        <ColorFilter />
      </FilterMobileSection>
    </>
  );
}
