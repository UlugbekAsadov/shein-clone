export interface IAddress {
  id: string;
  type: "home" | "work" | "other";
  title: string;
  details: string;
  isDefault?: boolean;
}

export interface IAddressOption {
  value: string;
  label: string;
}
