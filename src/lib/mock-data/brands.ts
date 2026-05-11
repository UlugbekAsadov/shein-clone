import type { Brand } from "./types";

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

export const brands: Brand[] = [
  { id: "b1", name: "Beal", image: brandImg(0), brandBg: "#0d3a3f", contents: brandContents(0) },
  { id: "b2", name: "Ryvang rens", image: brandImg(1), brandBg: "#1e3a8a", contents: brandContents(1) },
  { id: "b3", name: "Usem", image: brandImg(2), brandBg: "#3f2a14", storyViewed: true, contents: brandContents(2) },
  { id: "b4", name: "MD", image: brandImg(3), brandBg: "#0f172a", contents: brandContents(3) },
  { id: "b5", name: "Vlack cat", image: brandImg(4), brandBg: "#facc15", storyViewed: true, contents: brandContents(4) },
  { id: "b6", name: "Goodness", image: brandImg(5), brandBg: "#ea580c", contents: brandContents(0, 5) },
  { id: "b7", name: "Closet", image: brandImg(6), brandBg: "#0a0a0a", contents: brandContents(1, 3) },
  { id: "b8", name: "Doyin's", image: brandImg(7), brandBg: "#14532d", storyViewed: true, contents: brandContents(2, 4) },
  { id: "b9", name: "Men's", image: brandImg(8), brandBg: "#fde2e2", contents: brandContents(3, 5) },
  { id: "b10", name: "Fashion", image: brandImg(9), brandBg: "#fce7f3", contents: brandContents(4, 4) },
  { id: "b11", name: "Beal", image: brandImg(10), brandBg: "#0a0a0a", storyViewed: true, contents: brandContents(0, 3) },
  { id: "b12", name: "Shirt", image: brandImg(11), brandBg: "#dc2626", contents: brandContents(2, 5) },
];
