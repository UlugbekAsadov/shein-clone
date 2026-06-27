"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { categoryApi } from "@/features/category/api/category.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { ICategory } from "@/features/category/utils/category-group.interface";

export function useCategories() {
  const { currency, lang } = useApiDeps();

  return useQuery<ICategory[]>({
    queryKey: ["categories", lang, currency],
    queryFn: async () => {
      try {
        const result = await categoryApi.getAll();
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
