import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const t = dict.contactPage;

  return (
    <Section title={t.title} description={t.description}>
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Email karta */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {t.writeMe}
          </p>
          <a
            href="mailto:Erik.haibazo@gmail.com"
            className="mt-3 block text-2xl font-semibold text-neutral-900 underline-offset-4 hover:underline sm:text-3xl"
          >
            Erik.haibazo@gmail.com
          </a>
          <p className="mt-2 text-sm text-neutral-500">{t.writeMeNote}</p>
        </div>

        {/* Sociální sítě */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {t.followTitle}
          </p>
          <p className="mt-2 mb-5 text-sm text-neutral-500">{t.followNote}</p>
          <SocialLinks />
        </div>

        {/* Spolupráce */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {t.collab}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {t.collabNote}
          </p>
        </div>
      </div>
    </Section>
  );
}
