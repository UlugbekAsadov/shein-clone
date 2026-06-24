import type { IProduct } from "@/types/product.interface";
import { getProductOriginalPrice } from "@/shared/utils/product-display";
import type {
  ICartData,
  ICartItemView,
  ICartLine,
  ICartLineAttribute,
  ICartSkuInfo,
  ICartTotals,
} from "./cart.interface";

export function buildSelectedSkuInfo(
  size?: string,
  color?: string,
): ICartSkuInfo[] {
  const info: ICartSkuInfo[] = [];
  if (size)
    info.push({
      attribute_slug: "size",
      attribute_name: "",
      item_name: size,
      value: size,
    });
  if (color)
    info.push({
      attribute_slug: "color",
      attribute_name: "",
      item_name: color,
      value: color,
    });
  return info;
}

export function getCartLineAttributes(line: ICartLine): ICartLineAttribute[] {
  if (!line.sku_info) return [];
  return line.sku_info
    .map((info) => ({
      slug: info.attribute_slug,
      name: info.attribute_name,
      value: info.item_name || info.value,
    }))
    .filter((attribute) => attribute.value);
}

export function mergeServerCartProducts(
  local: ICartData,
  serverProducts: IProduct[],
): ICartData {
  if (!serverProducts.length) return local;
  const serverById = new Map(
    serverProducts.map((product) => [product.id, product]),
  );
  const localById = new Map(
    local.products.map((product) => [product.id, product]),
  );
  const productIds = [...new Set(local.items.map((line) => line.product_id))];
  const products = productIds
    .map((id) => serverById.get(id) ?? localById.get(id))
    .filter((product): product is IProduct => Boolean(product));
  return { ...local, products };
}

export function createEmptyCart(): ICartData {
  return {
    count: 0,
    total_quantity: 0,
    sku_ids: [],
    product_ids: [],
    items: [],
    products: [],
  };
}

function recalcCart(
  items: ICartData["items"],
  products: IProduct[],
): ICartData {
  return {
    items,
    products,
    count: items.length,
    total_quantity: items.reduce((sum, line) => sum + line.count, 0),
    sku_ids: items.map((line) => line.sku_id),
    product_ids: [...new Set(items.map((line) => line.product_id))],
  };
}

export function addLineToCart(
  data: ICartData | null,
  product: IProduct,
  skuId: number,
  count: number,
  skuInfo?: ICartSkuInfo[],
): ICartData {
  const base = data ?? createEmptyCart();
  const items = [...base.items];
  const index = items.findIndex((line) => line.sku_id === skuId);
  if (index >= 0) {
    items[index] = { ...items[index], count: items[index].count + count };
  } else {
    items.push({
      sku_id: skuId,
      product_id: product.id,
      count,
      sku_info: skuInfo,
    });
  }
  const products = base.products.some((p) => p.id === product.id)
    ? base.products
    : [...base.products, product];
  return recalcCart(items, products);
}

export function setCartLineCount(
  data: ICartData | null,
  skuId: number,
  count: number,
): ICartData | null {
  if (!data) return data;
  const items = data.items.map((line) =>
    line.sku_id === skuId ? { ...line, count } : line,
  );
  return recalcCart(items, data.products);
}

export function removeCartProduct(
  data: ICartData | null,
  productId: number,
): ICartData | null {
  if (!data) return data;
  const items = data.items.filter((line) => line.product_id !== productId);
  const usedProductIds = new Set(items.map((line) => line.product_id));
  const products = data.products.filter((p) => usedProductIds.has(p.id));
  return recalcCart(items, products);
}

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
    const isAvailable = line.is_available ?? product.is_available ?? true;

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
