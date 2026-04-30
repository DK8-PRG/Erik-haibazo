// SVG ikony pro CookbookCTA features — lucide-style stroke v gold barvě.
// Mapování probíhá podle stringu z Sanity (icon field). Nepodporovaná hodnota
// se renderuje jako emoji (fallback) nebo nezobrazí se vůbec.

type CookbookFeatureIconProps = {
  name?: string;
  className?: string;
};

const iconProps = {
  width: 36,
  height: 36,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CookbookFeatureIcon({
  name,
  className,
}: CookbookFeatureIconProps) {
  if (!name) return null;

  const key = name.trim().toLowerCase();

  switch (key) {
    case "book":
    case "recipes":
      return (
        <svg {...iconProps} className={className} aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "clock":
    case "time":
    case "step":
      return (
        <svg {...iconProps} className={className} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "bowl":
    case "soup":
    case "ingredients":
      return (
        <svg {...iconProps} className={className} aria-hidden>
          <path d="M9 3v2" />
          <path d="M12 2v3" />
          <path d="M15 3v2" />
          <path d="M3 11h18" />
          <path d="M4 11a8 8 0 0 0 16 0" />
          <path d="M2 19h20" />
        </svg>
      );
    case "heart-fork":
    case "heart":
    case "verified":
      return (
        <svg {...iconProps} className={className} aria-hidden>
          <path d="M12 21s-7-4.5-9.3-9.2A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5.8C19 16.5 12 21 12 21z" />
          <path d="M9 9v3a2 2 0 0 0 4 0V9" />
          <path d="M11 9v6" />
        </svg>
      );
    default:
      // Fallback — emoji nebo neznámý string vykreslíme jako text.
      return (
        <span
          className={className}
          style={{ fontSize: "1.75rem", lineHeight: 1 }}
          aria-hidden
        >
          {name}
        </span>
      );
  }
}
