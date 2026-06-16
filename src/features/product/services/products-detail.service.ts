import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/product/api/products-detail.api";
import type { IProductDetail } from "@/features/product/pages/[slug]/utils/product-detail.interface";

export async function getProductDetail(
  slug: string,
): Promise<IProductDetail | null> {
  try {
    const result = await productDetailApi.getBySlug(slug);
    return result.data ?? null;
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}
