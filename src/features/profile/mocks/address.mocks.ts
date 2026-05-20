import type {
  IAddress,
  IAddressOption,
} from "@/features/profile/interfaces/address.interface";

export const addressMocks: IAddress[] = [
  {
    id: "addr-home",
    type: "home",
    title: "Home",
    details: "Yangi hayot ko'chasi, 122/1-uy, 116-x...",
  },
  {
    id: "addr-work",
    type: "work",
    title: "Work",
    details: "Yangi hayot ko'chasi, 122/1-uy, 116-x...",
  },
  {
    id: "addr-other",
    type: "other",
    title: "Other",
    details: "Yangi hayot ko'chasi, 122/1-uy, 116-x...",
  },
];

export const countryOptions: IAddressOption[] = [
  { value: "uz", label: "Uzbekistan" },
  { value: "kz", label: "Kazakhstan" },
  { value: "kg", label: "Kyrgyzstan" },
  { value: "tj", label: "Tajikistan" },
  { value: "tm", label: "Turkmenistan" },
  { value: "us", label: "United States" },
];

export const regionOptions: IAddressOption[] = [
  { value: "tashkent", label: "Tashkent" },
  { value: "samarkand", label: "Samarkand" },
  { value: "bukhara", label: "Bukhara" },
  { value: "fergana", label: "Fergana" },
  { value: "khorezm", label: "Khorezm" },
  { value: "kashkadarya", label: "Kashkadarya" },
];
