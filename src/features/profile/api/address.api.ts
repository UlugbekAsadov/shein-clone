import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { ADDRESS_CACHE_TAG, ADDRESS_ENDPOINTS } from "./address.endpoints";
import type {
  IAddress,
  IAddressCreateRequest,
  IAddressUpdateRequest,
} from "@/features/profile/interfaces/address.interface";

export const addressApi = {
  getAll() {
    return apiClient.get<IApiResponse<IAddress[]>>(ADDRESS_ENDPOINTS.list, {
      next: { tags: [ADDRESS_CACHE_TAG] },
    });
  },
  get(id: number | string) {
    return apiClient.get<IApiResponse<IAddress>>(ADDRESS_ENDPOINTS.show(id), {
      next: { tags: [ADDRESS_CACHE_TAG] },
    });
  },
  create(payload: IAddressCreateRequest) {
    console.log({payload: payload})
    return apiClient.post<IApiResponse<IAddress>>(
      ADDRESS_ENDPOINTS.store,
      payload,
    );
  },
  update(id: number | string, payload: IAddressUpdateRequest) {
    return apiClient.put<IApiResponse<IAddress>>(
      ADDRESS_ENDPOINTS.update(id),
      payload,
    );
  },
  delete(id: number | string) {
    return apiClient.delete<IApiResponse<null>>(ADDRESS_ENDPOINTS.destroy(id));
  },
  setDefault(id: number | string) {
    return apiClient.patch<IApiResponse<IAddress>>(
      ADDRESS_ENDPOINTS.setDefault(id),
    );
  },
};

export { ADDRESS_CACHE_TAG };
