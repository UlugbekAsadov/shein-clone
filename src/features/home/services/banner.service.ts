import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { bannerApi } from "@/features/home/api/banner.api";
import type { IBanner } from "@/features/home/utils/banner.interface";

export const getBanners = cache(async (): Promise<IBanner[]> => {
  try {
    const result = await bannerApi.getAll();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});
