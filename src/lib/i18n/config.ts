export const defaultLocale = "cs" as const;
export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}
