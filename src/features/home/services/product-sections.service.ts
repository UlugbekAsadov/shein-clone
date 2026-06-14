import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { productSectionsApi } from "@/features/home/api/product-sections.api";
import type { IProductSection } from "@/features/home/utils/product-section.interface";

export const getProductSections = cache(async (): Promise<IProductSection[]> => {
  try {
    const result = await productSectionsApi.getAll();
    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});
