"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import { getClientSessionId } from "@/lib/session-id";
import { GALLERY_COMMENTS_LIMIT } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/utils/gallery-comments.constants";
import type { IProductCommentsData } from "@/features/products/pages/[slug]/pages/comments/utils/product-comments.interface";

export function useGalleryComments(productId: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IProductCommentsData | null>({
    enabled: productId != null,
    queryKey: ["gallery-comments", productId, lang, currency],
    queryFn: async ({ signal }) => {
      try {
        const result = await productDetailApi.getImageComments(
          productId as number,
          GALLERY_COMMENTS_LIMIT,
          getClientSessionId(),
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
