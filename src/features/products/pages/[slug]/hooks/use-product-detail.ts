"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";

export function useProductDetail(slug: string) {
  const { currency, lang } = useApiDeps();

  return useQuery<IProductDetail | null>({
    queryKey: ["product-detail", slug, lang, currency],
    queryFn: async () => {
      try {
        const result = await productDetailApi.getBySlug(slug);
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
