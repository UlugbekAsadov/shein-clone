export interface IAuthUser {
  id: string | number;
  phone: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}
