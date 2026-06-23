import type { IProduct } from "@/types/product.interface";
import { getProductOriginalPrice } from "@/shared/utils/product-display";
import type {
  ICartData,
  ICartItemView,
  ICartTotals,
} from "./cart.interface";

export function buildCartItemViews(data: ICartData | null): ICartItemView[] {
  if (!data || !data.items || !data.products) return [];
  const productsById = new Map<number, IProduct>(
    data.products.map((product) => [product.id, product]),
  );

  return data.items.flatMap((line) => {
    const product = productsById.get(line.product_id);
    if (!product) return [];

    const unitPrice = product.price;
    const originalUnitPrice = getProductOriginalPrice(product);
    const lineTotal = unitPrice * line.count;
    const originalLineTotal = (originalUnitPrice ?? unitPrice) * line.count;
    const isAvailable =
      line.is_available ?? product.is_available ?? true;

    return [
      {
        line,
        product,
        unitPrice,
        originalUnitPrice,
        lineTotal,
        originalLineTotal,
        savings: originalLineTotal - lineTotal,
        isAvailable,
      },
    ];
  });
}

export function computeCartTotals(items: ICartItemView[]): ICartTotals {
  return items.reduce<ICartTotals>(
    (totals, item) => ({
      productsCount: totals.productsCount + item.line.count,
      productsTotal: totals.productsTotal + item.originalLineTotal,
      discounts: totals.discounts + item.savings,
      totalPrice: totals.totalPrice + item.lineTotal,
    }),
    { productsCount: 0, productsTotal: 0, discounts: 0, totalPrice: 0 },
  );
}

export function getDeliveryDate(deliveryDateText?: string): string {
  if (!deliveryDateText) return "";
  const days = Number(deliveryDateText);
  if (!Number.isFinite(days) || days <= 0) return deliveryDateText;

  const date = new Date();
  date.setDate(date.getDate() + days);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}
