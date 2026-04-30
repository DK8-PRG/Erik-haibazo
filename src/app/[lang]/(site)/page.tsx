import { AboutLong } from "@/components/blocks/AboutLong";
import { CookbookCTA } from "@/components/blocks/CookbookCTA";
import { IntroHero } from "@/components/blocks/IntroHero";
import { LatestVideo } from "@/components/blocks/LatestVideo";
import { PartnerMarquee } from "@/components/blocks/PartnerMarquee";
import { PortraitDivider } from "@/components/blocks/PortraitDivider";
import { ScrollResetOnLoad } from "@/components/layout/ScrollResetOnLoad";
import {
  getHomepageHero,
  getHomepageVideos,
  getHomepageCookbook,
  getHomepageAboutLong,
  getHomepagePartners,
} from "@/lib/sanity/queries";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  // Magazine + Recipes jsou prozatím skryté (mimo MVP one-pageru). URL fungují,
  // ale na homepage se nezobrazují — viz _docs/09-redesign-proposal.md §10.
  const [hero, videos, cookbook, aboutLong, partners] = await Promise.all([
    getHomepageHero(lang),
    getHomepageVideos(lang),
    getHomepageCookbook(lang),
    getHomepageAboutLong(lang),
    getHomepagePartners(),
  ]);

  return (
    <>
      <ScrollResetOnLoad />
      <IntroHero dict={dict.intro} data={hero} />

      <LatestVideo data={videos} dict={dict.videosSection} />

      <CookbookCTA data={cookbook} dict={dict.cookbookSection} locale={lang} />

      <PortraitDivider
        src={aboutLong?.portraitDivider}
        alt={aboutLong?.portraitDividerAlt}
      />

      <AboutLong data={aboutLong} dict={dict.aboutLongSection} />

      {/* As Featured In — partneři poslední sekce před footerem */}
      <PartnerMarquee dict={dict.partners} data={partners} />
    </>
  );
}
