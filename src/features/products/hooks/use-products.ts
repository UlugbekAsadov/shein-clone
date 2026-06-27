"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productsApi } from "@/features/products/api/products.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiProductsData } from "@/features/products/utils/products-response.interface";

export function useProducts(params: Record<string, string>, page = 1) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiProductsData | null>({
    queryKey: ["products", lang, currency, params, page],
    queryFn: async () => {
      try {
        const result = await productsApi.getProducts(params, page);
        if (!result.data) return null;
        return { data: result.data, meta: result.meta };
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
