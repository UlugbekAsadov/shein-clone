"use server";

import { ApiError } from "@/core/api/api-error";
import type { IActionResult } from "@/types/action-result.interface";
import { shopApi } from "@/features/shop/api/shop.api";

export async function toggleShopFollowAction(
  shopId: number,
): Promise<IActionResult> {
  try {
    const result = await shopApi.toggleFollow(shopId);
    return { ok: true, message: result.message };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        ok: false,
        message: error.userMessage,
        errorCode: error.errorCode,
      };
    }
    throw error;
  }
}
