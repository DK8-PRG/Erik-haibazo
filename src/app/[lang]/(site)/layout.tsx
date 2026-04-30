import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getHomepageFooter } from "@/lib/sanity/queries";
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
  const footerData = await getHomepageFooter(lang);

  // One-pager: anchor scrolls (mimo `home`, který vede na samotnou homepage URL)
  const navLinks = [
    { href: `/${lang}#hero`, label: dict.nav.home },
    { href: `/${lang}#videa`, label: dict.nav.recipes },
    { href: `/${lang}#kucharka`, label: dict.nav.magazine },
    { href: `/${lang}#o-mne`, label: dict.nav.about },
    { href: `/${lang}#kontakt`, label: dict.nav.contact },
  ];

  return (
    <>
      <Navbar
        links={navLinks}
        menuLabel={dict.nav.menu}
        closeMenuLabel={dict.nav.closeMenu}
        lang={lang}
        languageLabels={dict.languageSwitcher}
      />
      <main>{children}</main>
      <Footer dict={dict.footer} data={footerData} />
    </>
  );
}
