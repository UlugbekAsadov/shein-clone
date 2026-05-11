export type OrderStatus = "unpaid" | "processing" | "shipped" | "delivered" | "return";

export interface IOrderProgressStep {
  id: "processing" | "shipped" | "delivered";
  label: string;
  state: "active" | "pending" | "done";
}

export interface IOrderBrand {
  label: string;
  variant: "brand" | "trend";
}

export interface IOrder {
  id: string;
  productTitle: string;
  productImage: string;
  sellerName: string;
  sellerHref: string;
  brand: IOrderBrand;
  soldCount: string;
  stockLeft: string;
  color: string;
  colorSwatch: string;
  size: string;
  qty: number;
  location: string;
  price: number;
  originalPrice: number;
  saveAmount: string;
  status: OrderStatus;
  progress?: IOrderProgressStep[];
}
