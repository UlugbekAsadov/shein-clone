import Image from "next/image";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { ShopProfileStats } from "./shop-profile-stats";
import { ShopFollowButton } from "./shop-follow-button";
import { ShopProfileLocation } from "./shop-profile-location";
import { ShopLogoStory } from "./shop-logo-story";
import { Star, VerifiedCheck } from "@solar-icons/react/ssr";

interface IProps {
  shop: IApiShop;
  dict: IDictionary;
  activeStoriesCount: number;
  viewedStoriesCount: number;
}

export function ShopProfile({
  shop,
  dict,
  activeStoriesCount,
  viewedStoriesCount,
}: IProps) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-border bg-card">
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <Image
          src={shop.banner_url}
          alt={shop.display_name}
          fill
          quality={95}
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
        />
      </div>

      <div className="relative px-8 pb-6">
        <div className="relative -mt-12 flex items-end gap-5">
          <ShopLogoStory
            shop={shop}
            activeCount={activeStoriesCount}
            viewedCount={viewedStoriesCount}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-1 text-2xl font-semibold">
              <span>{shop.display_name}</span>
              {shop.is_verified && (
                <VerifiedCheck className="size-5 shrink-0 fill-sky-500 text-white" />
              )}
              <span className="ml-2 flex items-center gap-1 text-sm font-medium text-secondary-foreground">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-primary">{shop.rating.toFixed(1)}</span>
                <span>({shop.reviews_count})</span>
              </span>
            </h1>
            <p className="mt-2 text-muted-foreground">@{shop.username}</p>

            <ShopProfileStats shop={shop} dict={dict} />
            <ShopProfileLocation
              countryLabel={shop.location.name}
              shipsFrom={shop.ships_from}
            />
          </div>

          <ShopFollowButton
            shopId={shop.id}
            initialFollowing={shop.is_followed}
            followLabel={dict.shop.follow}
            followingLabel={dict.shop.following}
          />
        </div>
      </div>
    </section>
  );
}
