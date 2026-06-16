import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";

export async function getShopById(id: number): Promise<IApiShop | null> {
  try {
    const result = await shopApi.getById(id);
    return result.data?.shop ?? null;
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}
