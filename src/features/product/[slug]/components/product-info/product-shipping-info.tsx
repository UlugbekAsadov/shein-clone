import { ProductShippingRow } from "./product-shipping-row";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import {
  DollarMinimalistic,
  ShieldCheck,
  Shop,
  Unread,
} from "@solar-icons/react/ssr";

export function ProductShippingInfo() {
  return (
    <div className="rounded-[12px] bg-secondary p-5 space-y-4">
      <div>
        <span className="font-bold">Shipping to </span>
        <span className="text-secondary-foreground">Uzbekistan</span>
      </div>

      <ProductShippingRow
        icon={<TruckIconSolid className="size-6 fill-emerald-600" />}
      >
        <div className="font-semibold text-xs text-emerald-600">
          Free Shipping (Orders $20.00)
        </div>
        <div className="mt-0.5 text-xs text-foreground font-semibold">
          Est. Delivery: Apr 13 –Apr 20,{" "}
          <span className="text-emerald-600 font-bold">
            71.6% are 7 business days
          </span>
        </div>
      </ProductShippingRow>

      <ProductShippingRow
        className="items-center"
        icon={
          <DollarMinimalistic
            className="size-6 text-foreground"
            weight="Bold"
          />
        }
      >
        <span className="font-semibold text-foreground text-xs">
          30-Day Free Returns
        </span>
      </ProductShippingRow>

      <ProductShippingRow
        icon={<ShieldCheck className="size-6 text-foreground" weight="Bold" />}
      >
        <div className="font-semibold text-foreground text-xs">
          Shopping Security
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground bg-emerald-500/20 w-fit py-1 px-2 rounded-[4px]">
          <span className="flex items-center text-foreground gap-1">
            <Unread className="size-4 text-foreground font-semibold" />
            Safe Payments
          </span>
          <span className="flex items-center text-foreground gap-1">
            <Unread className="size-4 text-foreground font-semibold" />
            Privacy Protection
          </span>
        </div>
      </ProductShippingRow>

      <ProductShippingRow
        icon={<Shop className="size-6 text-foreground" weight="Bold" />}
      >
        <div className="flex items-center gap-2">
          <span className="rounded bg-foreground px-1.5 py-0.5 text-xs font-semibold text-background">
            Marketplace
          </span>
          <span className="font-semibold text-xs">
            Sold by TY DIRECT Marketplace
          </span>
        </div>
        <div className="mt-1 text-[10px] font-medium text-muted-foreground">
          Ships from TY DIRECT Marketplace
        </div>
        <div className="text-[10px] font-medium text-muted-foreground">
          To report this seller and/or product:
        </div>
      </ProductShippingRow>
    </div>
  );
}
