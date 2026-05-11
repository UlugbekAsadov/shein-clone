import type { IDiscountTile } from "@/types/discount-tile.interface";

const BG_IMAGES = [
  "/mocks/images/discount-banners/background/Group%20427318349.png",
  "/mocks/images/discount-banners/background/Group%20427318350.png",
  "/mocks/images/discount-banners/background/Group%20427318350-1.png",
  "/mocks/images/discount-banners/background/Group%20427318352.png",
  "/mocks/images/discount-banners/background/Group%20427318352-1.png",
];

const MAIN_IMAGES = [
  "/mocks/images/discount-banners/main-images/image%20778.png",
  "/mocks/images/discount-banners/main-images/image%20778-1.png",
  "/mocks/images/discount-banners/main-images/image%20778-2.png",
  "/mocks/images/discount-banners/main-images/image%20778-3.png",
  "/mocks/images/discount-banners/main-images/Frame%20427318391.png",
  "/mocks/images/discount-banners/main-images/Frame%20427318398.png",
];

export const discountTiles: IDiscountTile[] = [
  {
    id: "d1",
    percent: 20,
    image: MAIN_IMAGES[0],
    bgImage: BG_IMAGES[0],
    shopName: "Adam Land",
    shopCategory: "Women's Fashion",
    verified: true,
    background: "linear-gradient(135deg, #ff6b35 0%, #f7411a 50%, #c41e0b 100%)",
  },
  {
    id: "d2",
    percent: 30,
    image: MAIN_IMAGES[1],
    bgImage: BG_IMAGES[1],
    shopName: "Adam Land",
    shopCategory: "Women's Fashion",
    verified: true,
    background: "linear-gradient(135deg, #1e3a8a 0%, #1e6cd9 50%, #2563eb 100%)",
  },
  {
    id: "d3",
    percent: 20,
    image: MAIN_IMAGES[2],
    bgImage: BG_IMAGES[2],
    shopName: "Adam Land",
    shopCategory: "Women's Fashion",
    verified: true,
    background: "linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)",
  },
  {
    id: "d4",
    percent: 20,
    image: MAIN_IMAGES[3],
    bgImage: BG_IMAGES[3],
    shopName: "Adam Land",
    shopCategory: "Women's Fashion",
    verified: true,
    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
  },
  {
    id: "d5",
    percent: 50,
    image: MAIN_IMAGES[4],
    bgImage: BG_IMAGES[4],
    shopName: "Adam Land",
    shopCategory: "Women's Fashion",
    verified: true,
    background: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)",
  },
  {
    id: "d6",
    percent: 20,
    image: MAIN_IMAGES[5],
    bgImage: BG_IMAGES[0],
    shopName: "Adam Land",
    shopCategory: "Women's Fashion",
    verified: true,
    background: "linear-gradient(135deg, #ff6b35 0%, #f7411a 50%, #c41e0b 100%)",
  },
];
