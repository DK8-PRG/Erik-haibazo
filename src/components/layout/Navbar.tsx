"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MobileMenuSheet } from "@/components/layout/MobileMenuSheet";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

type NavLink = { href: string; label: string };

type NavbarProps = {
  links: NavLink[];
  menuLabel: string;
  closeMenuLabel: string;
  lang: string;
};

export function Navbar({
  links,
  menuLabel,
  closeMenuLabel,
  lang,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === `/${lang}`)
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-30 border-b border-neutral-200 transition-all ${
        scrolled ? "bg-white/85 shadow-sm backdrop-blur-md" : "bg-white"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href={`/${lang}`}>
          <BrandLogo className="text-lg" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-[#FFD23F] after:transition-[width] after:duration-200 ${
                isActive(item.href)
                  ? "font-semibold text-[#111111] after:w-full"
                  : "text-neutral-700 hover:text-[#111111] after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher lang={lang} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher lang={lang} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 transition hover:border-neutral-500"
            aria-label={menuLabel}
          >
            {menuLabel}
          </button>
        </div>
      </Container>

      <MobileMenuSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        links={links}
        menuLabel={menuLabel}
        closeMenuLabel={closeMenuLabel}
      />
    </header>
  );
}
