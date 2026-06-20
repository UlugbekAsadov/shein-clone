import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import type {
  IApiShop,
  IApiShopAbout,
  IApiShopPromoCode,
  IApiShopProductsData,
  IApiShopFilterOptions,
  IApiShopProductsResponse,
} from "@/features/shop/utils/shop-response.interface";

export async function getShopById(id: number): Promise<IApiShop | null> {
  try {
    const result = await shopApi.getById(id);
    return result.data?.shop ?? null;
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

export async function getShopHeader(slug: string): Promise<IApiShop | null> {
  try {
    const result = await shopApi.getHeader(slug);
    return result.data ?? null;
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

export async function getShopAbout(id: number): Promise<IApiShopAbout | null> {
  try {
    const result = await shopApi.getAbout(id);
    return result.data ?? null;
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

export async function getShopPromoCodes(
  id: number,
): Promise<IApiShopPromoCode[]> {
  try {
    const result = await shopApi.getPromoCodes(id);
    return result.data?.data ?? [];
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}

export async function getShopProducts(
  id: number,
  params?: Record<string, string | number | string[] | number[] | undefined>,
): Promise<IApiShopProductsData | null> {
  try {
    const result: IApiShopProductsResponse = await shopApi.getProducts(id, params);
    if (!result.data) return null;
    return { data: result.data, meta: result.meta };
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

export async function getShopFilterOptions(
  id: number,
  params?: Record<string, string | number | string[] | number[] | undefined>,
): Promise<IApiShopFilterOptions | null> {
  try {
    const result = await shopApi.getFilterOptions(id, params);
    return result.data ?? null;
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}
