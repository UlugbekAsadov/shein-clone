import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IApiShop, IApiShopAbout } from "@/features/shop/utils/shop-response.interface";
import { AboutStore } from "../about-store/about-store";

interface IProps {
  shop: IApiShop;
  about: IApiShopAbout | null;
  dict: IDictionary;
  lang: string;
}

export function AboutStorePanel({ shop, about, dict, lang }: IProps) {
  return <AboutStore shop={shop} about={about} dict={dict} lang={lang} />;
}
