import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { CARD_CACHE_TAG, CARD_ENDPOINTS } from "./card.endpoints";
import type {
  ICard,
  ICardCreateRequest,
} from "@/features/profile/pages/payments/utils/card.interface";

export const cardApi = {
  getAll() {
    return apiClient.get<IApiResponse<ICard[]>>(CARD_ENDPOINTS.list, {
      next: { tags: [CARD_CACHE_TAG] },
    });
  },
  create(payload: ICardCreateRequest) {
    return apiClient.post<IApiResponse<ICard>>(CARD_ENDPOINTS.store, payload);
  },
  delete(id: number | string) {
    return apiClient.delete<IApiResponse<null>>(CARD_ENDPOINTS.destroy(id));
  },
  setDefault(id: number | string) {
    return apiClient.patch<IApiResponse<null>>(CARD_ENDPOINTS.setDefault(id));
  },
};

export { CARD_CACHE_TAG };
