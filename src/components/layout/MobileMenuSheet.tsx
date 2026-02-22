"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type MobileMenuSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recepty" },
  { href: "/magazine", label: "Magazin" },
  { href: "/about", label: "O mne" },
  { href: "/contact", label: "Kontakt" },
  { href: "/admin", label: "Admin" }
];

export function MobileMenuSheet({ isOpen, onClose }: MobileMenuSheetProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-neutral-200/60 transition ${isOpen ? "opacity-100" : "opacity-0"}`}
        aria-label="Zavrit menu"
      />
      <aside
        className={`absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-10 text-lg font-semibold">Menu</div>
        <nav className="space-y-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`block text-base transition ${
                isActive(link.href)
                  ? "font-semibold text-neutral-950"
                  : "text-neutral-800 hover:text-neutral-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
