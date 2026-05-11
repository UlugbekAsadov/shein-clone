export const locales = ["uz", "ru", "en"] as const;

export const defaultLocale: (typeof locales)[number] = "uz";

export function hasLocale(value: string): value is (typeof locales)[number] {
  return (locales as readonly string[]).includes(value);
}
