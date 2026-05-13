import Image from "next/image";
import { VerifiedCheck } from "@solar-icons/react/ssr";

interface IProps {
  avatar: string;
  shopName: string;
  shopCategory: string;
  verified?: boolean;
}

export function DiscountBannerShop({
  avatar,
  shopName,
  shopCategory,
  verified,
}: IProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
        <Image
          src={avatar}
          alt={shopName}
          width={36}
          height={36}
          quality={95}
          className="size-full object-cover"
        />
      </div>
      <div className="min-w-0 leading-tight">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-bold text-white">
            {shopName}
          </span>
          {verified && (
            <VerifiedCheck className="size-4 shrink-0" weight="Bold" />
          )}
        </div>
        <p className="truncate text-xs text-white/90">{shopCategory}</p>
      </div>
    </div>
  );
}
