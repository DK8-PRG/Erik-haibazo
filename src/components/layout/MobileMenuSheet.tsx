"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

type NavLink = { href: string; label: string };

type MobileMenuSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  menuLabel: string;
  closeMenuLabel: string;
  lang: string;
};

/**
 * Fullscreen dark drawer pro mobil. Obsahuje anchor odkazy a language switcher.
 * Klik na link → zavře menu (smooth scroll na anchor zařídí browser).
 */
export function MobileMenuSheet({
  isOpen,
  onClose,
  links,
  closeMenuLabel,
  lang,
}: MobileMenuSheetProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-40 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label={closeMenuLabel}
        className={`absolute inset-0 bg-night/70 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-night text-bone shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeMenuLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block rounded-xl px-4 py-3 text-base font-bold uppercase tracking-[0.16em] text-white/90 transition hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 px-6 py-4">
          <LanguageSwitcher lang={lang} />
          <Link
            href="/studio"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80"
          >
            Studio
          </Link>
        </div>
      </aside>
    </div>
  );
}
