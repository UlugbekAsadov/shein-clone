import type { IAuthUser } from "./auth.interface";

export interface IUserContextValue {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  refresh: () => void;
}
