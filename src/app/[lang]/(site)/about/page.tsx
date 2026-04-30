import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getAboutPage } from "@/lib/sanity/queries";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const FALLBACK_PHOTO = "/materials/haibazo.png";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const data = await getAboutPage();

  const title = data?.title ?? dict.aboutPage.title;
  const description = dict.aboutPage.description;
  const photo = data?.photo ?? FALLBACK_PHOTO;
  const photoAlt = data?.photoAlt ?? "Erik Haibazo";

  return (
    <Section title={title} description={description}>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          {/* Foto */}
          <div className="mx-auto flex-shrink-0 md:mx-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src={photo}
                alt={photoAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio + kontakt */}
          <div className="flex flex-col gap-6">
            {data?.bio && data.bio.length > 0 ? (
              <div className="space-y-4 text-base leading-relaxed text-neutral-700 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-neutral-900 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-neutral-900">
                <PortableText value={data.bio} />
              </div>
            ) : (
              <div className="space-y-4 text-base leading-relaxed text-neutral-700">
                <p>{dict.aboutPage.paragraph1}</p>
                <p>{dict.aboutPage.paragraph2}</p>
                <p>{dict.aboutPage.paragraph3}</p>
              </div>
            )}

            <div className="space-y-4 border-t border-neutral-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                {dict.aboutPage.contactLabel}
              </p>
              <a
                href={`mailto:${dict.aboutPage.email}`}
                className="block text-base font-medium text-neutral-900 hover:underline"
              >
                {dict.aboutPage.email}
              </a>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
