import Image from "next/image";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";
import { FeaturedShopMobileCard } from "./featured-shop-mobile-card";
import { ShopBadge } from "./shop-badge";
import { ShopSolid } from "@/shared/components/icons/solid";
import { Button } from "@/shared/components/ui/button";
import { MedalRibbonStar, Star, Box, VerifiedCheck } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import { FeaturedShopsHeader } from "./featured-shops-header";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  followLabel: string;
  followingLabel: string;
  shops: IApiFeaturedShop[];
}

export function FeaturedShops({
  title,
  subtitle,
  viewAllLabel,
  followLabel,
  followingLabel,
  shops,
}: IProps) {
  if (shops.length === 0) return null;

  return (
    <section className={cn("mx-auto max-w-360 px-4 py-2", "md:px-6 md:py-3")}>
      <div
        className={cn(
          "bg-secondary p-0 pb-3 rounded-sm overflow-hidden",
          "md:p-5 md:rounded-[28px] md:overflow-visible",
        )}
      >
        <FeaturedShopsHeader
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
            "md:grid-cols-3",
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
                    src={shop.banner_url}
                    alt={shop.display_name}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover"
                  />
                  {shop.badges.length > 0 && (
                    <div className="absolute right-0 top-2 flex flex-col items-end gap-1">
                      {shop.badges.map((badge) => (
                        <ShopBadge key={badge.id} badge={badge} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-5 left-3 size-12 overflow-hidden rounded-full border-2 border-card bg-background">
                  <Image
                    src={shop.avatar_url}
                    alt={shop.display_name}
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
                        {shop.display_name}
                      </span>
                      {shop.is_verified && (
                        <VerifiedCheck className="size-4 shrink-0 fill-sky-500 text-white" weight="Outline" />
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {shop.seller_type}
                    </p>
                  </div>

                  <Button
                    variant={shop.is_followed ? "outline" : "default"}
                    className="h-8 px-5 text-xs font-bold rounded-[10px]"
                  >
                    {shop.is_followed ? followingLabel : followLabel}
                  </Button>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-sm">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">
                    {shop.rating.toFixed(1)}
                    <span className="text-secondary-foreground text-[10px] font-normal ml-0.5">
                      ({shop.sales_count})
                    </span>
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Box className="size-5" weight="Bold" />
                    {shop.sales_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <MedalRibbonStar className="size-5" weight="Bold" />
                    {shop.seller_years}
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
