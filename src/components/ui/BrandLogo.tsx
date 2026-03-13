type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={`group transition-opacity hover:opacity-80 ${className ?? ""}`}
    >
      <span className="font-semibold tracking-tight text-[#FFD23F] transition-colors group-hover:text-[#e6bc38]">
        ERIK
      </span>{" "}
      <span className="font-semibold tracking-tight text-[#111111] transition-colors group-hover:text-[#333333]">
        HAIBAZO
      </span>
    </span>
  );
}
