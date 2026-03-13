import { Section } from "@/components/ui/Section";

export default function AboutPage() {
  return (
    <Section title="O mne" description="HAIBAZO je osobni food magazin s durazem na jednoduchost a kvalitu.">
      <div className="mx-auto max-w-3xl space-y-4 text-neutral-700">
        <p>
          Sdilim recepty a clanky, ktere propojuji street food inspiraci s realitou domaci kuchyne. Cilem je chut,
          kterou zvladnes zopakovat i behem pracovniho tydne.
        </p>
        <p>
          Tenhle web je pripraveny komponentove, mobile-first a s mock daty tak, aby sel snadno napojit na CMS bez
          velkeho refaktoru.
        </p>
      </div>
    </Section>
  );
}
