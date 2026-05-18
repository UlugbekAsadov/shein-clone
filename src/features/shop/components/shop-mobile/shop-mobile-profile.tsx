import Image from "next/image";
import { VerifiedCheck } from "@solar-icons/react/ssr";
import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";

interface IProps {
  shop: IShopDetail;
  labels: {
    sels: string;
    followers: string;
    seller: string;
  };
}

interface IStatBlock {
  value: string;
  label: string;
}

export function ShopMobileProfile({ shop, labels }: IProps) {
  const sels = shop.stats.find((s) => s.icon === "box");
  const followers = shop.stats.find((s) => s.icon === "users");
  const years = shop.stats.find((s) => s.icon === "medal");

  const blocks: IStatBlock[] = [
    { value: sels?.value ?? "—", label: labels.sels },
    { value: followers?.value ?? "—", label: labels.followers },
    { value: years?.value ?? "—", label: labels.seller },
  ];

  return (
    <div className="flex items-center gap-4 px-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-foreground">
        <Image
          src={shop.avatar}
          alt={shop.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate font-semibold text-foreground">
            {shop.name}
          </span>
          {shop.verified && (
            <VerifiedCheck className="size-5 shrink-0 fill-sky-500 text-white" />
          )}
        </div>

        <ul className="mt-2 grid grid-cols-3 gap-2">
          {blocks.map((block) => (
            <li key={block.label} className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {block.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {block.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
