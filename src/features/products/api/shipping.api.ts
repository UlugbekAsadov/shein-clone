import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IShippingStep } from "@/features/products/pages/[slug]/utils/shipping-step.interface";
import { SHIPPING_ENDPOINTS } from "./shipping.endpoints";

export const shippingApi = {
  getSteps() {
    return apiClient.get<IApiResponse<IShippingStep[]>>(
      SHIPPING_ENDPOINTS.steps,
    );
  },
};
