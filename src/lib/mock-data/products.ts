import type { Product } from "./types";

const baseProduct = (id: string, badge?: Product["badge"]): Product => ({
  id,
  title: "Sweatshirt",
  subtitle: "Women's Casual Pullover Sweats...",
  price: 33.49,
  originalPrice: 63.49,
  image: "/placeholders/product.svg",
  rating: 4.5,
  reviews: 324,
  badge,
  saveLabel: "Save $30",
  discountLabel: "30%",
  delivery: "1-2 days",
});

export const trendingProducts: Product[] = [
  baseProduct("t1", "Original"),
  baseProduct("t2"),
  baseProduct("t3"),
  baseProduct("t4"),
  baseProduct("t5"),
  baseProduct("t6"),
  baseProduct("t7"),
  baseProduct("t8"),
];

export const womensFashion: Product[] = [
  { ...baseProduct("w1"), title: "FUNNY RACING" },
  { ...baseProduct("w2"), title: "Street Sears Retro" },
  { ...baseProduct("w3"), title: "Summer shirts" },
  { ...baseProduct("w4"), title: "Sweatshirt" },
  { ...baseProduct("w5"), title: "Sweatshirt" },
  { ...baseProduct("w6"), title: "Sweatshirt" },
  { ...baseProduct("w7"), title: "Sweatshirt" },
  { ...baseProduct("w8"), title: "Sweatshirt" },
];

export const moreToExplore: Product[] = [
  baseProduct("m1", "Original"),
  baseProduct("m2"),
  baseProduct("m3"),
  baseProduct("m4"),
  baseProduct("m5"),
  baseProduct("m6"),
  baseProduct("m7"),
  baseProduct("m8"),
];

export const hotDeals: Product[] = Array.from({ length: 8 }, (_, i) =>
  baseProduct(`h${i + 1}`, i === 0 ? "Original" : undefined),
);
