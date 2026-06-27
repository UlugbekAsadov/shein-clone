"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { categoryApi } from "@/features/category/api/category.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiFilterOptions } from "@/types/filter-options.interface";

export function useCategoryFilterOptions(query?: string) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiFilterOptions | null>({
    queryKey: ["category-filter-options", lang, currency, query ?? ""],
    queryFn: async () => {
      try {
        const params = query ? { query } : undefined;
        const result = await categoryApi.getFilterOptions(params);
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
