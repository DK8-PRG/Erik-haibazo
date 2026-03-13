import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type HeroProps = {
  dict: Dictionary["hero"];
  lang: string;
};

export function Hero({ dict, lang }: HeroProps) {
  return (
    <section className="relative">
      <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <Image
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=80"
          alt="Hero food"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/88 via-white/28 to-transparent" />
        <Container className="absolute inset-x-0 bottom-8 sm:bottom-10">
          <div className="max-w-xl rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur-sm sm:p-7">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
              {dict.badge}
            </p>
            <h1 className="mt-3 text-3xl leading-tight sm:text-5xl">
              {dict.title}
            </h1>
            <p className="mt-3 text-sm text-neutral-700 sm:text-base">
              {dict.description}
            </p>
            <div className="mt-5">
              <Button href={`/${lang}/recipes`}>{dict.cta}</Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
