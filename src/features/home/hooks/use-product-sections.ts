"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { productSectionsApi } from "@/features/home/api/product-sections.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IProductSection } from "@/features/home/utils/product-section.interface";

export function useProductSections() {
  const { currency, lang } = useApiDeps();

  return useQuery<IProductSection[]>({
    queryKey: ["product-sections", lang, currency],
    queryFn: async () => {
      try {
        const result = await productSectionsApi.getAll();
        return Array.isArray(result.data) ? result.data : [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
