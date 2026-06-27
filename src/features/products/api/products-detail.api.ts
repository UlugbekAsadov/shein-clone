import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { ISimilarProductsData } from "@/features/products/pages/[slug]/utils/similar-product.interface";
import type { IProductCommentsData } from "@/features/products/pages/[slug]/pages/comments/utils/product-comments.interface";
import type { ICommentFilterOptions } from "@/features/products/pages/[slug]/pages/comments/utils/comment-filter-options.interface";
import type { ICommentsFilterState } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-state.interface";
import { PRODUCT_DETAIL_ENDPOINTS } from "./products-detail.endpoints";

export const productDetailApi = {
  getBySlug(slug: string, signal?: AbortSignal) {
    return apiClient.get<IApiResponse<IProductDetail>>(
      PRODUCT_DETAIL_ENDPOINTS.bySlug(slug),
      {
        searchParams: { variant_clothes: "true" },
        signal,
      },
    );
  },

  getSimilarProducts(id: number) {
    return apiClient.get<IApiResponse<ISimilarProductsData>>(
      PRODUCT_DETAIL_ENDPOINTS.similarProducts(id),
    );
  },

  getRecommendedProducts(id: number) {
    return apiClient.get<IApiResponse<ISimilarProductsData>>(
      PRODUCT_DETAIL_ENDPOINTS.recommendedProducts(id),
    );
  },

  getComments(
    id: number,
    filters: ICommentsFilterState,
    limit: number,
    sessionId: string,
    signal?: AbortSignal,
  ) {
    return apiClient.get<IApiResponse<IProductCommentsData>>(
      PRODUCT_DETAIL_ENDPOINTS.comments(id),
      {
        searchParams: {
          limit,
          session_id: sessionId,
          sort: filters.sort || undefined,
          rating: filters.ratings.length ? filters.ratings.join(",") : undefined,
          content_type: filters.contentTypes.length
            ? filters.contentTypes.join(",")
            : undefined,
          colors: filters.colors.length ? filters.colors.join(",") : undefined,
          sizes: filters.sizes.length ? filters.sizes.join(",") : undefined,
        },
        signal,
      },
    );
  },

  getCommentsFilterOptions(id: number, signal?: AbortSignal) {
    return apiClient.get<IApiResponse<ICommentFilterOptions>>(
      PRODUCT_DETAIL_ENDPOINTS.commentsFilterOptions(id),
      { signal },
    );
  },

  likeComment(commentId: string, sessionId: string) {
    return apiClient.post<IApiResponse<unknown>>(
      PRODUCT_DETAIL_ENDPOINTS.likeComment(commentId),
      { session_id: sessionId },
    );
  },
};
