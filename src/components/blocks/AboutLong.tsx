import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import type { HomepageAboutLongData } from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type AboutLongProps = {
  data: HomepageAboutLongData;
  dict: Dictionary["aboutLongSection"];
};

// =============================================================================
// FALLBACK obsah (když Sanity nemá data) — krátký bio z `dict.aboutPage`.
// =============================================================================
const FALLBACK_PARAGRAPHS = [
  "Xin chào, jsem Erik – právník, který miluje vaření. Narodil jsem se ve Vietnamu, ale většinu života žiju v Česku. Jídlo mě provází od dětství a naučilo mě, že vaření je víc než jen o chuti.",
  "Vaření mě učí trpělivosti, pokoře i radosti z maličkostí. Je to hra i meditace, dětská radost i dospělá láska. Hledám v něm rovnováhu – mezi Asií a Evropou, tradicí a novotou, mezi sladkým a slaným.",
  "Nejvíc mě naplňuje, když můžu jídlo sdílet s ostatními, protože právě tehdy má život chuť.",
];

// =============================================================================
// PortableText komponenty — dark verze (světlý text, gold akcenty).
// =============================================================================
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-white/85 sm:text-lg last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mb-2 mt-5 text-lg font-bold text-white sm:text-xl">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-gold pl-4 text-lg italic text-white/90">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold underline-offset-2 transition hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-5 list-disc space-y-2 text-white/85">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-5 list-decimal space-y-2 text-white/85">
        {children}
      </ol>
    ),
  },
};

// =============================================================================
// AboutLong — sekce #o-mne. 2 sloupce (foto vlevo / text vpravo) na ≥md.
// =============================================================================
export function AboutLong({ data, dict }: AboutLongProps) {
  const heading = data?.aboutLongHeading ?? dict.heading;
  const portrait = data?.aboutLongPortrait;
  const portraitAlt = data?.aboutLongPortraitAlt ?? heading;
  const email = data?.aboutLongEmail;
  const body = data?.aboutLongBody;

  return (
    <section
      id="o-mne"
      className="relative scroll-mt-16 bg-night py-16 text-white sm:py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          {/* ─── Portrét — celý Erik (object-contain, zarovnáno dolů) ── */}
          <div className="order-2 relative mx-auto aspect-[3/4] w-full max-w-md md:order-1 md:max-w-none md:h-[640px] lg:h-[720px]">
            <Image
              src={portrait ?? "/images/new/DSC00927.jpg"}
              alt={portraitAlt}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-contain"
              priority={false}
            />
          </div>

          {/* ─── Text + email ───────────────────────────────────────── */}
          <div className="order-1 max-w-prose md:order-2">
            <h2 className="text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              {heading}
            </h2>
            <div className="mt-4 h-1 w-12 bg-gold sm:w-16" aria-hidden />

            <div className="mt-6 sm:mt-8">
              {body && body.length > 0 ? (
                <PortableText
                  value={body}
                  components={portableTextComponents}
                />
              ) : (
                FALLBACK_PARAGRAPHS.map((p, i) => (
                  <p
                    key={i}
                    className="mb-4 text-base leading-relaxed text-white/85 last:mb-0 sm:text-lg"
                  >
                    {p}
                  </p>
                ))
              )}
            </div>

            {email ? (
              <p className="mt-8 text-sm uppercase tracking-[0.18em] text-white/70">
                {dict.contactLabel}:{" "}
                <Link
                  href={`mailto:${email}`}
                  className="font-normal normal-case tracking-normal text-gold transition hover:text-white"
                >
                  {email}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
