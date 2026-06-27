"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import { COMMENTS_PER_PAGE } from "@/features/products/pages/[slug]/pages/comments/utils/comments-query.constants";
import type { IProductCommentsData } from "@/features/products/pages/[slug]/pages/comments/utils/product-comments.interface";
import type { ICommentsFilterState } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-state.interface";

export function useProductComments(
  productId: number | undefined,
  filters: ICommentsFilterState,
) {
  const { currency, lang } = useApiDeps();

  return useQuery<IProductCommentsData | null>({
    enabled: productId != null,
    placeholderData: keepPreviousData,
    queryKey: [
      "product-comments",
      productId,
      lang,
      currency,
      filters.sort,
      filters.ratings,
      filters.contentTypes,
      filters.colors,
      filters.sizes,
    ],
    queryFn: async ({ signal }) => {
      try {
        const result = await productDetailApi.getComments(
          productId as number,
          filters,
          COMMENTS_PER_PAGE,
          signal,
        );
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
