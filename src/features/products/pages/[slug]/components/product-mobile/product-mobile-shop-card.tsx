"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { VerifiedCheck } from "@solar-icons/react/ssr";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";

interface IProps {
  shop: IApiShop;
  followLabel: string;
  followingLabel: string;
}

export function ProductMobileShopCard({
  shop,
  followLabel,
  followingLabel,
}: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const shopHref = `/${lang}/demo/shop/${shop.id}`;

  return (
    <div className="mt-5 flex items-center gap-3 rounded-[18px] bg-secondary p-3">
      <Link
        href={shopHref}
        className="relative size-10 shrink-0 overflow-hidden rounded-full bg-foreground"
      >
        <Image
          src={shop.logo_url}
          alt={shop.display_name}
          fill
          sizes="44px"
          className="object-cover"
        />
      </Link>

      <Link href={shopHref} className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-semibold text-foreground">
            {shop.display_name}
          </span>
          {shop.is_verified && (
            <VerifiedCheck className="size-3.5 shrink-0 fill-sky-500 text-white" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{shop.location.name}</p>
      </Link>

      <Button
        type="button"
        size="sm"
        onClick={() => setIsFollowing((v) => !v)}
        className={cn(
          "h-9 rounded-[8px] px-8 text-sm font-bold",
          isFollowing
            ? "bg-background text-foreground border border-foreground"
            : "",
        )}
      >
        {isFollowing ? followingLabel : followLabel}
      </Button>
    </div>
  );
}
