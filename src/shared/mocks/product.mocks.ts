import type { IProduct } from "@/types/product.interface";
import type { ICurrencyPrices } from "@/types/currency-prices.interface";

const PRODUCT_IMAGES = [
  "/mocks/images/products/image%2027.png",
  "/mocks/images/products/image%2027-1.png",
  "/mocks/images/products/image%2027-2.png",
  "/mocks/images/products/image%2027-3.png",
  "/mocks/images/products/image%2027-4.png",
];

const productImg = (n: number) => PRODUCT_IMAGES[n % PRODUCT_IMAGES.length];

interface IPriceVariant {
  prices: ICurrencyPrices;
  originalPrices: ICurrencyPrices;
  discountLabel: string;
}

const PRICE_VARIANTS: IPriceVariant[] = [
  {
    prices: { USD: 33.49, UZS: 42_900_000, RUB: 3_110 },
    originalPrices: { USD: 63.49, UZS: 81_300_000, RUB: 5_900 },
    discountLabel: "47%",
  },
  {
    prices: { USD: 24.99, UZS: 32_000_000, RUB: 2_320 },
    originalPrices: { USD: 39.99, UZS: 51_200_000, RUB: 3_720 },
    discountLabel: "38%",
  },
  {
    prices: { USD: 45.0, UZS: 57_600_000, RUB: 4_185 },
    originalPrices: { USD: 75.0, UZS: 96_000_000, RUB: 6_970 },
    discountLabel: "40%",
  },
  {
    prices: { USD: 18.99, UZS: 24_300_000, RUB: 1_770 },
    originalPrices: { USD: 29.99, UZS: 38_400_000, RUB: 2_790 },
    discountLabel: "37%",
  },
  {
    prices: { USD: 59.99, UZS: 76_800_000, RUB: 5_580 },
    originalPrices: { USD: 99.99, UZS: 128_000_000, RUB: 9_300 },
    discountLabel: "40%",
  },
];

const baseProduct = (
  id: string,
  index: number,
  badge?: IProduct["badge"],
): IProduct => {
  const variant = PRICE_VARIANTS[index % PRICE_VARIANTS.length];
  return {
    id,
    title: "Sweatshirt",
    subtitle: "Women's Casual Pullover Sweats...",
    prices: variant.prices,
    originalPrices: variant.originalPrices,
    image: productImg(index),
    images: [
      productImg(index),
      productImg(index + 1),
      productImg(index + 2),
      productImg(index + 3),
    ],
    rating: 4.5,
    reviews: 324,
    badge,
    discountLabel: variant.discountLabel,
    delivery: "1-2 days",
  };
};

export const trendingProducts: IProduct[] = Array.from({ length: 10 }, (_, i) =>
  baseProduct(`t${i + 1}`, i, i === 0 ? "Original" : undefined),
);

export const womensFashion: IProduct[] = [
  { ...baseProduct("w1", 0), title: "FUNNY RACING" },
  { ...baseProduct("w2", 1), title: "Street Sears Retro" },
  { ...baseProduct("w3", 2), title: "Summer shirts" },
  { ...baseProduct("w4", 3), title: "Sweatshirt" },
  { ...baseProduct("w5", 4), title: "Sweatshirt" },
  { ...baseProduct("w6", 5), title: "Sweatshirt" },
  { ...baseProduct("w7", 6), title: "Sweatshirt" },
  { ...baseProduct("w8", 7), title: "Sweatshirt" },
  { ...baseProduct("w9", 8), title: "Sweatshirt" },
  { ...baseProduct("w10", 9), title: "Sweatshirt" },
];

export const moreToExplore: IProduct[] = Array.from({ length: 10 }, (_, i) =>
  baseProduct(`m${i + 1}`, i, i === 0 ? "Original" : undefined),
);

export const hotDeals: IProduct[] = Array.from({ length: 10 }, (_, i) =>
  baseProduct(`h${i + 1}`, i, i === 0 ? "Original" : undefined),
);
