export interface IAddress {
  id: number;
  name: string;
  type: "home" | "work" | "other";
  address: string;
  country: string;
  region_id: number;
  district_id: number;
  lat: number;
  long: number;
  is_default: boolean;
}

export interface IAddressCreateRequest {
  name: string;
  type: "home" | "work" | "other";
  address: string;
  country: string;
  region_id: number;
  district_id: number;
  lat: number;
  long: number;
  is_default: boolean;
}

export interface IAddressUpdateRequest {
  name?: string;
  type?: "home" | "work" | "other";
  address?: string;
  country?: string;
  region_id?: number;
  district_id?: number;
  lat?: number;
  long?: number;
  is_default?: boolean;
}

export interface IAddressFormValues {
  type: "home" | "work" | "other";
  name: string;
  address: string;
  lat: number | null;
  long: number | null;
}
