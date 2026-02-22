import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10 sm:py-12">
      <Container className="grid gap-8 text-sm text-neutral-600 md:grid-cols-2 md:items-center">
        <div className="space-y-4 md:max-w-md">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-11 w-11 overflow-hidden rounded-full border border-neutral-200 bg-neutral-50 p-1">
              <Image
                src="/images/no-bg/erik-logo-no-bg.png"
                alt="Erik Haibazo logo"
                fill
                className="object-contain p-0.5"
              />
            </span>
            <BrandLogo className="text-lg" />
          </Link>
          <p className="max-w-sm text-neutral-500">
            Recepty, videa a inspirace z kuchyne kazdy tyden.
          </p>
        </div>

        <div className="space-y-6 text-neutral-500 md:ml-auto md:w-full md:max-w-md md:text-right">
          <p>Kontakt: duongk.hoang@gmail.com | 776 809 731</p>
          <p>
            (c) {new Date().getFullYear()} Kim Hoang Duong. Vsechna prava
            vyhrazena.
          </p>
        </div>
      </Container>
    </footer>
  );
}
