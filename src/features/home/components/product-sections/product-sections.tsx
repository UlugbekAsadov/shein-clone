import { Fragment } from "react";
import { ProductGroup } from "@/features/home/components/product-group/product-group";
import { FeaturedShops } from "@/features/home/components/featured-shops/featured-shops";
import type {
  IProductSection,
  IApiSectionProduct,
} from "@/features/home/utils/product-section.interface";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";
import type { IProduct } from "@/types/product.interface";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  sections: IProductSection[];
  featuredShops: IApiFeaturedShop[];
  viewAllLabel: string;
  featuredShopsTitle: string;
  featuredShopsSubtitle: string;
  followLabel: string;
  followingLabel: string;
}

function mapApiProduct(apiProduct: IApiSectionProduct): IProduct {
  return {
    id: String(apiProduct.id),
    slug: apiProduct.slug,
    title: apiProduct.title,
    subtitle: "",
    price: apiProduct.price,
    originalPrice: apiProduct.old_price > 0 ? apiProduct.old_price : undefined,
    image: apiProduct.image_url,
    rating: apiProduct.rating,
    reviews: 0,
    badge: apiProduct.is_original ? "Original" : undefined,
    discountLabel:
      apiProduct.discount_percentage > 0
        ? `${apiProduct.discount_percentage}%`
        : undefined,
    delivery: apiProduct.delivery_date_text,
  };
}

export function ProductSections({
  lang,
  sections,
  featuredShops,
  viewAllLabel,
  featuredShopsTitle,
  featuredShopsSubtitle,
  followLabel,
  followingLabel,
}: IProps) {
  const safeShops = Array.isArray(featuredShops) ? featuredShops : [];
  const safeSections = Array.isArray(sections) ? sections : [];

  return (
    <>
      {safeSections.map((item, index) => {
        const { section, products } = item;
        const mappedProducts = products.map(mapApiProduct);
        const sectionNumber = index + 1;
        const isLastSection = index === safeSections.length - 1;
        const shouldShowShops =
          safeShops.length > 0 &&
          (sectionNumber % 2 === 0 ||
            (safeSections.length < 2 && isLastSection));

        const SectionIcon = section.icon
          ? () => <span dangerouslySetInnerHTML={{ __html: section.icon }} />
          : undefined;

        const timer = section.timer
          ? new Date(section.timer.end_at).getTime()
          : undefined;

        return (
          <Fragment key={section.id}>
            <ProductGroup
              title={section.name}
              subtitle={section.description}
              viewAllLabel={viewAllLabel}
              products={mappedProducts}
              viewAllHref={`/${lang}/demo/category/${section.slug}`}
              bgColor={section.bg_color}
              Icon={SectionIcon}
              timer={timer}
              timerColor={section.bg_color || undefined}
              type={section.type ?? "card"}
            />
            {shouldShowShops && (
              <FeaturedShops
                title={featuredShopsTitle}
                subtitle={featuredShopsSubtitle}
                viewAllLabel={viewAllLabel}
                followLabel={followLabel}
                followingLabel={followingLabel}
                shops={safeShops}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
}
