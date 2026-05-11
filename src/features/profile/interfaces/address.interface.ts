export interface IAddress {
  id: string;
  title: string;
  details: string;
  isDefault?: boolean;
}

export interface IAddressOption {
  value: string;
  label: string;
}
