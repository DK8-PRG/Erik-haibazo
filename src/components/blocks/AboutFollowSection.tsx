import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Erik_haibazo/shorts",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23 12.2c0 2.2-.3 4.4-.7 5.2-.4.9-1.1 1.5-1.9 1.9-1.6.7-8.4.7-8.4.7s-6.8 0-8.4-.7c-.8-.4-1.5-1-1.9-1.9C1.3 16.6 1 14.4 1 12.2s.3-4.4.7-5.2c.4-.9 1.1-1.5 1.9-1.9C5.2 4.4 12 4.4 12 4.4s6.8 0 8.4.7c.8.4 1.5 1 1.9 1.9.4.8.7 3 .7 5.2Zm-14 4.1 7-4.1-7-4.1v8.2Z"
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
          d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.9A3.9 3.9 0 0 0 3.9 7.8v8.4a3.9 3.9 0 0 0 3.9 3.9h8.4a3.9 3.9 0 0 0 3.9-3.9V7.8a3.9 3.9 0 0 0-3.9-3.9H7.8Zm9.1 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z"
        />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Erik-Haibazo-61576690652852/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 22v-8h2.7l.4-3h-3.1V9c0-.9.3-1.6 1.6-1.6h1.7V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.3V11H8v3h2.3v8h3.2Z"
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
          d="M14.7 3c.3 1.8 1.4 3.1 3 3.9.9.4 1.8.6 2.8.6v3.2c-1.3 0-2.7-.3-3.9-.9-.6-.3-1.2-.7-1.7-1.1v7.2a6 6 0 1 1-5.1-5.9v3.3a2.7 2.7 0 1 0 1.9 2.6V3h3Z"
        />
      </svg>
    ),
  },
];

export function AboutFollowSection() {
  return (
    <Section className="bg-[#F3F3F3] py-14 sm:py-18">
      <div className="overflow-hidden rounded-3xl border border-[#DCC28B]/55 bg-[linear-gradient(130deg,#F7DA82_0%,#F4CC6F_52%,#EEC160_100%)] shadow-[0_14px_28px_-24px_rgba(70,35,0,0.3)]">
        <div className="grid items-stretch md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/80 bg-white/75 p-1">
                <Image
                  src="/images/no-bg/erik-logo-no-bg.png"
                  alt="Erik Haibazo logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64400F]">
                Creator Brand
              </span>
            </div>

            <h2 className="max-w-xl text-[1.9rem] font-extrabold leading-[1.1] text-[#311C05] sm:text-[2.3rem] lg:text-[2.65rem]">
              Pojd varit se mnou. Prvni inspirace mas hned ted.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#53360A] sm:text-[1.05rem]">
              Jmenuju se Erik Haibazo a tvorim jednoduche recepty s asijskym
              twistem. Kazdy tyden nove video, tipy do kuchyne a poctive jidlo
              bez slozitosti.
            </p>
            <p className="mt-3 text-sm text-[#6A4512]">
              Spoluprace nebo dotaz? Napis mi do DM.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[#2B1702]/12 bg-white/58 px-3.5 py-2 text-sm font-medium text-[#2E1C06] transition hover:bg-white/78"
                >
                  <span className="h-4 w-4">{social.icon}</span>
                  {social.label}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-7 inline-flex rounded-xl bg-[#5A3510] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.05em] text-white shadow-[0_6px_14px_-10px_rgba(40,20,0,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#6A4013] hover:shadow-[0_14px_22px_-14px_rgba(40,20,0,0.9)] active:translate-y-0"
            >
              Vice o mne
            </Link>
          </div>

          <div className="relative min-h-[320px] border-t border-white/35 md:min-h-full md:border-l md:border-t-0">
            <Image
              src="/images/erik-photo.jpg"
              alt="Erik Haibazo portrait"
              fill
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(57,28,0,0.01)_0%,rgba(57,28,0,0.18)_100%)]" />
          </div>
        </div>
      </div>
    </Section>
  );
}
