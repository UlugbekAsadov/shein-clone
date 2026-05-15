import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { IShop } from "@/types/shop.interface";
import { featuredShops } from "@/shared/mocks";
import { SectionHeader } from "./section-header";
import { FeaturedShopMobileCard } from "./featured-shop-mobile-card";
import { ShopSolid } from "@/shared/components/icons/solid";
import { Button } from "@/shared/components/ui/button";
import { Tag } from "@/shared/components/tag/tag";
import { MedalRibbonStar, Star, Box } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  followLabel: string;
  followingLabel: string;
  shops?: IShop[];
}

export function FeaturedShops({
  title,
  subtitle,
  viewAllLabel,
  followLabel,
  followingLabel,
  shops = featuredShops,
}: IProps) {
  return (
    <section className={cn("mx-auto max-w-360 px-4 py-2", "md:px-6 md:py-3")}>
      <div
        className={cn(
          "bg-secondary p-0 pb-3 rounded-sm overflow-hidden",
          "md:p-5 md:rounded-[28px] md:overflow-visible",
        )}
      >
        <SectionHeader
          title={
            <span className={cn("flex items-center gap-1", "md:gap-2")}>
              {title}
              <ShopSolid className="size-6" />
            </span>
          }
          subtitle={subtitle}
          viewAllHref="#"
          viewAllLabel={viewAllLabel}
        />

        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 md:hidden [&::-webkit-scrollbar]:hidden">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="w-[60%] shrink-0 snap-center first:ml-1 last:mr-1"
            >
              <FeaturedShopMobileCard
                shop={shop}
                followLabel={followLabel}
                followingLabel={followingLabel}
              />
            </div>
          ))}
        </div>

        <div
          className={cn(
            "hidden grid-cols-1 gap-4",
            "sm:grid-cols-2",
            "md:grid",
            "lg:grid-cols-3",
            "xl:grid-cols-5",
          )}
        >
          {shops.map((shop) => (
            <article
              key={shop.id}
              className="rounded-lg border border-border bg-card p-2"
            >
              <div className="relative">
                <div className="relative aspect-246/85 overflow-hidden rounded-[12px] bg-muted">
                  <Image
                    src={shop.banner}
                    alt={shop.name}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover"
                  />
                  {shop.tag && (
                    <Tag
                      label={shop.tag.label}
                      variant={
                        shop.tag.variant === "shipping"
                          ? "success"
                          : "destructive"
                      }
                      className="absolute right-3 top-2"
                      size="sm"
                    />
                  )}
                </div>
                <div className="absolute -bottom-5 left-3 size-12 overflow-hidden rounded-full border-2 border-card bg-background">
                  <Image
                    src={shop.avatar}
                    alt={shop.name}
                    width={48}
                    height={48}
                    className="size-full object-cover"
                  />
                </div>
              </div>

              <div className="p-1.5 mt-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-1 text-base">
                      <span className="truncate text-sm font-bold">
                        {shop.name}
                      </span>
                      {shop.verified && (
                        <BadgeCheck className="size-4 shrink-0 fill-sky-500 text-white" />
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {shop.category}
                    </p>
                  </div>

                  <Button
                    variant={shop.isFollowing ? "outline" : "default"}
                    className="h-8 px-5 text-xs font-bold rounded-[10px]"
                  >
                    {shop.isFollowing ? followingLabel : followLabel}
                  </Button>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-sm">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">
                    {shop.rating.toFixed(1)}
                    <span className="text-secondary-foreground text-[10px] font-normal ml-0.5">
                      ({shop.reviews})
                    </span>
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Box className="size-5" weight="Bold" />
                    {shop.itemsSoldCount}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <MedalRibbonStar className="size-5" weight="Bold" />
                    {shop.yearsSelling}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
