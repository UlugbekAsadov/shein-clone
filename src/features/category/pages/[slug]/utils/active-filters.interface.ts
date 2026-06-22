export interface IActiveFilters {
  categoryIds: number[];
  brandIds: number[];
  seasonIds: number[];
  minPrice: number | null;
  maxPrice: number | null;
  hasDiscount: boolean;
  isOriginal: boolean;
  attributeItemIds: number[];
}
