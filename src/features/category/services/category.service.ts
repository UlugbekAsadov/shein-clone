import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { categoryApi } from "@/features/category/api/category.api";
import type { ICategory } from "@/features/category/utils/category-group.interface";

export const getCategories = cache(async (): Promise<ICategory[]> => {
  try {
    const result = await categoryApi.getAll();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});
