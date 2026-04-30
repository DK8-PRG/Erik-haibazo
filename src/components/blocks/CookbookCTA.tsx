import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/blocks/NewsletterForm";
import type { HomepageCookbookData } from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type CookbookCTAProps = {
  data: HomepageCookbookData;
  dict: Dictionary["cookbookSection"];
  locale: string;
};

// =============================================================================
// FALLBACK feature body (4×) — když v Sanity ještě nejsou.
// =============================================================================
const FALLBACK_FEATURES = [
  { icon: "🥢", label: "Autentické recepty" },
  { icon: "📖", label: "Krok za krokem" },
  { icon: "🇻🇳", label: "Z Vietnamu do tvé kuchyně" },
  { icon: "💛", label: "Limitovaná edice" },
];

// Rozdělí nadpis tak, aby závorka `(...)` byla na vlastním nezalomitelném řádku.
// Např. "MOJE KUCHAŘKA (JIŽ BRZY VENKU)" → ["MOJE KUCHAŘKA", "(JIŽ BRZY VENKU)"].
function renderHeading(heading: string) {
  const match = heading.match(/^(.*?)\s*(\([^)]*\))\s*$/);
  if (!match) return heading;
  const [, before, paren] = match;
  return (
    <>
      <span className="whitespace-nowrap">{before}</span>
      <br />
      <span className="whitespace-nowrap">{paren}</span>
    </>
  );
}

// =============================================================================
// CookbookCTA — sekce #kucharka
//   - DARK pozadí (bg-night) s dekorativní bg fotkou (bg-big.png)
//   - 2 sloupce na ≥md: mockup vlevo / text + form + features vpravo
//   - 1 sloupec na mobilu: mockup → text → form → features grid 2×2
// =============================================================================
export function CookbookCTA({ data, dict, locale }: CookbookCTAProps) {
  const heading = data?.cookbookHeading ?? dict.heading;
  const subheading = data?.cookbookSubheading ?? dict.subheading;
  const ctaLabel = data?.cookbookCTALabel ?? dict.ctaLabel;
  const mockup = data?.cookbookMockup;
  const mockupAlt = data?.cookbookMockupAlt ?? heading;
  const features =
    data?.cookbookFeatures && data.cookbookFeatures.length > 0
      ? data.cookbookFeatures
      : FALLBACK_FEATURES;

  return (
    <section
      id="kucharka"
      className="relative scroll-mt-16 overflow-hidden bg-night py-16 text-white sm:py-20 md:py-28"
    >
      {/* Dekorativní bg fotka — responsivní (mobil → tablet → desktop) */}
      <picture aria-hidden className="pointer-events-none absolute inset-0">
        <source media="(min-width: 1024px)" srcSet="/images/new/bg-big.png" />
        <source media="(min-width: 640px)" srcSet="/images/new/bg-mid.png" />
        <img
          src="/images/new/bg-mobil.png"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </picture>
      {/* Tmavý overlay pro čitelnost textu */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/80 via-night/70 to-night/90"
      />
      {/* Decorative gold blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* ─── Mockup knihy ─────────────────────────────────────────── */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm md:max-w-md">
            <Image
              src={mockup ?? "/images/new/cookbook.png"}
              alt={mockupAlt}
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-contain drop-shadow-[0_20px_60px_rgba(255,201,39,0.25)]"
            />
          </div>

          {/* ─── Text + form + features ───────────────────────────────── */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              {renderHeading(heading)}
            </h2>

            <div className="mt-4 h-1 w-12 bg-gold sm:w-16" aria-hidden />

            {subheading ? (
              <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                {subheading}
              </p>
            ) : null}

            <div className="mt-6 sm:mt-8">
              <NewsletterForm
                ctaLabel={ctaLabel}
                placeholder={dict.placeholder}
                locale={locale}
                successMsg={dict.success}
                alreadyMsg={dict.already}
                invalidMsg={dict.invalid}
                errorMsg={dict.error}
              />
              <p className="mt-3 text-xs text-white/50">{dict.privacy}</p>
            </div>

            {/* Features grid 2×2 mobil / 4× řada ≥md */}
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-4">
              {features.map((f, idx) => (
                <li
                  key={`${f.label}-${idx}`}
                  className="flex flex-col items-start gap-2 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  {f.icon ? (
                    <span className="text-2xl" aria-hidden>
                      {f.icon}
                    </span>
                  ) : null}
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
