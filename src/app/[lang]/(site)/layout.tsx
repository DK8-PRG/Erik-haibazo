import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/recipes`, label: dict.nav.recipes },
    { href: `/${lang}/magazine`, label: dict.nav.magazine },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <Navbar
        links={navLinks}
        menuLabel={dict.nav.menu}
        closeMenuLabel={dict.nav.closeMenu}
        lang={lang}
      />
      <main>{children}</main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
