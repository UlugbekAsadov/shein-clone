import "server-only";
import { locales } from "@/lib/i18n-config";

const dictionaries = {
  uz: () => import("./locales/uz.json").then((m) => m.default),
  ru: () => import("./locales/ru.json").then((m) => m.default),
  en: () => import("./locales/en.json").then((m) => m.default),
};

export interface IDictionary
  extends Awaited<ReturnType<typeof dictionaries.en>> {}

export const getDictionary = async (
  locale: (typeof locales)[number],
): Promise<IDictionary> => dictionaries[locale]() as Promise<IDictionary>;
