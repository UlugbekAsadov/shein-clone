import { SHOP_TAB_IDS } from "@/features/shop/constants/shop-tabs.constants";
import { ShopTabItem } from "./shop-tab-item";

interface IProps {
  active: (typeof SHOP_TAB_IDS)[number];
  onChange: (id: (typeof SHOP_TAB_IDS)[number]) => void;
  allProductsLabel: string;
  dealsOffersLabel: string;
  aboutStoreLabel: string;
  dealsCount?: number;
}

export function ShopTabs({
  active,
  onChange,
  allProductsLabel,
  dealsOffersLabel,
  aboutStoreLabel,
  dealsCount,
}: IProps) {
  return (
    <div className="flex items-center gap-8 border-b border-border">
      <ShopTabItem
        label={allProductsLabel}
        active={active === "all"}
        onClick={() => onChange("all")}
      />
      <ShopTabItem
        label={dealsOffersLabel}
        badge={dealsCount}
        active={active === "deals"}
        onClick={() => onChange("deals")}
      />
      <ShopTabItem
        label={aboutStoreLabel}
        active={active === "about"}
        onClick={() => onChange("about")}
      />
    </div>
  );
}
