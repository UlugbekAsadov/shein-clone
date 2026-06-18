import { getShopHighlights } from "@/features/shop/services/shop-highlight.service";
import { ShopHighlightsList } from "./shop-highlights-list";

interface IProps {
  shopId: number;
}

export async function ShopHighlights({ shopId }: IProps) {
  const highlights = await getShopHighlights(shopId);
  const active = highlights.filter((h) => h.is_active);

  if (active.length === 0) return null;

  return <ShopHighlightsList highlights={active} />;
}
