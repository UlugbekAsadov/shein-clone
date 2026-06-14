import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { categoryApi } from "@/features/category/api/category.api";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import type { IApiCategorySectionData } from "@/features/category/pages/[slug]/utils/category-section.interface";

export const getCategories = cache(async (): Promise<ICategory[]> => {
  try {
    const result = await categoryApi.getAll();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});

export const getProductSection = cache(
  async (slug: string): Promise<IApiCategorySectionData | null> => {
    try {
      const result = await categoryApi.getSection(slug, 1);
      return result.data ?? null;
    } catch (error) {
      if (error instanceof ApiError) return null;
      throw error;
    }
  },
);
