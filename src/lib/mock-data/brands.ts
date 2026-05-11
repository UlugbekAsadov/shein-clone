import type { Brand } from "./types";

const brandImg = (n: number) =>
  n === 0
    ? "/mocks/images/brand-strip/image%20761.png"
    : `/mocks/images/brand-strip/image%20761-${n}.png`;

export const brands: Brand[] = [
  { id: "b1", name: "Beal", image: brandImg(0), brandBg: "#0d3a3f" },
  { id: "b2", name: "Ryvang rens", image: brandImg(1), brandBg: "#1e3a8a" },
  { id: "b3", name: "Usem", image: brandImg(2), brandBg: "#3f2a14", storyViewed: true },
  { id: "b4", name: "MD", image: brandImg(3), brandBg: "#0f172a" },
  { id: "b5", name: "Vlack cat", image: brandImg(4), brandBg: "#facc15", storyViewed: true },
  { id: "b6", name: "Goodness", image: brandImg(5), brandBg: "#ea580c" },
  { id: "b7", name: "Closet", image: brandImg(6), brandBg: "#0a0a0a" },
  { id: "b8", name: "Doyin's", image: brandImg(7), brandBg: "#14532d", storyViewed: true },
  { id: "b9", name: "Men's", image: brandImg(8), brandBg: "#fde2e2" },
  { id: "b10", name: "Fashion", image: brandImg(9), brandBg: "#fce7f3" },
  { id: "b11", name: "Beal", image: brandImg(10), brandBg: "#0a0a0a", storyViewed: true },
  { id: "b12", name: "Shirt", image: brandImg(11), brandBg: "#dc2626" },
];
