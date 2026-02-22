import Image from "next/image";
import { Section } from "@/components/ui/Section";

const partners = [
  { name: "Tescoma", src: "/partners/tescoma.png", code: "ERIKTES10" },
  { name: "Tefal", src: "/partners/tefal.svg", code: "ERIKTEFAL10" },
  { name: "KitchenAid", src: "/partners/kitchenaid.svg", code: "ERIKKITCH10" },
  { name: "Rohlik", src: "/partners/rohlik.svg", code: "ERIKROHLIK10" },
  { name: "Kosik", src: "/partners/kosik.svg", code: "ERIKKOSIK10" }
];

export function PartnerLogosRow() {
  return (
    <Section className="py-9 sm:py-10">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">As Featured In</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner) => (
          <div key={partner.name} className="text-center">
            <div className="flex h-12 items-center justify-center">
              <Image
                src={partner.src}
                alt={partner.name}
                width={150}
                height={32}
                className="h-7 w-auto max-w-[132px] object-contain opacity-75 grayscale"
              />
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-700">{partner.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-neutral-500">{partner.code}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
