import { apiClient } from "@/core/api/api-client";
import { AUTH_ENDPOINTS } from "./auth.endpoints";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";
import type {
  ILoginRequest,
  ILoginResponseData,
  ISendCodeRequest,
} from "@/features/auth/login/utils/login.interface";
import type { IRegisterRequest } from "@/features/auth/login/utils/register.interface";

const ME_CACHE_TAG = "auth-me";

export const authApi = {
  sendCode(payload: ISendCodeRequest) {
    return apiClient.post<IApiResponse<null>>(AUTH_ENDPOINTS.sendCode, payload);
  },
  checkCode(payload: ILoginRequest) {
    return apiClient.post<IApiResponse<null>>(AUTH_ENDPOINTS.checkCode, payload);
  },
  login(payload: ILoginRequest) {
    return apiClient.post<IApiResponse<ILoginResponseData>>(
      AUTH_ENDPOINTS.login,
      payload,
    );
  },
  register(payload: IRegisterRequest) {
    return apiClient.post<IApiResponse<ILoginResponseData>>(
      AUTH_ENDPOINTS.register,
      payload,
    );
  },
  getMe() {
    return apiClient.get<IApiResponse<IAuthUser>>(AUTH_ENDPOINTS.getMe, {
      next: { tags: [ME_CACHE_TAG] },
    });
  },
};

export { ME_CACHE_TAG };
