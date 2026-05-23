import type { IAuthUser } from "@/features/auth/utils/auth.interface";

export type IContactType = "phone";

export interface ISendCodeRequest {
  contact: string;
  type: IContactType;
}

export interface ILoginRequest {
  contact: string;
  type: IContactType;
  code: string;
}

export interface ILoginResponseData {
  token?: string;
  access_token?: string;
  accessToken?: string;
  refresh_token?: string;
  refreshToken?: string;
  user?: IAuthUser;
}
