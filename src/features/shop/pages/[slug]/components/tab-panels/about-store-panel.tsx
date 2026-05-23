import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IShopDetail } from "@/features/shop/pages/[slug]/utils/shop-detail.interface";
import type { IAboutContent } from "@/features/shop/pages/[slug]/utils/about-content.interface";
import { AboutStore } from "../about-store/about-store";

interface IProps {
  shop: IShopDetail;
  about: IAboutContent;
  dict: IDictionary;
}

export function AboutStorePanel({ shop, about, dict }: IProps) {
  return <AboutStore shop={shop} about={about} dict={dict} />;
}
