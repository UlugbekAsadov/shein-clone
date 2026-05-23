import type {
  IOrderGroupItem,
  OrderGroupStatus,
} from "@/features/profile/interfaces/order-group.interface";

export type PaymentMethodKind = "visa" | "mastercard" | "uzcard" | "humo";

export interface IPaymentMethod {
  kind: PaymentMethodKind;
  label: string;
}

export interface IOrderDetail {
  id: string;
  orderNumber: string;
  deliveryDate: string;
  status: OrderGroupStatus;
  items: IOrderGroupItem[];
  totalPrice: number;
  paymentMethod: IPaymentMethod;
  deliveryAddress: string;
  deliveryTime: string;
  recipientName: string;
  recipientPhone: string;
}
