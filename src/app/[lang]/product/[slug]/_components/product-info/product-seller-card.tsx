import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ISellerCard } from "../../_lib/interface/seller-card.interface";
import { ProductSellerStat } from "./product-seller-stat";

interface IProps {
  seller: ISellerCard;
}

export function ProductSellerCard({ seller }: IProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative h-32">
        <Image
          src={seller.banner}
          alt={seller.name}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-3 py-1 text-xs font-semibold text-background backdrop-blur-sm">
          {seller.badgeLabel}
        </span>
      </div>

      <div className="flex items-center gap-3 p-4">
        <div className="-mt-10 size-14 shrink-0 overflow-hidden rounded-full ring-4 ring-background">
          <Image
            src={seller.avatar}
            alt={seller.name}
            width={56}
            height={56}
            quality={90}
            className="size-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">{seller.name}</span>
            <BadgeCheck className="size-4 fill-blue-500 text-white" />
          </div>
          <div className="text-xs text-muted-foreground">{seller.tag}</div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1 text-xs">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold">
                {seller.rating.toFixed(1)}
              </span>
            </span>
            {seller.stats.map((stat) => (
              <ProductSellerStat key={stat.id} stat={stat} />
            ))}
          </div>
        </div>

        <Button className="rounded-full px-5">Follow</Button>
      </div>
    </div>
  );
}
