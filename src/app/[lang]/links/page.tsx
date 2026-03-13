import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLinktree } from "@/lib/sanity/queries";

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaSpotify,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

export const metadata: Metadata = {
  title: "Erik Haibazo — Odkazy",
  description: "Všechny odkazy na jednom místě.",
};

const ICON_MAP: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  spotify: FaSpotify,
  email: FaEnvelope,
  web: FaGlobe,
  twitter: FaXTwitter,
};

type LinksPageProps = {
  params: Promise<{ lang: string }>;
};

export default async function LinksPage({ params }: LinksPageProps) {
  const { lang } = await params;
  const data = await getLinktree();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFDF40]">
        <p className="font-body text-brand-black">Načítám...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#FFDF40]">
      {/* Obsah */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-4 pt-10 pb-6">
        {/* Logo */}
        <div className="mb-8">
          <Link
            href={`/${lang}`}
            aria-label="Přejít na domovskou stránku"
            className="inline-block transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            <Image
              src="/materials/logo.svg"
              alt="Erik Haibazo"
              width={200}
              height={120}
              className="h-auto w-48"
              priority
            />
          </Link>
        </div>

        {/* Odkazy */}
        <div className="flex w-full max-w-sm flex-col items-center">
          {data.links?.map((link, i) => {
            const Icon = link.icon ? ICON_MAP[link.icon] : null;
            const isLast = i === (data.links?.length ?? 0) - 1;
            return (
              <div key={i} className="flex w-full flex-col items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-center font-body font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    link.featured
                      ? "bg-brand-black text-brand-yellow"
                      : "bg-white text-brand-black"
                  }`}
                >
                  {Icon && <Icon size={18} />}
                  {link.label}
                </a>
                {!isLast && (
                  <span className="my-1 text-xl text-brand-black/30">↓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {data.footerText && (
        <div className="relative z-20 px-4 pb-2">
          <p className="text-center font-body text-xs text-brand-black/55">
            {data.footerText}
          </p>
        </div>
      )}

      {/* Dekorace — rostliny (background) */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-14 z-0 flex justify-center">
        <Image
          src="/materials/rostliny.svg"
          alt=""
          width={768}
          height={422}
          aria-hidden
          className="h-auto w-[768px] min-w-[768px] max-w-none select-none"
        />
      </div>
    </div>
  );
}
