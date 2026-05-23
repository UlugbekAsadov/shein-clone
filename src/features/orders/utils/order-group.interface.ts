export type OrderGroupStatus =
  | "unpaid"
  | "processing"
  | "shipped"
  | "arrived"
  | "review"
  | "return";

export interface IOrderGroupItem {
  id: string;
  title: string;
  image: string;
  qty: number;
  color: string;
  colorSwatch: string;
  size: string;
  price: number;
}

export interface IOrderGroup {
  id: string;
  orderNumber: string;
  deliveryDate: string;
  status: OrderGroupStatus;
  items: IOrderGroupItem[];
  totalPrice: number;
}
