import { cache } from "react";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { ISimilarProductAutoFilter } from "@/features/products/pages/[slug]/utils/similar-product.interface";
import type { IProduct } from "@/types/product.interface";

interface IProductListResult {
  products: IProduct[];
  autoFilter: ISimilarProductAutoFilter | null;
}

export const getProductDetail = cache(
  async (slug: string): Promise<IProductDetail | null> => {
    try {
      const result = await productDetailApi.getBySlug(slug);
      return result.data ?? null;
    } catch (error) {
      if (error instanceof ApiError) return null;
      throw error;
    }
  },
);

export async function getSimilarProducts(
  id: number,
): Promise<IProductListResult> {
  try {
    const result = await productDetailApi.getSimilarProducts(id);
    return {
      products: result.data?.products ?? [],
      autoFilter: result.data?.auto_filter ?? null,
    };
  } catch (error) {
    if (error instanceof ApiError) return { products: [], autoFilter: null };
    throw error;
  }
}

export async function getRecommendedProducts(
  id: number,
): Promise<IProductListResult> {
  try {
    const result = await productDetailApi.getRecommendedProducts(id);
    return {
      products: result.data?.products ?? [],
      autoFilter: result.data?.auto_filter ?? null,
    };
  } catch (error) {
    if (error instanceof ApiError) return { products: [], autoFilter: null };
    throw error;
  }
}
