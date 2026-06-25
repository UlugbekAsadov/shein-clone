export interface IAccountProfile {
  name: string;
  surname: string;
  dateOfBirth: string;
  gender: "male" | "female";
  avatar: string | null;
}

export interface IProfileUpdateRequest {
  name: string;
  surname: string;
  birth_date: string;
  gender: "male" | "female";
  image?: string;
}

export interface IUploadResult {
  url?: string;
  path?: string;
}
