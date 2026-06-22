import { ApiError } from "@/core/api/api-error";
import { productsApi } from "@/features/products/api/products.api";
import type { IApiProductsData } from "@/features/products/utils/products-response.interface";

export async function getProducts(
  params: Record<string, string>,
  page = 1,
): Promise<IApiProductsData | null> {
  try {
    const result = await productsApi.getProducts(params, page);
    if (!result.data) return null;
    return { data: result.data, meta: result.meta };
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}
