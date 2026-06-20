import { VerifiedCheck } from "@solar-icons/react/ssr";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  formatCount,
  formatMemberYears,
} from "@/features/shop/pages/[slug]/utils/shop-format.utils";
import { ShopLogoStory } from "@/features/shop/pages/[slug]/components/shop-profile/shop-logo-story";

interface IProps {
  shop: IApiShop;
  dict: IDictionary;
  activeStoriesCount: number;
  viewedStoriesCount: number;
}

interface IStatBlock {
  value: string;
  label: string;
}

export function ShopMobileProfile({ shop, dict, activeStoriesCount, viewedStoriesCount }: IProps) {
  const blocks: IStatBlock[] = [
    { value: formatCount(shop.sales_count), label: dict.shop.sels },
    { value: formatCount(shop.followers_count), label: dict.shop.followers },
    { value: formatMemberYears(shop.member_since, dict), label: dict.shop.seller },
  ];

  return (
    <div className="flex items-center gap-4 px-4">
      <ShopLogoStory
        shop={shop}
        activeCount={activeStoriesCount}
        viewedCount={viewedStoriesCount}
        className="size-20"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate font-semibold text-foreground">
            {shop.display_name}
          </span>
          {shop.is_verified && (
            <VerifiedCheck className="size-5 shrink-0 fill-sky-500 text-white" />
          )}
        </div>

        <ul className="mt-2 grid grid-cols-3 gap-2">
          {blocks.map((block) => (
            <li key={block.label} className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {block.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {block.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
