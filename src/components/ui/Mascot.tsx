"use client";

import { useState } from "react";

type MascotProps = {
  /**
   * Tailwind třídy pro nastavení rozměrů wrapperu (např. `w-32 h-32`).
   * Default: `w-28 h-28 sm:w-40 sm:h-40 lg:w-56 lg:h-56`.
   */
  className?: string;
  alt?: string;
};

/**
 * HAIBAZO maskot — interaktivní ikona.
 * - Idle: jemné plování nahoru/dolů (`animate-float`).
 * - Hover/focus: maskot „povyskočí" o pár pixelů nahoru (translate-y) + zlatá záře.
 * - Respektuje `prefers-reduced-motion` (animace + posun se vypnou).
 *
 * Velikost: přes `className` (responzivní Tailwind utility).
 */
export function Mascot({
  className = "w-28 h-28 sm:w-40 sm:h-40 lg:w-56 lg:h-56",
  alt = "HAIBAZO maskot",
}: MascotProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="img"
      aria-label={alt}
      className={`group relative inline-block cursor-pointer select-none outline-none ${className}`}
    >
      {/* Vrstva 1: drop-shadow filter. Hover přidá zlatou záři. */}
      <div
        className={`h-full w-full transition-[filter] duration-300 ${
          hovered
            ? "[filter:drop-shadow(0_0_24px_rgba(255,201,39,0.55))_drop-shadow(0_8px_16px_rgba(0,0,0,0.35))]"
            : "[filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.25))]"
        }`}
      >
        {/* Vrstva 2: pohyb. Idle = bez animace; hover = posun nahoru („peek-up"). */}
        <div
          className={`h-full w-full transition-transform duration-300 ease-out motion-reduce:!translate-y-0 ${
            hovered ? "-translate-y-3 sm:-translate-y-4" : "translate-y-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/new/Ikona_YT.svg"
            alt={alt}
            draggable={false}
            className="block h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
