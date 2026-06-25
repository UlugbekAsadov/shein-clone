import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";
import type {
  IProfileUpdateRequest,
  IUploadResult,
} from "@/features/profile/pages/account/utils/account.interface";
import { ACCOUNT_ENDPOINTS } from "./account.endpoints";

export const accountApi = {
  update(payload: IProfileUpdateRequest) {
    return apiClient.patch<IApiResponse<IAuthUser>>(
      ACCOUNT_ENDPOINTS.update,
      payload,
    );
  },
  upload(formData: FormData) {
    return apiClient.post<IApiResponse<IUploadResult | string>>(
      ACCOUNT_ENDPOINTS.upload,
      formData,
    );
  },
};
