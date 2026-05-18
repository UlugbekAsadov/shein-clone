import type {
  IBrandFilter,
  ICategoryNode,
  IColorSwatch,
  IMaterialOption,
  IPricePreset,
  ISizeOption,
  IStyleOption,
} from "@/types/filter.interface";
import type { ISize } from "@/types/size.interface";

export const filterCategoryTree: ICategoryNode[] = [
  {
    id: "woman",
    name: "Woman",
    count: 1248,
    children: [
      { id: "dresses", name: "Dresses", count: 342 },
      { id: "tops-blouses", name: "Tops & Blouses", count: 456 },
      { id: "pants-jeans", name: "Pants & Jeans", count: 287 },
      { id: "skirts", name: "Skirts", count: 64 },
      { id: "jackets-coats", name: "Jackets & Coats", count: 89 },
      { id: "activewear", name: "Activewear", count: 876 },
    ],
  },
  { id: "men", name: "Men", count: 1930 },
  { id: "shoes", name: "Shoes", count: 298 },
  { id: "bags", name: "Bags", count: 534 },
  { id: "accessories", name: "Accessories", count: 445 },
  { id: "jewelry", name: "Jewelry", count: 312 },
];

export const clothingSizes: ISizeOption[] = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "2xl", label: "2XL" },
  { id: "3xl", label: "3XL" },
  { id: "4xl", label: "4XL" },
];

export const mobileFilterClothingSizes: ISize[] = [
  { id: "XS", subLabel: "35", available: true },
  { id: "S", subLabel: "36", available: true },
  { id: "M", subLabel: "37", available: true },
  { id: "L", subLabel: "38", available: false },
  { id: "2XL", subLabel: "39", available: true },
  { id: "3XL", subLabel: "40", available: true },
  { id: "4XL", subLabel: "41", available: true },
];

export const shoeSizes: ISizeOption[] = [
  { id: "36", label: "36" },
  { id: "37", label: "37" },
  { id: "38", label: "38" },
  { id: "39", label: "39" },
  { id: "40", label: "40" },
  { id: "41", label: "41" },
  { id: "42", label: "42" },
  { id: "43", label: "43" },
];

export const filterColorSwatches: IColorSwatch[] = [
  { id: "black", name: "Black", hex: "#111111" },
  { id: "white", name: "White", hex: "#ffffff", ring: true },
  { id: "grey", name: "Grey", hex: "#9ca3af" },
  { id: "red", name: "Red", hex: "#ef4444" },
  { id: "pink", name: "Pink", hex: "#f472b6" },
  { id: "yellow", name: "Yellow", hex: "#facc15" },
  { id: "green", name: "Green", hex: "#22c55e" },
  { id: "blue", name: "Blue", hex: "#2563eb" },
  { id: "sapphire", name: "Sapphire", hex: "#1e3a8a" },
  { id: "mauve", name: "Mauve", hex: "#a855f7" },
  { id: "lvory", name: "Lvory", hex: "#f5f5dc" },
  { id: "co-bronze", name: "Co Bronze", hex: "#8b4513" },
  { id: "peach", name: "Peach", hex: "#d6c8a8" },
  { id: "orange", name: "Orange", hex: "#f97316" },
];

export const pricePresets: IPricePreset[] = [
  { id: "p25", label: "$ 25" },
  { id: "p25-50", label: "$ 25-50" },
  { id: "p100", label: "$ 100" },
  { id: "p200", label: "$ 200" },
  { id: "p300", label: "$ 300" },
];

export const brandFilters: IBrandFilter[] = [
  { id: "nike", name: "Nike", count: 342, swatch: "#ffffff" },
  { id: "adidas", name: "Adidas", count: 342, swatch: "#ffffff" },
  { id: "zara", name: "Zara", count: 342, swatch: "#ffffff" },
  { id: "gucci", name: "Gucci", count: 342, swatch: "#111111" },
  { id: "hm", name: "H&M", count: 342, swatch: "#ffffff" },
];

export const styleOptions: IStyleOption[] = [
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "vintage", label: "Vintage" },
  { id: "sportswear", label: "Sportswear" },
  { id: "streerwear", label: "Streerwear" },
  { id: "minimalist", label: "Minimalist" },
];

export const materialOptions: IMaterialOption[] = [
  { id: "catton", label: "Catton" },
  { id: "polyester", label: "Polyester" },
  { id: "silk", label: "Silk" },
  { id: "wool", label: "Wool" },
  { id: "linen", label: "Linen" },
  { id: "denim", label: "Denim" },
  { id: "leather", label: "leather" },
];
