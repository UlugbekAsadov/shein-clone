import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import {
  MARKETING_BADGE_CACHE_TAG,
  MARKETING_BADGE_ENDPOINTS,
} from "./marketing-badge.endpoints";
import type { IMarketingBadge } from "@/features/home/utils/marketing-badge.interface";

export const marketingBadgeApi = {
  get() {
    return apiClient.get<IApiResponse<IMarketingBadge>>(
      MARKETING_BADGE_ENDPOINTS.get,
      {
        skipAuth: true,
        next: { tags: [MARKETING_BADGE_CACHE_TAG] },
      }
    );
  },
};

export { MARKETING_BADGE_CACHE_TAG };
