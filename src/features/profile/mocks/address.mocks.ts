import type {
  IAddress,
  IAddressOption,
} from "@/features/profile/interfaces/address.interface";

export const addressMocks: IAddress[] = [
  {
    id: "addr-1",
    title: "Tashkent, Uzbekistan",
    details: "Toshkent sh., Mirobod tumani, Talimarjon ko'chasi, 10 uy",
  },
  {
    id: "addr-2",
    title: "Xorazm, Uzbekistan",
    details: "Urganch sh, Talimarjon ko'chasi, 10 uy",
    isDefault: true,
  },
  {
    id: "addr-3",
    title: "Farg'ona, Uzbekistan",
    details: "Beashriq tumani, Talimarjon ko'chasi, 10 uy",
  },
  {
    id: "addr-4",
    title: "Qashqadaryo, Uzbekistan",
    details: "Kitob tumani, Talimarjon ko'chasi, 10 uy",
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
