import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";
import type { IAboutContent } from "@/features/shop/interfaces/about-content.interface";
import { FeaturedShops } from "@/features/home/components/featured-shops";
import { featuredShops } from "@/shared/mocks";
import { AboutStoreIntro } from "./about-store-intro";
import { InfoCard } from "./info-card/info-card";
import { BrandsCarried } from "./brands-carried/brands-carried";
import { InlineBenefits } from "./inline-benefits";

interface IProps {
  shop: IShopDetail;
  about: IAboutContent;
  dict: IDictionary;
}

export function AboutStore({ shop, about, dict }: IProps) {
  return (
    <>
      <div className="mx-auto max-w-[1440px] space-y-6 px-6">
        <AboutStoreIntro
          title={`${dict.shop.about.aboutTitle} ${shop.name}`}
          description={about.intro}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {about.cards.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>

        <BrandsCarried
          title={dict.shop.about.brandsWeCarry}
          brands={about.brands}
        />

        <InlineBenefits dict={dict.footer} />
      </div>

      <FeaturedShops
        title={dict.shop.about.similarStores}
        subtitle={dict.shop.about.verifiedSellersRealProducts}
        viewAllLabel={dict.sections.viewAll}
        followLabel={dict.shop.follow}
        followingLabel={dict.shop.following}
        shops={featuredShops}
      />
    </>
  );
}
