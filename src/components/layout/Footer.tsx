import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { HomepageFooterData } from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type FooterProps = {
  dict: Dictionary["footer"];
  lang: string;
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

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  facebook: "Facebook",
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const cls = "h-5 w-5";
  switch (platform) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 1 1.6c.2.5.4 1.2.5 2.4 0 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.5.2-1.2.4-2.4.5-1.2 0-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.2-.5-.4-1.2-.5-2.4 0-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 5.4a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.6 6.6a4.9 4.9 0 0 1-3.5-3.4V3h-3.4v13.2a2.6 2.6 0 1 1-1.9-2.5v-3.4a6 6 0 1 0 5.3 6V9.5a8.3 8.3 0 0 0 4.8 1.5V7.6a4.9 4.9 0 0 1-1.3-1Z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export function Footer({ dict, lang: _lang, data }: FooterProps) {
  const heading = data?.footerHeading ?? dict.heading;
  const email = data?.footerEmail ?? "erik.haibazo@gmail.com";
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

          {/* Sociály */}
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {socials.map((s) => (
              <li key={s.platform}>
                <Link
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={PLATFORM_LABEL[s.platform] ?? s.platform}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-gold hover:text-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                >
                  <SocialIcon platform={s.platform} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Spodní pruh — copyright */}
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50 sm:text-sm">
          {copyright}
        </div>
      </Container>
    </footer>
  );
}
