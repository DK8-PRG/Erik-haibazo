import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/ui/Mascot";
import { SocialIcon, SOCIAL_PLATFORM_LABEL } from "@/components/ui/SocialIcon";
import type { HomepageHeroData } from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type IntroHeroProps = {
  dict: Dictionary["intro"];
  data?: HomepageHeroData;
};

// =============================================================================
// FALLBACK sociální sítě — když Sanity neobsahuje `footerSocials`.
// =============================================================================
const FALLBACK_SOCIALS = [
  {
    platform: "facebook" as const,
    url: "https://www.facebook.com/p/Erik-Haibazo-61576690652852/",
  },
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/erik.haibazo/",
  },
  {
    platform: "youtube" as const,
    url: "https://www.youtube.com/@Erik_haibazo/shorts",
  },
  { platform: "tiktok" as const, url: "https://www.tiktok.com/@erik.haibazo" },
];

const FALLBACK_HERO_IMAGE = "/images/new/DSC01115.jpg";

// =============================================================================
// IntroHero — full-bleed foto Erika + text umístěný vpravo (kam ukazuje prstem).
// -----------------------------------------------------------------------------
//   - Foto Erika je full-bleed pozadí (object-cover, object-center).
//   - Text je pozicovaný uvnitř max-w-7xl containeru, drží se vpravo.
//   - Maskot sedí na spodní hraně sekce vpravo.
//   - Žádné hover efekty / stíny.
// =============================================================================
export function IntroHero({ dict, data }: IntroHeroProps) {
  const heroImage = data?.heroImage ?? FALLBACK_HERO_IMAGE;
  const heroImageAlt = data?.heroImageAlt ?? "Erik Haibazo";
  // Nadpis je vždy "Erik Haibazo" (značka). `heroTitle` ze Sanity je
  // vyhrazen pro SEO meta-title, ne pro hero display.
  const name = dict.name;
  const lead = data?.heroSubtitle ?? dict.lead;
  const email = data?.footerEmail ?? dict.email;
  const socials =
    data?.footerSocials && data.footerSocials.length > 0
      ? data.footerSocials
      : FALLBACK_SOCIALS;

  return (
    <section
      id="hero"
      className="relative isolate z-10 scroll-mt-16 bg-transparent text-night"
    >
      <div className="relative h-[110svh] min-h-[680px] w-full">
        {/* Foto Erika — full-bleed pozadí. */}
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          quality={100}
          unoptimized
          className="object-cover object-center"
        />

        {/* Overlay s textem a maskotem — drží se uvnitř max-w-7xl containeru. */}
        <div className="absolute inset-0">
          <div className="relative mx-auto h-full w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:px-14">
            {/* Text vpravo — kam Erik ukazuje prstem. */}
            <div className="absolute right-2 top-[33%]  w-[48%] max-w-md sm:right-8 sm:top-[30%] sm:w-[40%] md:right-10 md:top-[30%] md:w-[40%] lg:right-14 lg:top-[30%] lg:w-[40%] lg:max-w-lg">
              {/* NADPIS. */}
              <h1 className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-night sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {name.split(" ").map((word, i) => (
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
                {lead}
              </p>

              {/* SPOLUPRÁCE + SOCIÁLY. */}
              <div className="mt-2 sm:mt-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-night/70 sm:text-[11px]">
                  {dict.collabLabel}:{" "}
                  <Link
                    href={`mailto:${email}`}
                    className="font-normal normal-case tracking-normal text-night"
                  >
                    {email}
                  </Link>
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
                  {socials.map((social) => (
                    <Link
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        SOCIAL_PLATFORM_LABEL[social.platform] ??
                        social.platform
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-night/10 bg-white/80 text-night backdrop-blur-[2px] sm:h-11 sm:w-11"
                    >
                      <SocialIcon platform={social.platform} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maskot — sedí na hraně sekce Nejnovější video. */}
      <div className="pointer-events-none absolute bottom-0 sm:bottom-1 md:bottom-1 lg:bottom-2 left-[75%] z-40 -translate-x-1/2 translate-y-[34%]">
        <Mascot
          alt="HAIBAZO maskot"
          className="block h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
        />
      </div>
    </section>
  );
}
