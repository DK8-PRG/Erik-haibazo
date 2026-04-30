import { ReactNode } from "react";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getSiteSettings } from "@/lib/sanity/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://erikhaibazo.cz";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const [dict, settings] = await Promise.all([
    getDictionary(lang as Locale),
    getSiteSettings(),
  ]);

  const siteName = settings?.siteName ?? "Erik Haibazo";
  const description = settings?.seoDescription ?? dict.meta.siteDescription;
  const ogImage = settings?.ogImage?.asset?.url;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteName,
      template: `%s — ${siteName}`,
    },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        cs: "/cs",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName,
      title: siteName,
      description,
      url: `${SITE_URL}/${lang}`,
      locale: lang === "cs" ? "cs_CZ" : "en_US",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <div lang={lang}>{children}</div>;
}
