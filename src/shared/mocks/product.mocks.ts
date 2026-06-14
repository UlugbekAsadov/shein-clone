import type { IProduct } from "@/types/product.interface";

const PRODUCT_IMAGES = [
  "/mocks/images/products/image%2027.png",
  "/mocks/images/products/image%2027-1.png",
  "/mocks/images/products/image%2027-2.png",
  "/mocks/images/products/image%2027-3.png",
  "/mocks/images/products/image%2027-4.png",
];

const productImg = (n: number) => PRODUCT_IMAGES[n % PRODUCT_IMAGES.length];

interface IPriceVariant {
  price: number;
  originalPrice: number;
  discountLabel: string;
}

const PRICE_VARIANTS: IPriceVariant[] = [
  { price: 33.49, originalPrice: 63.49, discountLabel: "47%" },
  { price: 24.99, originalPrice: 39.99, discountLabel: "38%" },
  { price: 45.0, originalPrice: 75.0, discountLabel: "40%" },
  { price: 18.99, originalPrice: 29.99, discountLabel: "37%" },
  { price: 59.99, originalPrice: 99.99, discountLabel: "40%" },
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
    price: variant.price,
    originalPrice: variant.originalPrice,
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
