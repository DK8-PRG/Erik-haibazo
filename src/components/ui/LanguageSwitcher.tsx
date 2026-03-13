"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  lang: string;
};

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getLocalePath(targetLocale: string) {
    // Replace the current locale segment in the path
    const segments = pathname.split("/");
    if (
      segments[1] &&
      locales.includes(segments[1] as (typeof locales)[number])
    ) {
      segments[1] = targetLocale;
    }
    return segments.join("/") || `/${targetLocale}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-0.5">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition ${
            locale === lang
              ? "bg-[#FFD23F] text-[#111111]"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          {locale === "cs" ? "CZ" : "EN"}
        </Link>
      ))}
    </div>
  );
}
