import { COMMENTS_DEFAULT_SORT } from "@/features/products/pages/[slug]/pages/comments/utils/comments-query.constants";
import type { ICommentsFilterState } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-state.interface";

function splitParam(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export function parseCommentsFilters(
  params: URLSearchParams,
): ICommentsFilterState {
  return {
    ratings: splitParam(params.get("rating")),
    contentTypes: splitParam(params.get("content_type")),
    colors: splitParam(params.get("colors")),
    sizes: splitParam(params.get("sizes")),
    sort: params.get("sort") ?? COMMENTS_DEFAULT_SORT,
  };
}

export function buildCommentsFilterQuery(
  filters: ICommentsFilterState,
): string {
  const params = new URLSearchParams();
  if (filters.ratings.length) params.set("rating", filters.ratings.join(","));
  if (filters.contentTypes.length) {
    params.set("content_type", filters.contentTypes.join(","));
  }
  if (filters.colors.length) params.set("colors", filters.colors.join(","));
  if (filters.sizes.length) params.set("sizes", filters.sizes.join(","));
  if (filters.sort && filters.sort !== COMMENTS_DEFAULT_SORT) {
    params.set("sort", filters.sort);
  }
  return params.toString();
}
