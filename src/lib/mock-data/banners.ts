import type { HeroSlide } from "./types";

const BANNER = "/mocks/images/banner/image%2013.png";

export const heroSlides: HeroSlide[] = [
  {
    id: "hs1",
    image: BANNER,
    title: "DROP SHOULDER",
    subtitle: "FABRIC WITH 200+ GSM RIBBED",
  },
  {
    id: "hs2",
    image: BANNER,
    title: "SUMMER COLLECTION",
    subtitle: "Up to 50% off selected styles",
  },
  {
    id: "hs3",
    image: BANNER,
    title: "NEW ARRIVALS",
    subtitle: "Fresh styles weekly",
  },
  {
    id: "hs4",
    image: BANNER,
    title: "LIMITED EDITION",
    subtitle: "Premium fabric drops",
  },
];

export const promoBanner = {
  label: "SPRIGN SALE",
  text: "Up to 50% off selected styles",
  cta: "Shop Now",
};
