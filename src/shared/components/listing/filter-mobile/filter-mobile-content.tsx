import { materialOptions, styleOptions } from "@/shared/mocks";
import { ColorFilter } from "../filter-sidebar/color-filter";
import { PriceFilter } from "../filter-sidebar/price-filter";
import { FilterMobileSection } from "./filter-mobile-section";
import { FilterMobileRating } from "./filter-mobile-rating";
import { FilterMobileSize } from "./filter-mobile-size";
import { FilterMobileContentType } from "./filter-mobile-content-type";
import { FilterMobileBrand } from "./filter-mobile-brand";
import { FilterMobileCheckboxList } from "./filter-mobile-checkbox-list";

interface IProps {
  dict: {
    color: string;
    priceTo: string;
    style: string;
    material: string;
  };
}

export function FilterMobileContent({ dict }: IProps) {
  return (
    <>
      <FilterMobileSection title="Rating">
        <FilterMobileRating />
      </FilterMobileSection>

      <FilterMobileSection>
        <FilterMobileSize />
      </FilterMobileSection>

      <FilterMobileSection title="Content type">
        <FilterMobileContentType />
      </FilterMobileSection>

      <FilterMobileSection title={dict.color}>
        <ColorFilter />
      </FilterMobileSection>

      <FilterMobileSection title="Price">
        <PriceFilter toLabel={dict.priceTo} />
      </FilterMobileSection>

      <FilterMobileSection title="Brand">
        <FilterMobileBrand />
      </FilterMobileSection>

      <FilterMobileSection title={dict.style}>
        <FilterMobileCheckboxList
          options={styleOptions}
          initialSelected={["vintage", "streerwear"]}
        />
      </FilterMobileSection>

      <FilterMobileSection title={dict.material}>
        <FilterMobileCheckboxList
          options={materialOptions}
          initialSelected={["silk", "linen"]}
        />
      </FilterMobileSection>
    </>
  );
}
