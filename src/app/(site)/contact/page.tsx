import { Section } from "@/components/ui/Section";

export default function ContactPage() {
  return (
    <Section title="Kontakt" description="Pro spoluprace, dotazy a media requesty.">
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-700">
        <p className="text-sm text-neutral-600">Napis mi na:</p>
        <a href="mailto:hello@haibazo.com" className="mt-2 block text-lg font-semibold text-neutral-900">
          hello@haibazo.com
        </a>
        <p className="mt-6 text-sm text-neutral-600">Nebo sleduj HAIBAZO na Instagramu a YouTube.</p>
      </div>
    </Section>
  );
}
