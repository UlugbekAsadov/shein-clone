import { cache } from "react";
import { cookies } from "next/headers";
import { ApiError } from "@/core/api/api-error";
import { shopStoriesApi } from "@/features/home/api/shop-stories.api";
import type { IShop } from "@/features/home/utils/shop-story.interface";

export const getShopStories = cache(async (): Promise<IShop[]> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value ?? "guest";

  try {
    const result = await shopStoriesApi.getAll(sessionId);
    return result.data?.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
});
