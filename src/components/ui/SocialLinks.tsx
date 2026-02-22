import Link from "next/link";

const socials = [
  {
    label: "YouTube",
    href: "https://youtube.com",
    hoverClass: "hover:border-red-200 hover:bg-red-50"
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    hoverClass: "hover:border-pink-200 hover:bg-gradient-to-r hover:from-fuchsia-50 hover:via-pink-50 hover:to-orange-50"
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    hoverClass: "hover:border-blue-200 hover:bg-blue-50"
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    hoverClass: "hover:border-neutral-400 hover:bg-neutral-100"
  }
];

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:flex sm:flex-wrap ${className ?? ""}`}>
      {socials.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          className={`inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111111] transition ${social.hoverClass}`}
        >
          {social.label}
        </Link>
      ))}
    </div>
  );
}
