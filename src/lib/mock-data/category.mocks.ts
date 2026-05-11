import type {
  ICategory,
  ICategoryGroup,
} from "../interfaces/category.interface";

const CATEGORY_IMAGES = [
  "/mocks/images/categories/image%2015.png",
  "/mocks/images/categories/image%2016.png",
  "/mocks/images/categories/image%2017.png",
  "/mocks/images/categories/image%2019.png",
  "/mocks/images/categories/image%2020.png",
  "/mocks/images/categories/image%2021.png",
  "/mocks/images/categories/image%2022.png",
  "/mocks/images/categories/image%2023.png",
  "/mocks/images/categories/image%2024.png",
];

const catImg = (n: number) => CATEGORY_IMAGES[n % CATEGORY_IMAGES.length];

export const navCategories: ICategory[] = [
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

export const sidebarCategories: ICategory[] = [
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

export const picksForYou: ICategory[] = [
  { id: "p1", name: "Suits", slug: "suits", image: catImg(0) },
  { id: "p2", name: "Tops", slug: "tops", image: catImg(1) },
  { id: "p3", name: "Bottoms", slug: "bottoms", image: catImg(2) },
  { id: "p4", name: "Plu size", slug: "plu-size", image: catImg(3) },
  { id: "p5", name: "Tops", slug: "tops-2", image: catImg(4) },
  { id: "p6", name: "New in", slug: "new-in-2", image: catImg(5) },
  { id: "p7", name: "Tops", slug: "tops-3", image: catImg(6) },
  { id: "p8", name: "Hoodies", slug: "hoodies", image: catImg(7) },
  { id: "p9", name: "Co ords", slug: "co-ords", image: catImg(8) },
  { id: "p10", name: "Denim", slug: "denim", image: catImg(9) },
  { id: "p11", name: "Men", slug: "men", image: catImg(10) },
  { id: "p12", name: "Suits", slug: "suits-2", image: catImg(11) },
  { id: "p13", name: "New in", slug: "new-in-3", image: catImg(12) },
  { id: "p14", name: "Bottoms", slug: "bottoms-2", image: catImg(13) },
  { id: "p15", name: "Suits", slug: "suits-3", image: catImg(14) },
  { id: "p16", name: "Kintwear", slug: "kintwear", image: catImg(15) },
  { id: "p17", name: "Co ords", slug: "co-ords-2", image: catImg(16) },
  { id: "p18", name: "Swimwear", slug: "swimwear", image: catImg(17) },
  { id: "p19", name: "Hoodies", slug: "hoodies-2", image: catImg(18) },
  { id: "p20", name: "Tops", slug: "tops-4", image: catImg(19) },
  { id: "p21", name: "Swimwear", slug: "swimwear-2", image: catImg(20) },
  { id: "p22", name: "Tops", slug: "tops-5", image: catImg(21) },
  { id: "p23", name: "Suits", slug: "suits-4", image: catImg(22) },
  { id: "p24", name: "Tops", slug: "tops-6", image: catImg(23) },
  { id: "p25", name: "Denim", slug: "denim-2", image: catImg(24) },
  { id: "p26", name: "Denim", slug: "denim-3", image: catImg(25) },
  { id: "p27", name: "Bottoms", slug: "bottoms-3", image: catImg(26) },
  { id: "p28", name: "New in", slug: "new-in-4", image: catImg(27) },
  { id: "p29", name: "Tops", slug: "tops-7", image: catImg(28) },
  { id: "p30", name: "Men", slug: "men-2", image: catImg(29) },
  { id: "p31", name: "Kintwear", slug: "kintwear-2", image: catImg(30) },
  { id: "p32", name: "Co ords", slug: "co-ords-3", image: catImg(31) },
];

export const featuredCategories: ICategory[] = [
  { id: "f1", name: "New in", slug: "new-in", image: catImg(0), badge: "30%" },
  { id: "f2", name: "Top rated", slug: "top-rated", image: catImg(1) },
  { id: "f3", name: "Tops", slug: "tops", image: catImg(2) },
  { id: "f4", name: "Co ords", slug: "co-ords", image: catImg(3) },
  { id: "f5", name: "Nike", slug: "nike", image: catImg(4) },
  { id: "f6", name: "Denim", slug: "denim", image: catImg(5), badge: "20%" },
  { id: "f7", name: "Co-rds", slug: "co-rds", image: catImg(6) },
  { id: "f8", name: "Nike", slug: "nike-2", image: catImg(7) },
  { id: "f9", name: "Nike", slug: "nike-3", image: catImg(8) },
  { id: "f10", name: "Denim", slug: "denim-2", image: catImg(9) },
  { id: "f11", name: "Nike", slug: "nike-4", image: catImg(10) },
  { id: "f12", name: "Bottoms", slug: "bottoms", image: catImg(11) },
];

export const shopByCategory: ICategory[] = [
  { id: "s1", name: "Women", slug: "women", image: catImg(0) },
  { id: "s2", name: "Kids", slug: "kids", image: catImg(1) },
  { id: "s3", name: "Men", slug: "men", image: catImg(2) },
  { id: "s4", name: "Toys & Games", slug: "toys", image: catImg(3) },
  { id: "s5", name: "Dresses", slug: "dresses", image: catImg(4), badge: "30%" },
  { id: "s6", name: "Shoes", slug: "shoes", image: catImg(5) },
  { id: "s7", name: "Home living", slug: "home-living", image: catImg(6) },
  { id: "s8", name: "Sport", slug: "sport", image: catImg(7) },
  { id: "s9", name: "Electronics", slug: "electronics", image: catImg(8), badge: "12%" },
  { id: "s10", name: "Bags", slug: "bags", image: catImg(9) },
  { id: "s11", name: "Beauty", slug: "beauty", image: catImg(10) },
  { id: "s12", name: "Jewelry", slug: "jewelry", image: catImg(11), badge: "20%" },
  { id: "s13", name: "Accessories", slug: "accessories", image: catImg(12) },
  { id: "s14", name: "Underwear", slug: "underwear", image: catImg(13) },
  { id: "s15", name: "Beachwear", slug: "beachwear", image: catImg(14) },
  { id: "s16", name: "Curve", slug: "curve", image: catImg(15) },
  { id: "s17", name: "Outdoor", slug: "outdoor", image: catImg(16) },
  { id: "s18", name: "Pet supplies", slug: "pet-supplies", image: catImg(17) },
  { id: "s19", name: "Office", slug: "office", image: catImg(18) },
  { id: "s20", name: "Garden", slug: "garden", image: catImg(19), badge: "15%" },
];

export const searchCategories: ICategory[] = [
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

export const searchHistory: { id: string; text: string }[] = [
  { id: "h1", text: "Men" },
  { id: "h2", text: "Women" },
  { id: "h3", text: "Kids" },
  { id: "h4", text: "Shoes" },
  { id: "h5", text: "Bages" },
  { id: "h6", text: "Accessories" },
  { id: "h7", text: "Beauty" },
  { id: "h8", text: "Sport" },
];

export const categoryGroups: ICategoryGroup[] = [
  {
    id: "picks",
    name: "Picks fot you",
    items: picksForYou,
  },
];
