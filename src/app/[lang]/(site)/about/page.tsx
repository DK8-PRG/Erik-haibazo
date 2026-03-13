import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <Section
      title={dict.aboutPage.title}
      description={dict.aboutPage.description}
    >
      <div className="mx-auto max-w-3xl space-y-4 text-neutral-700">
        <p>{dict.aboutPage.paragraph1}</p>
        <p>{dict.aboutPage.paragraph2}</p>
      </div>
    </Section>
  );
}
