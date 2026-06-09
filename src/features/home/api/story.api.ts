import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { STORY_ENDPOINTS } from "./story.endpoints";
import type { IStory } from "@/features/home/utils/story.interface";

interface IStoriesData {
  stories: IStory[];
  groups: unknown[];
}

export const storyApi = {
  getByShop(shopId: number, sessionId: string) {
    return apiClient.get<IApiResponse<IStoriesData>>(
      STORY_ENDPOINTS.list(shopId),
      {
        skipAuth: true,
        searchParams: { session_id: sessionId },
      },
    );
  },

  markViewed(shopId: number, storyId: number, sessionId: string) {
    return apiClient.post<IApiResponse<unknown>>(
      STORY_ENDPOINTS.markViewed(shopId, storyId),
      undefined,
      {
        skipAuth: true,
        searchParams: { session_id: sessionId },
      },
    );
  },
};
