import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { featuredShopsApi } from "@/features/home/api/featured-shops.api";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";

export const getFeaturedShops = cache(async (): Promise<IApiFeaturedShop[]> => {
  try {
    const result = await featuredShopsApi.getAll();
    return Array.isArray(result.data?.data) ? result.data?.data : [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});
