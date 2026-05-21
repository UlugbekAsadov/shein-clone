import type { IContactType } from "./login.interface";

export type IGender = "male" | "female";

export interface IRegisterRequest {
  name: string;
  contact: string;
  type: IContactType;
  code: string;
  password: string;
  birthday?: string;
  gender?: IGender;
}

export interface IRegisterPayload {
  phone: string;
  code: string;
  name: string;
  birthday: string;
  gender: IGender;
}
