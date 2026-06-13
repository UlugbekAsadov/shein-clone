import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { marketingBadgeApi } from "@/features/home/api/marketing-badge.api";
import type { IMarketingBadge } from "@/features/home/utils/marketing-badge.interface";

export const getMarketingBadge = cache(
  async (): Promise<IMarketingBadge | null> => {
    try {
      const result = await marketingBadgeApi.get();
      return result.data ?? null;
    } catch (error) {
      if (error instanceof ApiError) return null;
      throw error;
    }
  }
);
