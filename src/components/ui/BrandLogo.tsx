import Link from "next/link";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link href="/" className={className}>
      <span className="font-semibold tracking-tight text-[#FFD23F]">ERIK</span>{" "}
      <span className="font-semibold tracking-tight text-[#111111]">HAIBAZO</span>
    </Link>
  );
}
