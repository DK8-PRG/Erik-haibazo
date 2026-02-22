import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function AboutPreview() {
  return (
    <Section>
      <div className="grid items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 md:grid-cols-[220px_1fr]">
        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full sm:h-44 sm:w-44">
          <Image
            src="/images/erik-portrait.svg"
            alt="Erik Haibazo"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl leading-tight text-[#111111]">Ahoj, jsem Erik Haibazo</h2>
          <p className="max-w-2xl text-sm text-neutral-700 sm:text-base">
            Tvorim recepty a clanky, ktere maji jasny postup, dostupne suroviny a chut, ke ktere se chces vracet.
          </p>
          <Button href="/about">Vice o mne</Button>
        </div>
      </div>
    </Section>
  );
}
