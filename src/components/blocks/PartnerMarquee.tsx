import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type PartnerMarqueeProps = {
  dict: Dictionary["partners"];
};

const partners = [
  { name: "Tescoma", src: "/partners/tescoma.png" },
  { name: "Tefal", src: "/partners/tefal.svg" },
  { name: "KitchenAid", src: "/partners/kitchenaid.svg" },
  { name: "Rohlik", src: "/partners/rohlik.svg" },
  { name: "Kosik", src: "/partners/kosik.svg" },
];

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
export function PartnerMarquee({ dict }: PartnerMarqueeProps) {
  return (
    <section
      aria-label={dict.title}
      className="border-y border-neutral-200 bg-white py-10 sm:py-12"
    >
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {dict.title}
        </p>
      </Container>

      <div
        className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        role="presentation"
      >
        <div className="flex w-max animate-marquee-fast gap-12 motion-reduce:!animate-none sm:gap-16 md:animate-marquee md:gap-20 group-hover:[animation-play-state:paused]">
          {[...partners, ...partners, ...partners, ...partners].map(
            (partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex h-12 shrink-0 items-center justify-center"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={150}
                  height={40}
                  className="h-8 w-auto max-w-[140px] object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
