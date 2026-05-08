import "server-only";
import type { Locale } from "@/lib/i18n-config";

const dictionaries = {
  uz: () => import("./locales/uz.json").then((m) => m.default),
  ru: () => import("./locales/ru.json").then((m) => m.default),
  en: () => import("./locales/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]() as Promise<Dictionary>;
