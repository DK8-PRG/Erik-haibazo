import { Metadata } from "next";
import Image from "next/image";
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

export const dynamic = "force-dynamic";

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

export default async function LinksPage() {
  const data = await getLinktree();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFDF40]">
        <p className="font-body text-brand-black">Načítám...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFDF40]">
      {/* Obsah */}
      <div className="flex flex-1 flex-col items-center px-4 pt-10">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/materials/logo.svg"
            alt="Erik Haibazo"
            width={200}
            height={120}
            className="h-auto w-48"
            priority
          />
        </div>

        {/* Odkazy */}
        <div className="flex w-full max-w-sm flex-col gap-2">
          {data.links?.map((link) => {
            const Icon = link.icon ? ICON_MAP[link.icon] : null;
            return (
              <a
                key={link.url}
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
            );
          })}
        </div>
      </div>

      {/* Footer — rostliny */}
      <div className="relative mt-auto h-[220px] w-full overflow-hidden">
        <Image
          src="/materials/rostliny.svg"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none select-none object-cover object-bottom"
        />
      </div>
    </div>
  );
}
