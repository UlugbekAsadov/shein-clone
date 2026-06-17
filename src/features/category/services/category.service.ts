import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { categoryApi } from "@/features/category/api/category.api";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import type { IApiFilterOptions } from "@/types/filter-options.interface";

export const getCategories = cache(async (): Promise<ICategory[]> => {
  try {
    const result = await categoryApi.getAll();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});

export const getCategoryFilterOptions = cache(
  async (query?: string): Promise<IApiFilterOptions | null> => {
    try {
      const params = query ? { query } : undefined;
      const result = await categoryApi.getFilterOptions(params);
      return result.data ?? null;
    } catch (error) {
      if (error instanceof ApiError) return null;
      throw error;
    }
  },
);
