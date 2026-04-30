import { Container } from "@/components/ui/Container";
import { VideoTile } from "@/components/cards/VideoTile";
import type {
  HomepageVideosData,
  VideoTile as VideoTileData,
} from "@/lib/sanity/queries";
import type { Dictionary } from "@/lib/i18n/dictionaries/cs";

type LatestVideoProps = {
  data: HomepageVideosData;
  dict: Dictionary["videosSection"];
};

// =============================================================================
// FALLBACK tily — zobrazí se, když v Sanity není naplněno `videoTiles`.
// Po doplnění obsahu Erikem v Sanity Studiu se použijí jeho tily místo těchto.
// =============================================================================
const FALLBACK_TILES: VideoTileData[] = [
  {
    platform: "youtube",
    url: "https://www.youtube.com/shorts/uqndeKLtcFQ",
    // YouTube veřejně exponuje náhledy přes img.youtube.com
    thumbnail: "https://img.youtube.com/vi/uqndeKLtcFQ/maxresdefault.jpg",
    thumbnailAlt: "Nejnovější YouTube short",
    caption: "TOHLE ZKUS!",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/erik.haibazo/reel/DXMnTHejOCm/",
    // Instagram nedovoluje hot-link náhledů, použijeme lokální foto jako placeholder.
    thumbnail: "/images/new/DSC00927.jpg",
    thumbnailAlt: "Instagram reel náhled",
    caption: "INSTAGRAM REEL",
  },
];

// =============================================================================
// LatestVideo — sekce #videa
//   - 0 tilů ze Sanity → použije se FALLBACK_TILES
//   - 1 tile  → full-width karta (max-w-4xl, středově)
//   - 2 tily  → 1 sloupec mobile / 2 sloupce ≥md  (DEFAULT)
//   - 3+ tilů → 1 / 2 / 3 sloupce
// =============================================================================
export function LatestVideo({ data, dict }: LatestVideoProps) {
  const sanityTiles = data?.tiles ?? [];
  const tiles = sanityTiles.length > 0 ? sanityTiles : FALLBACK_TILES;
  const heading = data?.videosHeading ?? dict.heading;

  const gridClass =
    tiles.length === 1
      ? "mx-auto max-w-4xl"
      : tiles.length === 2
        ? "grid gap-6 md:grid-cols-2"
        : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="videa"
      className="relative scroll-mt-16 bg-night py-16 text-white sm:py-20 md:py-24"
    >
      <Container>
        <header className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
            {heading}
          </h2>
          <span
            aria-hidden
            className="hidden h-1 flex-1 max-w-[160px] translate-y-[-0.65rem] bg-gold sm:block"
          />
        </header>

        <div className={gridClass}>
          {tiles.map((tile, idx) => (
            <VideoTile
              key={`${tile.platform}-${idx}`}
              tile={tile}
              featured={tiles.length === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
