"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { MobileMenuSheet } from "@/components/layout/MobileMenuSheet";
import { NavLanguageDropdown } from "@/components/layout/NavLanguageDropdown";

type NavLink = { href: string; label: string };

type LanguageLabels = {
  label: string;
  cs: string;
  en: string;
  csShort: string;
  enShort: string;
};

type NavbarProps = {
  links: NavLink[];
  menuLabel: string;
  closeMenuLabel: string;
  lang: string;
  languageLabels: LanguageLabels;
};

/**
 * Navbar — one-pager dark style.
 * - Desktop (≥md): centrované anchor odkazy, transparentní přes hero,
 *   po scrollu `bg-night/85 backdrop-blur` (čitelné nad bílými sekcemi).
 * - Mobil (<md): floating hamburger v kruhu vpravo nahoře (`bg-night/80 backdrop-blur`).
 * - Active anchor → žlutý underline (sledováno přes IntersectionObserver na sekcích).
 */
export function Navbar({
  links,
  menuLabel,
  closeMenuLabel,
  lang,
  languageLabels,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver pro highlight aktivní sekce
  useEffect(() => {
    const ids = links
      .map((l) => l.href.split("#")[1])
      .filter((id): id is string => Boolean(id));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveAnchor(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  const isActive = (href: string) => {
    const anchor = href.split("#")[1];
    return anchor === activeAnchor;
  };

  return (
    <>
      {/* DESKTOP: centered top bar */}
      <header
        className={`fixed inset-x-0 top-0 z-30 hidden transition-all md:block ${
          scrolled
            ? "bg-night/85 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "bg-gradient-to-b from-white/40 to-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-center">
          <nav className="flex items-center gap-8">
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-xs font-bold uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-1.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:bg-gold after:transition-[width] after:duration-200 ${
                    scrolled
                      ? active
                        ? "text-white after:w-6"
                        : "text-white/85 hover:text-white after:w-0 hover:after:w-6"
                      : active
                        ? "text-night after:w-6"
                        : "text-night/75 hover:text-night after:w-0 hover:after:w-6"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Language dropdown — nenápadně jako součást nav, vedle Kontaktu */}
            <NavLanguageDropdown
              lang={lang}
              scrolled={scrolled}
              labels={languageLabels}
            />
          </nav>
        </Container>
      </header>

      {/* MOBILE: floating hamburger kapsule */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        className="fixed right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-night/80 text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-md transition hover:bg-night/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <MobileMenuSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        links={links}
        menuLabel={menuLabel}
        closeMenuLabel={closeMenuLabel}
        lang={lang}
      />
    </>
  );
}
