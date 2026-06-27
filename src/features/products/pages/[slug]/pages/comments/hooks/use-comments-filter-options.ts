"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { ICommentFilterOptions } from "@/features/products/pages/[slug]/pages/comments/utils/comment-filter-options.interface";

export function useCommentsFilterOptions(productId: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<ICommentFilterOptions | null>({
    enabled: productId != null,
    queryKey: ["comments-filter-options", productId, lang, currency],
    queryFn: async ({ signal }) => {
      try {
        const result = await productDetailApi.getCommentsFilterOptions(
          productId as number,
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
