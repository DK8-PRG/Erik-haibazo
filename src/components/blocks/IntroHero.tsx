import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/ui/Mascot";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type IntroHeroProps = {
  dict: Dictionary["intro"];
};

// =============================================================================
// SOCIÁLNÍ ODKAZY
// =============================================================================
const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Erik-Haibazo-61576690652852/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/erik.haibazo/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 1 1.6c.2.5.4 1.2.5 2.4 0 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.5.2-1.2.4-2.4.5-1.2 0-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.2-.5-.4-1.2-.5-2.4 0-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 5.4a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Erik_haibazo/shorts",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
        />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@erik.haibazo",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.6 6.6a4.9 4.9 0 0 1-3.5-3.4V3h-3.4v13.2a2.6 2.6 0 1 1-1.9-2.5v-3.4a6 6 0 1 0 5.3 6V9.5a8.3 8.3 0 0 0 4.8 1.5V7.6a4.9 4.9 0 0 1-1.3-1Z"
        />
      </svg>
    ),
  },
];

// =============================================================================
// IntroHero — full-bleed foto Erika + text umístěný vpravo (kam ukazuje prstem).
// -----------------------------------------------------------------------------
//   - Foto Erika je full-bleed pozadí (object-cover, object-center).
//   - Text je pozicovaný uvnitř max-w-7xl containeru, drží se vpravo.
//   - Maskot sedí na spodní hraně sekce vpravo.
//   - Žádné hover efekty / stíny.
// =============================================================================
export function IntroHero({ dict }: IntroHeroProps) {
  return (
    <section
      id="hero"
      className="relative isolate scroll-mt-16 bg-transparent text-night"
    >
      <div className="relative h-[110svh] min-h-[680px] w-full">
        {/* Foto Erika — full-bleed pozadí. */}
        <Image
          src="/images/new/DSC01115.jpg"
          alt="Erik Haibazo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay s textem a maskotem — drží se uvnitř max-w-7xl containeru. */}
        <div className="absolute inset-0">
          <div className="relative mx-auto h-full w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:px-14">
            {/* Text vpravo — kam Erik ukazuje prstem. */}
            <div className="absolute right-0 top-[35%] w-[52%] max-w-md sm:right-8 sm:top-[22%] sm:w-[50%] md:right-10 md:top-[26%] md:w-[45%] lg:right-14 lg:top-[28%] lg:w-[40%] lg:max-w-lg">
              {/* NADPIS — ERIK / HAIBAZO. */}
              <h1 className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-night sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {dict.name.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>

              {/* Zlatý divider. */}
              <div
                className="mt-3 h-1 w-10 bg-gold sm:mt-5 sm:w-16"
                aria-hidden
              />

              {/* LEAD. */}
              <p className="mt-2 text-xs font-medium leading-relaxed text-night/80 sm:mt-5 sm:text-base md:text-lg">
                {dict.lead}
              </p>

              {/* SPOLUPRÁCE + SOCIÁLY. */}
              <div className="mt-2 sm:mt-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-night/70 sm:text-[11px]">
                  {dict.collabLabel}:{" "}
                  <Link
                    href={`mailto:${dict.email}`}
                    className="font-normal normal-case tracking-normal text-night"
                  >
                    {dict.email}
                  </Link>
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-night/10 bg-white/80 text-night backdrop-blur-[2px] sm:h-11 sm:w-11"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Maskot — přesahuje do další sekce (mimo clipping kontejner). */}
          </div>
        </div>
      </div>

      {/* Maskot — mimo h-[100svh] div, takže může přesahovat dolů. */}
      <div className="pointer-events-none absolute bottom-4 right-2 z-40 translate-y-1/2 sm:right-8 md:right-10 lg:right-14">
        <Mascot
          alt="HAIBAZO maskot"
          className="block h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
        />
      </div>
    </section>
  );
}
