export interface IAuthUser {
  id: string | number;
  phone: string;
  name?: string;
  surname?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  image?: string;
  birth_date?: string;
  gender?: "male" | "female";
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}
