"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeCheck, Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { ISellerCard } from "@/features/product/interfaces/seller-card.interface";
import { ProductSellerStat } from "./product-seller-stat";

interface IProps {
  seller: ISellerCard;
}

export function ProductSellerCard({ seller }: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const shopHref = `/${lang}/shop/${seller.slug}`;

  return (
    <div className="overflow-hidden p-2 rounded-lg border border-border bg-card">
      <Link href={shopHref} className="block">
        <div className="relative h-32 rounded-[12px] overflow-hidden">
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
      </Link>

      <div className="flex flex-col gap-3 p-4">
        <Link
          href={shopHref}
          className="-mt-10 size-14 shrink-0 overflow-hidden rounded-full ring-4 ring-background z-10"
        >
          <Image
            src={seller.avatar}
            alt={seller.name}
            width={56}
            height={56}
            quality={90}
            className="size-full object-cover"
          />
        </Link>

        <div className="flex items-start">
          <div className="flex-1">
            <Link
              href={shopHref}
              className="inline-flex items-center gap-1 hover:underline"
            >
              <span className="font-semibold font-sm">{seller.name}</span>
              <BadgeCheck className="size-4 fill-blue-500 text-white" />
            </Link>
            <p className="text-xs text-muted-foreground">{seller.tag}</p>
            <span className="flex items-center gap-1 text-xs mt-3">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-xs">
                {seller.rating.toFixed(1)}{" "}
                <span className="text-muted-foreground text-[10px] font-normal">
                  (324)
                </span>
              </span>
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              {seller.stats.map((stat) => (
                <ProductSellerStat key={stat.id} stat={stat} />
              ))}
            </div>
          </div>

          <Button className="rounded-full px-5">Follow</Button>
        </div>
      </div>
    </div>
  );
}
