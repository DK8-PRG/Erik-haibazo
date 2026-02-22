"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MobileMenuSheet } from "@/components/layout/MobileMenuSheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recepty" },
  { href: "/magazine", label: "Magazin" },
  { href: "/about", label: "O mne" },
  { href: "/contact", label: "Kontakt" },
  { href: "/admin", label: "Admin" }
];

export function Navbar() {
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
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-30 border-b border-neutral-200 transition-all ${
        scrolled ? "bg-white/85 shadow-sm backdrop-blur-md" : "bg-white"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <BrandLogo className="text-lg" />

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition ${
                isActive(item.href)
                  ? "font-semibold text-[#111111]"
                  : "text-neutral-700 hover:text-[#111111]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 transition hover:border-neutral-500 md:hidden"
          aria-label="Open menu"
        >
          Menu
        </button>
      </Container>

      <MobileMenuSheet isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
