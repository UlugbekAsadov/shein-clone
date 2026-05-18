import type { IMobileCategoryGroup } from "@/features/category/interfaces/category-group.interface";

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

const img = (n: number) => CATEGORY_IMAGES[n % CATEGORY_IMAGES.length];

export const mobileCategoryGroups: IMobileCategoryGroup[] = [
  {
    id: "women",
    name: "Women",
    slug: "women",
    image: img(0),
    children: [
      { id: "dresses", name: "Dresses", slug: "dresses", count: 342 },
      {
        id: "tops-blouses",
        name: "Tops & Blouses",
        slug: "tops-blouses",
        count: 456,
      },
      {
        id: "pants-jeans",
        name: "Pants & Jeans",
        slug: "pants-jeans",
        count: 287,
      },
      { id: "skirts", name: "Skirts", slug: "skirts", count: 64 },
      {
        id: "jackets-coats",
        name: "Jackets & Coats",
        slug: "jackets-coats",
        count: 89,
      },
    ],
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image: img(1),
    children: [
      { id: "kids-tops", name: "Tops", slug: "kids-tops", count: 124 },
      {
        id: "kids-bottoms",
        name: "Bottoms",
        slug: "kids-bottoms",
        count: 98,
      },
      { id: "kids-shoes", name: "Shoes", slug: "kids-shoes", count: 73 },
    ],
  },
  {
    id: "tops",
    name: "Tops",
    slug: "tops",
    image: img(2),
  },
  {
    id: "co-ords",
    name: "Co ords",
    slug: "co-ords",
    image: img(3),
  },
  {
    id: "shirts",
    name: "Shirts",
    slug: "shirts",
    image: img(4),
  },
  {
    id: "sweatshirt",
    name: "Sweatshirt",
    slug: "sweatshirt",
    image: img(5),
  },
  {
    id: "men-shirts",
    name: "Shirts",
    slug: "men-shirts",
    image: img(6),
  },
  {
    id: "valentines-day",
    name: "Valentine's Day",
    slug: "valentines-day",
    image: img(7),
  },
  {
    id: "new-in",
    name: "New in",
    slug: "new-in",
    image: img(8),
  },
  {
    id: "pul-size",
    name: "Pul size",
    slug: "pul-size",
    image: img(0),
  },
  {
    id: "co-ords-2",
    name: "Co ords",
    slug: "co-ords-2",
    image: img(1),
  },
];
