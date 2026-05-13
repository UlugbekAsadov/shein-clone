import type { IBrand } from "@/types/brand.interface";

const brandImg = (n: number) =>
  n === 0
    ? "/mocks/images/brand-strip/image%20761.png"
    : `/mocks/images/brand-strip/image%20761-${n}.png`;

const CONTENTS = [
  "/mocks/images/brand-strip/contents/image%20763.png",
  "/mocks/images/brand-strip/contents/image%20764.png",
  "/mocks/images/brand-strip/contents/image%20764%20(1).png",
  "/mocks/images/brand-strip/contents/image%20764%20(2).png",
  "/mocks/images/brand-strip/contents/image%20764%20(3).png",
];

const brandContents = (offset: number, count = 4): string[] =>
  Array.from({ length: count }, (_, i) => CONTENTS[(offset + i) % CONTENTS.length]);

export const brands: IBrand[] = [
  { id: "b1", slug: "beal", name: "Beal", image: brandImg(0), brandBg: "#0d3a3f", contents: brandContents(0) },
  { id: "b2", slug: "fashionrepublic", name: "Ryvang rens", image: brandImg(1), brandBg: "#1e3a8a", contents: brandContents(1), viewedCount: 1 },
  { id: "b3", slug: "usem", name: "Usem", image: brandImg(2), brandBg: "#3f2a14", contents: brandContents(2), viewedCount: 4 },
  { id: "b4", slug: "md", name: "MD", image: brandImg(3), brandBg: "#0f172a", contents: brandContents(3) },
  { id: "b5", slug: "vlack-cat", name: "Vlack cat", image: brandImg(4), brandBg: "#facc15", contents: brandContents(4), viewedCount: 4 },
  { id: "b6", slug: "goodness", name: "Goodness", image: brandImg(5), brandBg: "#ea580c", contents: brandContents(0, 5), viewedCount: 2 },
  { id: "b7", slug: "closet", name: "Closet", image: brandImg(6), brandBg: "#0a0a0a", contents: brandContents(1, 3) },
  { id: "b8", slug: "doyins", name: "Doyin's", image: brandImg(7), brandBg: "#14532d", contents: brandContents(2, 4), viewedCount: 4 },
  { id: "b9", slug: "mens", name: "Men's", image: brandImg(8), brandBg: "#fde2e2", contents: brandContents(3, 5) },
  { id: "b10", slug: "fashion", name: "Fashion", image: brandImg(9), brandBg: "#fce7f3", contents: brandContents(4, 4) },
  { id: "b11", slug: "beal-2", name: "Beal", image: brandImg(10), brandBg: "#0a0a0a", contents: brandContents(0, 3), viewedCount: 3 },
  { id: "b12", slug: "shirt", name: "Shirt", image: brandImg(11), brandBg: "#dc2626", contents: brandContents(2, 5) },
];
