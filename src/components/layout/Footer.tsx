import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialIcon, SOCIAL_PLATFORM_LABEL } from "@/components/ui/SocialIcon";
import type { HomepageFooterData } from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type FooterProps = {
  dict: Dictionary["footer"];
  data?: HomepageFooterData;
};

// =============================================================================
// FALLBACK sociální sítě — když Sanity neobsahuje `footerSocials`.
// =============================================================================
const FALLBACK_SOCIALS = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/erik.haibazo/",
  },
  {
    platform: "youtube" as const,
    url: "https://www.youtube.com/@Erik_haibazo/shorts",
  },
  { platform: "tiktok" as const, url: "https://www.tiktok.com/@erik.haibazo" },
  {
    platform: "facebook" as const,
    url: "https://www.facebook.com/p/Erik-Haibazo-61576690652852/",
  },
];

export function Footer({ dict, data }: FooterProps) {
  const heading = data?.footerHeading ?? dict.heading;
  const email = data?.footerEmail ?? "erik.haibazo@gmail.com";
  const developerEmail = "duongk.hoang@gmail.com";
  const socials =
    data?.footerSocials && data.footerSocials.length > 0
      ? data.footerSocials
      : FALLBACK_SOCIALS;
  const copyright =
    data?.footerCopyright ?? `© ${new Date().getFullYear()} Erik Haibazo`;

  return (
    <footer id="kontakt" className="relative scroll-mt-16 bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <Container>
        <div className="flex flex-col items-center gap-10 py-16 text-center sm:py-20 md:py-24">
          {/* Nadpis */}
          <h2 className="text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <div className="h-1 w-12 bg-gold sm:w-16" aria-hidden />

          {/* Email */}
          <Link
            href={`mailto:${email}`}
            className="text-lg font-medium text-white transition hover:text-gold sm:text-xl md:text-2xl"
          >
            {email}
          </Link>

          <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {dict.collabNote}
          </p>

          {/* Sociály */}
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {socials.map((s) => (
              <li key={s.platform}>
                <Link
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={SOCIAL_PLATFORM_LABEL[s.platform] ?? s.platform}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-gold hover:text-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                >
                  <SocialIcon platform={s.platform} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Spodní pruh — copyright */}
        <div className="border-t border-white/10 py-6 text-center sm:text-sm">
          <p className="text-sm font-medium text-white/80 sm:text-base">
            {copyright}
          </p>
          <p className="mt-2 text-[11px] text-white/45 sm:text-xs">
            {dict.webCreditLabel} • {dict.webCreditCta}{" "}
            <Link
              href={`mailto:${developerEmail}`}
              className="text-white/60 transition hover:text-gold"
            >
              {developerEmail}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
