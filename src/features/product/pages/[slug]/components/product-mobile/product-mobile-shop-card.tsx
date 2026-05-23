"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { VerifiedCheck } from "@solar-icons/react/ssr";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { ISellerCard } from "@/features/product/pages/[slug]/utils/seller-card.interface";

interface IProps {
  seller: ISellerCard;
  followLabel: string;
  followingLabel: string;
}

export function ProductMobileShopCard({
  seller,
  followLabel,
  followingLabel,
}: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const shopHref = `/${lang}/shop/${seller.slug}`;

  return (
    <div className="mt-5 flex items-center gap-3 rounded-[18px] bg-secondary p-3">
      <Link
        href={shopHref}
        className="relative size-10 shrink-0 overflow-hidden rounded-full bg-foreground"
      >
        <Image
          src={seller.avatar}
          alt={seller.name}
          fill
          sizes="44px"
          className="object-cover"
        />
      </Link>

      <Link href={shopHref} className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-semibold text-foreground">
            {seller.name}
          </span>
          <VerifiedCheck className="size-3.5 shrink-0 fill-sky-500 text-white" />
        </div>
        <p className="text-xs text-muted-foreground">{seller.tag}</p>
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
