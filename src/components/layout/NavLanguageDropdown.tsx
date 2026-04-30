"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/lib/i18n/config";

type NavLanguageDropdownProps = {
  lang: string;
  scrolled: boolean;
  labels: {
    label: string;
    cs: string;
    en: string;
    csShort: string;
    enShort: string;
  };
};

// =============================================================================
// NavLanguageDropdown — nenápadný globe trigger v navigaci.
// Klik otevře malý dropdown s plnými názvy jazyků.
// Barvy ladí s navbar scroll stavem (light přes hero, dark scrolled).
// =============================================================================
export function NavLanguageDropdown({
  lang,
  scrolled,
  labels,
}: NavLanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  function getLocalePath(targetLocale: string) {
    const segments = pathname.split("/");
    if (
      segments[1] &&
      locales.includes(segments[1] as (typeof locales)[number])
    ) {
      segments[1] = targetLocale;
    }
    return segments.join("/") || `/${targetLocale}`;
  }

  // Klik mimo → zavřít
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const shortLabel = (l: Locale) =>
    l === "cs" ? labels.csShort : labels.enShort;
  const fullLabel = (l: Locale) => (l === "cs" ? labels.cs : labels.en);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={labels.label}
        className={`group relative top-px inline-flex items-center gap-1.5 leading-none text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
          scrolled
            ? "text-white/85 hover:text-white"
            : "text-night/75 hover:text-night"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[14px] w-[14px] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
        </svg>
        <span className="translate-y-[0.5px]">
          {shortLabel(lang as Locale)}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-3 w-40 overflow-hidden rounded-xl bg-night text-bone shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
        >
          {locales.map((locale) => {
            const isCurrent = locale === lang;
            return (
              <Link
                key={locale}
                href={getLocalePath(locale)}
                onClick={() => setOpen(false)}
                role="menuitemradio"
                aria-checked={isCurrent}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition ${
                  isCurrent
                    ? "bg-white/10 text-gold"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="font-medium">{fullLabel(locale)}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">
                  {shortLabel(locale)}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
