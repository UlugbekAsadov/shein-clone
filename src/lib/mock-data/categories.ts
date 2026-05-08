import type { Category, CategoryGroup } from "./types";

export const navCategories: Category[] = [
  { id: "new-in", name: "New in", slug: "new-in" },
  { id: "sale", name: "Sale", slug: "sale" },
  { id: "woman-clothing", name: "Woman Clothing", slug: "woman-clothing" },
  { id: "beachwear", name: "Beachwear", slug: "beachwear" },
  { id: "kids", name: "Kids", slug: "kids" },
  { id: "curve", name: "Curve", slug: "curve" },
  { id: "shoes", name: "Shoes", slug: "shoes" },
  { id: "underwear-sleepwear", name: "Underwear & Sleepwear", slug: "underwear-sleepwear" },
  { id: "men-clothing", name: "Men Clothing", slug: "men-clothing" },
  { id: "home-living", name: "Home Living", slug: "home-living" },
  { id: "electronics", name: "Electronics", slug: "electronics" },
  { id: "toys", name: "Toys", slug: "toys" },
];

export const sidebarCategories: Category[] = [
  { id: "new-in", name: "New in", slug: "new-in" },
  { id: "sale", name: "Sale", slug: "sale" },
  { id: "women-clothing", name: "Women Clothing", slug: "women-clothing" },
  { id: "beachwear", name: "Beachwear", slug: "beachwear" },
  { id: "kids", name: "Kids", slug: "kids" },
  { id: "curve", name: "Curve", slug: "curve" },
  { id: "men-clothing", name: "Men Clothing", slug: "men-clothing" },
  { id: "shoes", name: "Shoes", slug: "shoes" },
  { id: "underwear-sleepwear", name: "Underwear & Sleepwear", slug: "underwear-sleepwear" },
  { id: "home-living", name: "Home & Living", slug: "home-living" },
];

export const picksForYou: Category[] = [
  { id: "p1", name: "Suits", slug: "suits", image: "/placeholders/category.svg" },
  { id: "p2", name: "Tops", slug: "tops", image: "/placeholders/category.svg" },
  { id: "p3", name: "Bottoms", slug: "bottoms", image: "/placeholders/category.svg" },
  { id: "p4", name: "Plu size", slug: "plu-size", image: "/placeholders/category.svg" },
  { id: "p5", name: "Tops", slug: "tops-2", image: "/placeholders/category.svg" },
  { id: "p6", name: "New in", slug: "new-in-2", image: "/placeholders/category.svg" },
  { id: "p7", name: "Tops", slug: "tops-3", image: "/placeholders/category.svg" },
  { id: "p8", name: "Hoodies", slug: "hoodies", image: "/placeholders/category.svg" },
  { id: "p9", name: "Co ords", slug: "co-ords", image: "/placeholders/category.svg" },
  { id: "p10", name: "Denim", slug: "denim", image: "/placeholders/category.svg" },
  { id: "p11", name: "Men", slug: "men", image: "/placeholders/category.svg" },
  { id: "p12", name: "Suits", slug: "suits-2", image: "/placeholders/category.svg" },
  { id: "p13", name: "New in", slug: "new-in-3", image: "/placeholders/category.svg" },
  { id: "p14", name: "Bottoms", slug: "bottoms-2", image: "/placeholders/category.svg" },
  { id: "p15", name: "Suits", slug: "suits-3", image: "/placeholders/category.svg" },
  { id: "p16", name: "Kintwear", slug: "kintwear", image: "/placeholders/category.svg" },
  { id: "p17", name: "Co ords", slug: "co-ords-2", image: "/placeholders/category.svg" },
  { id: "p18", name: "Swimwear", slug: "swimwear", image: "/placeholders/category.svg" },
  { id: "p19", name: "Hoodies", slug: "hoodies-2", image: "/placeholders/category.svg" },
  { id: "p20", name: "Tops", slug: "tops-4", image: "/placeholders/category.svg" },
  { id: "p21", name: "Swimwear", slug: "swimwear-2", image: "/placeholders/category.svg" },
  { id: "p22", name: "Tops", slug: "tops-5", image: "/placeholders/category.svg" },
  { id: "p23", name: "Suits", slug: "suits-4", image: "/placeholders/category.svg" },
  { id: "p24", name: "Tops", slug: "tops-6", image: "/placeholders/category.svg" },
  { id: "p25", name: "Denim", slug: "denim-2", image: "/placeholders/category.svg" },
  { id: "p26", name: "Denim", slug: "denim-3", image: "/placeholders/category.svg" },
  { id: "p27", name: "Bottoms", slug: "bottoms-3", image: "/placeholders/category.svg" },
  { id: "p28", name: "New in", slug: "new-in-4", image: "/placeholders/category.svg" },
  { id: "p29", name: "Tops", slug: "tops-7", image: "/placeholders/category.svg" },
  { id: "p30", name: "Men", slug: "men-2", image: "/placeholders/category.svg" },
  { id: "p31", name: "Kintwear", slug: "kintwear-2", image: "/placeholders/category.svg" },
  { id: "p32", name: "Co ords", slug: "co-ords-3", image: "/placeholders/category.svg" },
];

export const featuredCategories: Category[] = [
  { id: "f1", name: "New in", slug: "new-in", image: "/placeholders/category.svg", badge: "30%" },
  { id: "f2", name: "Top rated", slug: "top-rated", image: "/placeholders/category.svg" },
  { id: "f3", name: "Tops", slug: "tops", image: "/placeholders/category.svg" },
  { id: "f4", name: "Co ords", slug: "co-ords", image: "/placeholders/category.svg" },
  { id: "f5", name: "Nike", slug: "nike", image: "/placeholders/category.svg" },
  { id: "f6", name: "Denim", slug: "denim", image: "/placeholders/category.svg", badge: "20%" },
  { id: "f7", name: "Co-rds", slug: "co-rds", image: "/placeholders/category.svg" },
  { id: "f8", name: "Nike", slug: "nike-2", image: "/placeholders/category.svg" },
  { id: "f9", name: "Nike", slug: "nike-3", image: "/placeholders/category.svg" },
  { id: "f10", name: "Denim", slug: "denim-2", image: "/placeholders/category.svg" },
  { id: "f11", name: "Nike", slug: "nike-4", image: "/placeholders/category.svg" },
  { id: "f12", name: "Bottoms", slug: "bottoms", image: "/placeholders/category.svg" },
];

export const shopByCategory: Category[] = [
  { id: "s1", name: "Women", slug: "women", image: "/placeholders/category.svg" },
  { id: "s2", name: "Kids", slug: "kids", image: "/placeholders/category.svg" },
  { id: "s3", name: "Men", slug: "men", image: "/placeholders/category.svg" },
  { id: "s4", name: "Toys & Games", slug: "toys", image: "/placeholders/category.svg" },
  { id: "s5", name: "Dresses", slug: "dresses", image: "/placeholders/category.svg", badge: "30%" },
  { id: "s6", name: "Shoes", slug: "shoes", image: "/placeholders/category.svg" },
  { id: "s7", name: "Home living", slug: "home-living", image: "/placeholders/category.svg" },
  { id: "s8", name: "Sport", slug: "sport", image: "/placeholders/category.svg" },
  { id: "s9", name: "Electronics", slug: "electronics", image: "/placeholders/category.svg", badge: "12%" },
  { id: "s10", name: "Bags", slug: "bags", image: "/placeholders/category.svg" },
];

export const searchCategories: Category[] = [
  { id: "all", name: "All", slug: "all" },
  { id: "men", name: "Men", slug: "men" },
  { id: "women", name: "Women", slug: "women" },
  { id: "kids", name: "Kids", slug: "kids" },
  { id: "shoes", name: "Shoes", slug: "shoes" },
  { id: "bages", name: "Bages", slug: "bages" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
  { id: "beauty", name: "Beauty", slug: "beauty" },
  { id: "sport", name: "Sport", slug: "sport" },
];

export const categoryGroups: CategoryGroup[] = [
  {
    id: "picks",
    name: "Picks fot you",
    items: picksForYou,
  },
];
