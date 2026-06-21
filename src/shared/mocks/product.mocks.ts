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
  oldPrice: number;
  discountPercentage: number;
}

const PRICE_VARIANTS: IPriceVariant[] = [
  { price: 33.49, oldPrice: 63.49, discountPercentage: 47 },
  { price: 24.99, oldPrice: 39.99, discountPercentage: 38 },
  { price: 45.0, oldPrice: 75.0, discountPercentage: 40 },
  { price: 18.99, oldPrice: 29.99, discountPercentage: 37 },
  { price: 59.99, oldPrice: 99.99, discountPercentage: 40 },
];

const baseProduct = (
  id: number,
  index: number,
  isOriginal = false,
): IProduct => {
  const variant = PRICE_VARIANTS[index % PRICE_VARIANTS.length];
  return {
    id,
    title: "Sweatshirt",
    subtitle: "Women's Casual Pullover Sweats...",
    price: variant.price,
    old_price: variant.oldPrice,
    discount_percentage: variant.discountPercentage,
    image_url: productImg(index),
    images: [
      productImg(index),
      productImg(index + 1),
      productImg(index + 2),
      productImg(index + 3),
    ],
    rating: 4.5,
    reviews_count: 324,
    is_original: isOriginal,
    delivery_date_text: "1-2 days",
  };
};

export const trendingProducts: IProduct[] = Array.from({ length: 10 }, (_, i) =>
  baseProduct(i + 1, i, i === 0),
);

export const womensFashion: IProduct[] = [
  { ...baseProduct(101, 0), title: "FUNNY RACING" },
  { ...baseProduct(102, 1), title: "Street Sears Retro" },
  { ...baseProduct(103, 2), title: "Summer shirts" },
  { ...baseProduct(104, 3), title: "Sweatshirt" },
  { ...baseProduct(105, 4), title: "Sweatshirt" },
  { ...baseProduct(106, 5), title: "Sweatshirt" },
  { ...baseProduct(107, 6), title: "Sweatshirt" },
  { ...baseProduct(108, 7), title: "Sweatshirt" },
  { ...baseProduct(109, 8), title: "Sweatshirt" },
  { ...baseProduct(110, 9), title: "Sweatshirt" },
];

export const moreToExplore: IProduct[] = Array.from({ length: 10 }, (_, i) =>
  baseProduct(201 + i, i, i === 0),
);

export const hotDeals: IProduct[] = Array.from({ length: 10 }, (_, i) =>
  baseProduct(301 + i, i, i === 0),
);
