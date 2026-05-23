import type { IOrderDetail } from "@/features/orders/utils/order-detail.interface";
import { orderGroupMocks } from "@/features/orders/mocks/order-group.mocks";

export const orderDetailMocks: IOrderDetail[] = orderGroupMocks.map((group) => ({
  id: group.id,
  orderNumber: group.orderNumber,
  deliveryDate: group.deliveryDate,
  status: group.status,
  items: group.items,
  totalPrice: group.totalPrice,
  paymentMethod: { kind: "visa", label: "VISA" },
  deliveryAddress: "Yashnabod 6, Tashkent",
  deliveryTime: "30.10.2024, 16:00-17:00",
  recipientName: "Nodirbek Xudayberganov",
  recipientPhone: "+998 93 123 4567",
}));

export function getOrderDetailById(id: string): IOrderDetail | undefined {
  return orderDetailMocks.find((order) => order.id === id);
}
