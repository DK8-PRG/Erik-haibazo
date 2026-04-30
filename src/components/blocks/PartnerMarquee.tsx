import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type {
  HomepagePartner,
  HomepagePartnersData,
} from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type PartnerMarqueeProps = {
  dict: Dictionary["partners"];
  data?: HomepagePartnersData;
};

// =============================================================================
// FALLBACK partneři — pokud Sanity ještě neobsahuje seznam.
// =============================================================================
const FALLBACK_PARTNERS: HomepagePartner[] = [
  { name: "Tescoma", logo: "/partners/tescoma.png" },
  { name: "Tefal", logo: "/partners/tefal.svg" },
  { name: "KitchenAid", logo: "/partners/kitchenaid.svg" },
  { name: "Rohlik", logo: "/partners/rohlik.svg" },
  { name: "Kosik", logo: "/partners/kosik.svg" },
];

// Replikujeme seznam tak, aby byl dostatečně široký pro plynulou smyčku
// i na ultrawide obrazovkách.
const REPEAT_COUNT = 8;

/**
 * "As Featured In" marquee — kontinuálně rolující řada partnerských log.
 * Mobile-first: na mobilu rychlejší (`animate-marquee-fast`),
 * na ≥md klasická rychlost (`animate-marquee`).
 *
 * Implementace: dvě kopie listu vedle sebe + `translateX(-50%)` v animaci →
 * iluze nekonečné smyčky bez JS.
 *
 * Respektuje `prefers-reduced-motion` (animace se zastaví).
 */
export function PartnerMarquee({ dict, data }: PartnerMarqueeProps) {
  const source =
    data?.partners && data.partners.length > 0
      ? data.partners
      : FALLBACK_PARTNERS;

  const marqueePartners = Array.from({ length: REPEAT_COUNT }).flatMap(
    () => source,
  );

  return (
    <section
      aria-label={dict.title}
      className="relative overflow-hidden border-y border-white/10 bg-[#17130d] py-10 text-white sm:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(105, 82, 10, 0.372),transparent_70%)]"
      />
      <Container>
        <p className="relative mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
          {dict.title}
        </p>
      </Container>

      <div
        className="group relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="presentation"
      >
        <div className="flex w-max animate-marquee-fast gap-10 [animation-duration:300s] motion-reduce:!animate-none sm:gap-14 md:animate-marquee md:gap-16 md:[animation-duration:300s] group-hover:[animation-play-state:paused]">
          {marqueePartners.map((partner, idx) => {
            const tile = (
              <div className="flex h-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.60] px-5 ring-1 ring-white/16 backdrop-blur-sm sm:px-6">
                <Image
                  src={partner.logo}
                  alt={partner.logoAlt ?? partner.name}
                  width={150}
                  height={40}
                  className="h-7 w-auto max-w-[120px] object-contain opacity-100 sm:h-8 sm:max-w-[140px]"
                />
              </div>
            );

            return (
              <div key={`${partner.name}-${idx}`} className="shrink-0">
                {partner.url ? (
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partner.name}
                  >
                    {tile}
                  </Link>
                ) : (
                  tile
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
