import type { IProduct } from "@/types/product.interface";
import type { IActionResult } from "@/types/action-result.interface";

export interface ICartSkuInfo {
  attribute_slug: string;
  attribute_name: string;
  item_name: string;
  value: string;
}

export interface ICartLineAttribute {
  slug: string;
  name: string;
  value: string;
}

export interface ICartLine {
  sku_id: number;
  product_id: number;
  count: number;
  sku_info?: ICartSkuInfo[];
  is_available?: boolean;
}

export interface ICartData {
  count: number;
  total_quantity: number;
  sku_ids: number[];
  product_ids: number[];
  items: ICartLine[];
  products: IProduct[];
}

export interface ICartItemView {
  line: ICartLine;
  product: IProduct;
  unitPrice: number;
  originalUnitPrice?: number;
  lineTotal: number;
  originalLineTotal: number;
  savings: number;
  isAvailable: boolean;
}

export interface ICartTotals {
  productsCount: number;
  productsTotal: number;
  discounts: number;
  totalPrice: number;
}

export interface IMinOrderAmount {
  amount: number;
}

export interface ICartContextValue {
  data: ICartData | null;
  items: ICartItemView[];
  totals: ICartTotals;
  count: number;
  totalQuantity: number;
  loading: boolean;
  add: (
    product: IProduct,
    skuId: number,
    count: number,
    skuInfo?: ICartSkuInfo[],
  ) => Promise<IActionResult<ICartData>>;
  update: (
    productId: number,
    skuId: number,
    count: number,
  ) => Promise<IActionResult<ICartData>>;
  remove: (productId: number) => Promise<IActionResult<ICartData>>;
  clear: () => Promise<IActionResult<ICartData>>;
  refresh: () => Promise<void>;
}
