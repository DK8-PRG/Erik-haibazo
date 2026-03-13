import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <Section
      title={dict.contactPage.title}
      description={dict.contactPage.description}
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-700">
        <p className="text-sm text-neutral-600">{dict.contactPage.writeMe}</p>
        <a
          href="mailto:hello@haibazo.com"
          className="mt-2 block text-lg font-semibold text-neutral-900"
        >
          hello@haibazo.com
        </a>
        <p className="mt-6 text-sm text-neutral-600">
          {dict.contactPage.followNote}
        </p>
      </div>
    </Section>
  );
}
