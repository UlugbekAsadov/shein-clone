import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/product/api/products-detail.api";
import type { IProductDetail } from "@/features/product/pages/[slug]/utils/product-detail.interface";
import { mapSimilarProductToProduct } from "@/features/product/pages/[slug]/utils/similar-product.mapper";
import type { IProduct } from "@/types/product.interface";

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

export async function getSimilarProducts(id: number): Promise<IProduct[]> {
  try {
    const result = await productDetailApi.getSimilarProducts(id);
    return (result.data ?? []).map(mapSimilarProductToProduct);
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}

export async function getRecommendedProducts(id: number): Promise<IProduct[]> {
  try {
    const result = await productDetailApi.getRecommendedProducts(id);
    return (result.data ?? []).map(mapSimilarProductToProduct);
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}
