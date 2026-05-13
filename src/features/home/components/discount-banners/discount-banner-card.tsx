import Image from "next/image";
import type { IDiscountTile } from "@/types/discount-tile.interface";
import { DiscountBannerShop } from "./discount-banner-shop";

interface IProps {
  tile: IDiscountTile;
  discountLabel: string;
}

export function DiscountBannerCard({ tile, discountLabel }: IProps) {
  return (
    <article
      className="relative flex h-60 gap-6 overflow-hidden rounded-2xl px-[18px] py-5 text-white"
      style={{ background: tile.background }}
    >
      <Image
        src={tile.bgImage}
        alt=""
        aria-hidden
        fill
        quality={95}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />

      <div className="relative z-10 h-full w-1/3 shrink-0">
        <Image
          src={tile.image}
          alt={tile.shopName}
          fill
          quality={95}
          sizes="(min-width: 1024px) 12vw, (min-width: 640px) 18vw, 30vw"
          className="rounded-xl object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <DiscountBannerShop
          avatar="/placeholders/avatar.svg"
          shopName={tile.shopName}
          shopCategory={tile.shopCategory}
          verified={tile.verified}
        />

        <div className="flex flex-col items-start justify-end">
          <span className="text-[21px] font-bold leading-tight">
            {discountLabel}
          </span>
          <span className="text-[76px] font-black leading-none tracking-tight">
            {tile.percent}%
          </span>
        </div>
      </div>
    </article>
  );
}
