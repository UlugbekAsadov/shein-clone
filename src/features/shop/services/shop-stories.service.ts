import { cookies } from "next/headers";
import { ApiError } from "@/core/api/api-error";
import { storyApi } from "@/features/home/api/story.api";
import type { IStory } from "@/features/home/utils/story.interface";

export async function getShopStories(shopId: number): Promise<IStory[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value ?? "guest";

  try {
    const result = await storyApi.getByShop(shopId, sessionId);
    return result.data?.stories ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}
