"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";
import { ProductSellerStat } from "./product-seller-stat";
import { Tag } from "@/shared/components/tag/tag";
import { VerifiedCheck, Star } from "@solar-icons/react";

interface IProps {
  shop: IApiShop;
}

export function ProductSellerCard({ shop }: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const shopHref = `/${lang}/demo/shop/${shop.id}`;

  const stats = [
    { id: "sold", label: "sold", value: String(shop.sales_count) },
    { id: "followers", label: "followers", value: String(shop.followers_count) },
    { id: "response", label: "response rate", value: shop.response_rate },
  ];

  return (
    <div className="overflow-hidden p-2 rounded-lg border border-border bg-card">
      <Link href={shopHref} className="block">
        <div className="relative h-32 rounded-[12px] overflow-hidden">
          <Image
            src={shop.banner_url}
            alt={shop.display_name}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
          <span className="absolute right-3 top-2">
            <Tag label="Fast shipping" size="sm" />
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-3 p-4">
        <Link
          href={shopHref}
          className="-mt-10 size-14 shrink-0 overflow-hidden rounded-full ring-4 ring-background z-10"
        >
          <Image
            src={shop.logo_url}
            alt={shop.display_name}
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
              <span className="font-semibold font-sm">{shop.display_name}</span>
              {shop.is_verified && (
                <VerifiedCheck className="size-4 fill-blue-500 text-white" />
              )}
            </Link>
            <p className="text-xs text-muted-foreground">{shop.location}</p>
            <span className="flex items-center gap-1 text-xs mt-3">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-xs">
                {shop.rating.toFixed(1)}
              </span>
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              {stats.map((stat) => (
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
