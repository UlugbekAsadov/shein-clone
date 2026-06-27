"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IProduct } from "@/types/product.interface";
import type { ISimilarProductAutoFilter } from "@/features/products/pages/[slug]/utils/similar-product.interface";

export function useRecommendedProducts(id: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<{
    products: IProduct[];
    autoFilter: ISimilarProductAutoFilter | null;
  }>({
    queryKey: ["recommended-products", id, lang, currency],
    enabled: id != null,
    queryFn: async () => {
      try {
        const result = await productDetailApi.getRecommendedProducts(
          id as number,
        );
        return {
          products: result.data?.products ?? [],
          autoFilter: result.data?.auto_filter ?? null,
        };
      } catch (error) {
        if (error instanceof ApiError) return { products: [], autoFilter: null };
        throw error;
      }
    },
  });
}
