import Image from "next/image";
import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";
import { ShopProfileStats } from "./shop-profile-stats";
import { ShopFollowButton } from "./shop-follow-button";
import { ShopProfileLocation } from "./shop-profile-location";
import { Star, VerifiedCheck } from "@solar-icons/react/ssr";

interface IProps {
  shop: IShopDetail;
  followLabel: string;
  followingLabel: string;
}

export function ShopProfile({ shop, followLabel, followingLabel }: IProps) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-border bg-card">
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <Image
          src={shop.banner}
          alt={shop.name}
          fill
          quality={95}
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
        />
      </div>

      <div className="relative px-8 pb-6">
        <div className="relative -mt-12 flex items-end gap-5">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full border-6 border-card bg-background">
            <Image
              src={shop.avatar}
              alt={shop.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-1 text-2xl font-semibold">
              <span>{shop.name}</span>
              {shop.verified && (
                <VerifiedCheck className="size-5 shrink-0 fill-sky-500 text-white" />
              )}
              <span className="ml-2 flex items-center gap-1 text-sm font-medium text-secondary-foreground">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-primary">{shop.rating.toFixed(1)}</span>
                <span>({shop.reviews})</span>
              </span>
            </h1>
            <p className="mt-2 text-muted-foreground">{shop.handle}</p>

            <ShopProfileStats stats={shop.stats} />
            <ShopProfileLocation
              countryFlag={shop.countryFlag}
              countryLabel={shop.countryLabel}
              shipsFrom={shop.shipsFrom}
            />
          </div>

          <ShopFollowButton
            initialFollowing={shop.isFollowing}
            followLabel={followLabel}
            followingLabel={followingLabel}
          />
        </div>
      </div>
    </section>
  );
}
