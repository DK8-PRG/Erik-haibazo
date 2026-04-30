import Image from "next/image";
import type { VideoTile as VideoTileData } from "@/lib/sanity/queries";

type VideoTileProps = {
  tile: VideoTileData;
  /** Když je v gridu jediný tile, dáme mu větší aspect ratio. */
  featured?: boolean;
};

// =============================================================================
// Ikony per platforma — overlay nad thumbnail.
// =============================================================================
const PlatformIcon = ({
  platform,
}: {
  platform: VideoTileData["platform"];
}) => {
  const common = "h-full w-full";
  switch (platform) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 1 1.6c.2.5.4 1.2.5 2.4 0 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.5.2-1.2.4-2.4.5-1.2 0-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.2-.5-.4-1.2-.5-2.4 0-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 5.4a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.6 6.6a4.9 4.9 0 0 1-3.5-3.4V3h-3.4v13.2a2.6 2.6 0 1 1-1.9-2.5v-3.4a6 6 0 1 0 5.3 6V9.5a8.3 8.3 0 0 0 4.8 1.5V7.6a4.9 4.9 0 0 1-1.3-1Z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"
          />
        </svg>
      );
  }
};

// =============================================================================
// VideoTile — klikatelná karta s náhledem, otevírá externí URL v novém tabu.
// =============================================================================
export function VideoTile({ tile, featured = false }: VideoTileProps) {
  const aspect = featured ? "aspect-video" : "aspect-[4/5] sm:aspect-video";

  return (
    <a
      href={tile.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tile.caption ?? "Otevřít video"} (${tile.platform})`}
      className="group relative block overflow-hidden rounded-2xl bg-night-2 ring-1 ring-white/10 transition hover:ring-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={tile.thumbnail}
          alt={tile.thumbnailAlt ?? tile.caption ?? "Video náhled"}
          fill
          sizes="(max-width: 768px) 92vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tmavý gradient zespodu pro čitelnost popisku. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent"
        />

        {/* Play tlačítko centrovaně. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-night shadow-lg ring-4 ring-night/40 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
              aria-hidden="true"
            >
              <path fill="currentColor" d="M8 5v14l11-7L8 5Z" />
            </svg>
          </span>
        </div>

        {/* Platforma — malá ikona vpravo nahoře. */}
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-night/70 p-1.5 text-white backdrop-blur-md ring-1 ring-white/15">
          <PlatformIcon platform={tile.platform} />
        </span>

        {/* Caption (volitelný). */}
        {tile.caption ? (
          <p className="absolute inset-x-0 bottom-0 px-4 pb-4 text-lg font-extrabold uppercase tracking-tight text-white sm:px-5 sm:pb-5 sm:text-xl">
            {tile.caption}
          </p>
        ) : null}
      </div>
    </a>
  );
}
