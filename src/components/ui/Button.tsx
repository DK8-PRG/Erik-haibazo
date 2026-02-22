import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
};

const classes =
  "inline-flex items-center justify-center rounded-full bg-[#FFD23F] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD23F] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function Button({ href, children, className }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`${classes} ${className ?? ""}`}>
        {children}
      </Link>
    );
  }

  return <button className={`${classes} ${className ?? ""}`}>{children}</button>;
}
