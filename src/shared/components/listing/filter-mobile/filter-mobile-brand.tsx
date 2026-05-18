import { brandFilters } from "@/shared/mocks";
import { FilterMobileCheckboxList } from "./filter-mobile-checkbox-list";

export function FilterMobileBrand() {
  const options = brandFilters.map((b) => ({ id: b.id, label: b.name }));

  return (
    <FilterMobileCheckboxList
      options={options}
      initialSelected={["adidas", "zara"]}
    />
  );
}
