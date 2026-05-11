import type {
  IBrandFilter,
  IBreadcrumbItem,
  ICategoryNode,
  IColorSwatch,
  IMaterialOption,
  IPricePreset,
  ISizeOption,
  IStyleOption,
} from "./category-page.interface";

export const breadcrumbTrail: IBreadcrumbItem[] = [
  { id: "home", label: "Home" },
  { id: "woman-apparel", label: "WOMAN Apparel" },
  { id: "woman-clothing", label: "Woman Clothing" },
  { id: "sweatshirt", label: "Sweatshirt" },
  { id: "shop", label: "Shop" },
];

export const categoryTree: ICategoryNode[] = [
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

export const colorSwatches: IColorSwatch[] = [
  { id: "black", name: "Black", hex: "#111111" },
  { id: "gray", name: "Gray", hex: "#9ca3af" },
  { id: "red", name: "Red", hex: "#ef4444" },
  { id: "pink", name: "Pink", hex: "#f472b6" },
  { id: "green", name: "Green", hex: "#22c55e" },
  { id: "yellow", name: "Yellow", hex: "#facc15" },
  { id: "blue", name: "Blue", hex: "#2563eb" },
  { id: "navy", name: "Navy", hex: "#1e3a8a" },
  { id: "purple", name: "Purple", hex: "#a855f7" },
  { id: "beige", name: "Beige", hex: "#f5f5dc" },
  { id: "brown", name: "Brown", hex: "#8b4513" },
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
