import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { MEASUREMENT_CACHE_TAG, MEASUREMENT_ENDPOINTS } from "./measurement.endpoints";
import type { IMeasurements } from "@/features/profile/pages/measurements/utils/measurement.interface";

export const measurementApi = {
  get() {
    return apiClient.get<IApiResponse<IMeasurements>>(MEASUREMENT_ENDPOINTS.measurements, {
      next: { tags: [MEASUREMENT_CACHE_TAG] },
    });
  },
  save(payload: IMeasurements) {
    return apiClient.post<IApiResponse<IMeasurements>>(
      MEASUREMENT_ENDPOINTS.measurements,
      payload,
    );
  },
};

export { MEASUREMENT_CACHE_TAG };
