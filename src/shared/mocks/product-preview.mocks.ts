export const galleryPool = [
  "/mocks/images/products/image%2027.png",
  "/mocks/images/products/image%2027-1.png",
  "/mocks/images/products/image%2027-2.png",
  "/mocks/images/products/image%2027-3.png",
  "/mocks/images/products/image%2027-4.png",
];

export const colorSwatches = [
  { id: "white", name: "White", image: galleryPool[0] },
  { id: "navy", name: "Navy", image: galleryPool[1] },
  { id: "black", name: "Black", image: galleryPool[2] },
  { id: "gray", name: "Gray", image: galleryPool[3] },
  { id: "dark-navy", name: "Dark Navy", image: galleryPool[4] },
  { id: "white-pink", name: "White Pink", image: galleryPool[0] },
  { id: "dark-khaki", name: "Dark Khaki", image: galleryPool[1] },
  { id: "beige", name: "Beige", image: galleryPool[2] },
  { id: "tan", name: "Tan", image: galleryPool[3] },
];

export const sizes = [
  { id: "XS", available: true },
  { id: "S", available: true },
  { id: "M", available: true },
  { id: "L", available: true },
  { id: "2XL", available: false },
  { id: "3XL", available: true },
];

export const sizeGuide: {
  label: string;
  values: Record<string, string>;
}[] = [
  {
    label: "Russian Size",
    values: { XS: "35", S: "36", M: "37", L: "38", "2XL": "40", "3XL": "42" },
  },
  {
    label: "Manufacturer Size",
    values: { XS: "35", S: "36", M: "37", L: "38", "2XL": "40", "3XL": "42" },
  },
  {
    label: "Insole Length",
    values: {
      XS: "23",
      S: "24",
      M: "24.5",
      L: "25.5",
      "2XL": "26.5",
      "3XL": "27.5",
    },
  },
];
