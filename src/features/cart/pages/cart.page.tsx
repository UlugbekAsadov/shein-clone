import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { CartView } from "@/features/cart/components/cart-view";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function CartPage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <CartView lang={lang} dict={dict} />
      </main>

      <Footer dict={dict} />
    </>
  );
}
