import { cookies } from "next/headers";
import { ApiError } from "@/core/api/api-error";
import { shopHighlightApi } from "@/features/shop/api/shop-highlight.api";
import type { IApiShopHighlight } from "@/features/shop/utils/shop-highlight.interface";

export async function getShopHighlights(shopId: number): Promise<IApiShopHighlight[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value ?? "guest";

  try {
    const result = await shopHighlightApi.getByShop(shopId, sessionId);
    return result.data?.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}
