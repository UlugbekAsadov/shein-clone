import type { IOrderGroup } from "@/features/profile/interfaces/order-group.interface";

const sweatshirtItems = [
  {
    id: "sweatshirt-tokyo",
    title: "Sweatshirt",
    image: "/placeholders/product.svg",
    qty: 28,
    color: "Blue",
    colorSwatch: "#1E5BBA",
    size: "2XL",
    price: 230000,
  },
  {
    id: "sweatshirt-unknown",
    title: "Sweatshirt",
    image: "/placeholders/product.svg",
    qty: 28,
    color: "Blue",
    colorSwatch: "#1E5BBA",
    size: "2XL",
    price: 500000,
  },
  {
    id: "sweatshirt-california",
    title: "Sweatshirt",
    image: "/placeholders/product.svg",
    qty: 28,
    color: "Blue",
    colorSwatch: "#1E5BBA",
    size: "2XL",
    price: 150000,
  },
];

export const orderGroupMocks: IOrderGroup[] = [
  {
    id: "order-group-1",
    orderNumber: "12334",
    deliveryDate: "12.05.26",
    status: "arrived",
    items: sweatshirtItems,
    totalPrice: 1200000,
  },
  {
    id: "order-group-2",
    orderNumber: "12334",
    deliveryDate: "12.05.26",
    status: "processing",
    items: sweatshirtItems,
    totalPrice: 1200000,
  },
  {
    id: "order-group-3",
    orderNumber: "12334",
    deliveryDate: "12.05.26",
    status: "arrived",
    items: sweatshirtItems,
    totalPrice: 1200000,
  },
];
