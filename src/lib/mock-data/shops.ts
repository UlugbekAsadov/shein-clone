import type { Shop, DiscountTile } from "./types";

export const featuredShops: Shop[] = [
  {
    id: "fs1",
    name: "Pearl1234",
    avatar: "/placeholders/avatar.svg",
    banner: "/placeholders/lifestyle.svg",
    rating: 4.9,
    itemsSold: "2,310 items sold",
  },
  {
    id: "fs2",
    name: "Nikr 11",
    avatar: "/placeholders/avatar.svg",
    banner: "/placeholders/lifestyle.svg",
    rating: 4.8,
    itemsSold: "Following",
  },
  {
    id: "fs3",
    name: "kymez mini",
    avatar: "/placeholders/avatar.svg",
    banner: "/placeholders/lifestyle.svg",
    rating: 4.7,
    itemsSold: "Following",
  },
  {
    id: "fs4",
    name: "Adam Land",
    avatar: "/placeholders/avatar.svg",
    banner: "/placeholders/lifestyle.svg",
    rating: 4.9,
    itemsSold: "Following",
  },
  {
    id: "fs5",
    name: "innovate",
    avatar: "/placeholders/avatar.svg",
    banner: "/placeholders/lifestyle.svg",
    rating: 4.7,
    itemsSold: "Follow",
  },
];

export const discountTiles: DiscountTile[] = [
  {
    id: "d1",
    percent: 20,
    image: "/placeholders/lifestyle.svg",
    shopName: "Pearl1234",
    background: "linear-gradient(135deg, #c4b5fd, #a78bfa)",
  },
  {
    id: "d2",
    percent: 30,
    image: "/placeholders/lifestyle.svg",
    shopName: "Nike 11",
    background: "linear-gradient(135deg, #fed7aa, #fdba74)",
  },
  {
    id: "d3",
    percent: 20,
    image: "/placeholders/lifestyle.svg",
    shopName: "Adam Land",
    background: "linear-gradient(135deg, #fcd34d, #f59e0b)",
  },
  {
    id: "d4",
    percent: 20,
    image: "/placeholders/lifestyle.svg",
    shopName: "Pearl1234",
    background: "linear-gradient(135deg, #fda4af, #f43f5e)",
  },
  {
    id: "d5",
    percent: 50,
    image: "/placeholders/lifestyle.svg",
    shopName: "Pearl1234",
    background: "linear-gradient(135deg, #fb7185, #e11d48)",
  },
  {
    id: "d6",
    percent: 20,
    image: "/placeholders/lifestyle.svg",
    shopName: "Adam Land",
    background: "linear-gradient(135deg, #fb923c, #ea580c)",
  },
];
