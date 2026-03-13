import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type FooterProps = {
  dict: Dictionary["footer"];
  lang: string;
};

export function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10 sm:py-12">
      <Container className="grid gap-8 text-sm text-neutral-600 md:grid-cols-2 md:items-center">
        <div className="space-y-4 md:max-w-md">
          <div className="inline-flex items-center gap-3">
            <Link
              href={`/${lang}`}
              className="relative block h-11 w-11 overflow-hidden rounded-full border border-neutral-200 bg-neutral-50 p-1"
            >
              <Image
                src="/images/no-bg/erik-logo-no-bg.png"
                alt="Erik Haibazo logo"
                fill
                className="object-contain p-0.5"
              />
            </Link>
            <Link href={`/${lang}`}>
              <BrandLogo className="text-lg" />
            </Link>
          </div>
          <p className="max-w-sm text-neutral-500">{dict.description}</p>
        </div>

        <div className="space-y-6 text-neutral-500 md:ml-auto md:w-full md:max-w-md md:text-right">
          <p>{dict.contact}: duongk.hoang@gmail.com | 776 809 731</p>
          <p>
            &copy; {new Date().getFullYear()} Kim Hoang Duong. {dict.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
