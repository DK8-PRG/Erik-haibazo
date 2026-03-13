"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string };

type MobileMenuSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  menuLabel: string;
  closeMenuLabel: string;
};

export function MobileMenuSheet({
  isOpen,
  onClose,
  links,
  menuLabel,
  closeMenuLabel,
}: MobileMenuSheetProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === pathname) return true;
    return pathname.startsWith(`${href}/`);
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
        aria-label={closeMenuLabel}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-10 text-lg font-semibold">{menuLabel}</div>
        <nav className="space-y-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`block border-l-2 pl-3 text-base transition-all ${
                isActive(link.href)
                  ? "border-[#FFD23F] font-semibold text-neutral-950"
                  : "border-transparent text-neutral-600 hover:border-[#FFD23F] hover:text-neutral-950"
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
