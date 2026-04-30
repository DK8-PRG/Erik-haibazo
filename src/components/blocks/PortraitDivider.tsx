import Image from "next/image";

type PortraitDividerProps = {
  src?: string;
  alt?: string;
};

// =============================================================================
// PortraitDivider — full-width foto mezi sekcí #kucharka a #o-mne.
//   - Když není src, sekce se nerendruje (volitelný divider).
//   - Mobile: ~50vh (max 480px), Desktop: ~70vh (max 720px).
//   - DARK splývání nahoře i dole pomocí gradientů.
// =============================================================================
export function PortraitDivider({ src, alt }: PortraitDividerProps) {
  if (!src) return null;

  return (
    <section
      aria-hidden={alt ? undefined : true}
      className="relative isolate overflow-hidden bg-night"
    >
      <div className="relative h-[50vh] max-h-[480px] min-h-[280px] w-full md:h-[70vh] md:max-h-[720px]">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Splývání s tmavou další sekcí — nahoře i dole. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night-2 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent"
        />
      </div>
    </section>
  );
}
