/**
 * Update obsahu v Sanity — patchne homepage dokument + uploadne assety.
 *
 * Použití:
 *   npx tsx scripts/update-content.ts          → běžný update
 *   npx tsx scripts/update-content.ts --force   → znovu uploaduje obrázky
 *
 * Vyžaduje SANITY_API_WRITE_TOKEN v .env.local (Editor token).
 *
 * POZN.: Lokalizovaná pole se zapisují jako `{ cs, en }` objekty.
 * Asset upload je idempotentní — pokud jsou obrázky uploadované, přeskočí se
 * (kontroluje se přes existující reference v homepage dokumentu).
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, basename, extname } from "path";

const FORCE = process.argv.includes("--force");

// ─── Načtení .env.local ──────────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "❌ Chybí NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET / SANITY_API_WRITE_TOKEN v .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Helpery ─────────────────────────────────────────────────────────────────
let keyCounter = 0;
const k = () => `k${(++keyCounter).toString(36)}`;

type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};
type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3";
  children: PortableTextSpan[];
  markDefs: unknown[];
};

function block(
  text: string,
  style: PortableTextBlock["style"] = "normal",
): PortableTextBlock {
  const key = k();
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: key + "s", text, marks: [] }],
    markDefs: [],
  };
}

const ls = (cs: string, en: string) => ({ cs, en });
const lt = (cs: string, en: string) => ({ cs, en });
const lb = (cs: PortableTextBlock[], en: PortableTextBlock[]) => ({ cs, en });

// ─── Asset upload ────────────────────────────────────────────────────────────
type ImageWithAltRef = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt: string;
};

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function uploadLocalImage(
  relPath: string,
  alt: string,
): Promise<ImageWithAltRef | null> {
  const fullPath = resolve(process.cwd(), "public", relPath.replace(/^\//, ""));
  if (!existsSync(fullPath)) {
    console.warn(`   ⚠️  ${relPath} neexistuje, přeskočím.`);
    return null;
  }
  const ext = extname(fullPath).toLowerCase();
  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(fullPath),
    contentType: MIME[ext] ?? "application/octet-stream",
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
}

async function uploadImageFromUrl(
  url: string,
  alt: string,
): Promise<ImageWithAltRef | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`   ⚠️  fetch ${url} → ${res.status}, přeskočím.`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = basename(new URL(url).pathname) || "thumbnail.jpg";
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: res.headers.get("content-type") ?? "image/jpeg",
    });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt,
    };
  } catch (err) {
    console.warn(`   ⚠️  upload from URL selhal:`, err);
    return null;
  }
}

// ─── About body — storytelling (oba jazyky) ─────────────────────────────────
const aboutBodyCs: PortableTextBlock[] = [
  block(
    "Jsem Erik a celý život se motám kolem jídla. Vyrostl jsem mezi vůněmi vietnamské kuchyně mojí rodiny — pho, banh mi, jarní závitky. Jídlo pro mě nikdy nebylo jen palivo, ale způsob, jak si rozumět s lidmi.",
  ),
  block(
    "Dneska natáčím videa, ve kterých ukazuju, že vařit autenticky vietnamsky doma vůbec není raketová věda. Stačí pár klíčových surovin, trocha cviku a chuť experimentovat. Žádná mystifikace, žádné gourmet ego — jen poctivé jídlo, které chutná líp než v restauraci.",
  ),
  block(
    "Pokud máš rád street food, výrazné chutě a chceš se naučit vietnamskou klasiku po svém, jsi tu správně. Sleduj mě, vař se mnou a pojďme do toho.",
  ),
];

const aboutBodyEn: PortableTextBlock[] = [
  block(
    "I'm Erik and food has been my whole life. I grew up surrounded by the smells of my family's Vietnamese cooking — pho, banh mi, fresh spring rolls. Food was never just fuel for me — it was the language I used to connect with people.",
  ),
  block(
    "Today I make videos that show authentic Vietnamese cooking at home isn't rocket science. A few key ingredients, a bit of practice, and a willingness to experiment is all you need. No mystification, no gourmet ego — just honest food that tastes better than the restaurant.",
  ),
  block(
    "If you love street food, bold flavors and want to learn Vietnamese classics your own way, you're in the right place. Follow along, cook with me, let's go.",
  ),
];

// ─── Run ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log("📝 Updatuji homepage (CS + EN)…");

  // Načti existující dokument abychom nedělali zbytečné re-uploady obrázků.
  const existing = await client.fetch<{
    _id?: string;
    heroImage?: unknown;
    aboutLongPortrait?: unknown;
    cookbookMockup?: unknown;
    portraitDivider?: unknown;
    partners?: unknown[];
    videoTiles?: unknown[];
  } | null>(
    `*[_id == "homepage"][0]{
      _id,
      heroImage,
      aboutLongPortrait,
      cookbookMockup,
      portraitDivider,
      partners,
      videoTiles
    }`,
  );

  // ─── Obrázky (idempotentně) ─────────────────────────────────────────────
  console.log("🖼️  Asset uploady…");

  const heroImage =
    !FORCE && existing?.heroImage
      ? undefined
      : await uploadLocalImage(
          "/images/new/DSC01115.jpg",
          "Erik Haibazo — portrét",
        );
  if (heroImage) console.log("   ✅ heroImage uploaded");

  const aboutLongPortrait =
    !FORCE && existing?.aboutLongPortrait
      ? undefined
      : await uploadLocalImage(
          "/images/new/DSC00927.jpg",
          "Erik Haibazo — sekce O mně",
        );
  if (aboutLongPortrait) console.log("   ✅ aboutLongPortrait uploaded");

  const cookbookMockup =
    !FORCE && existing?.cookbookMockup
      ? undefined
      : await uploadLocalImage(
          "/images/new/cookbook.png",
          "Erik Haibazo — mockup kuchařky",
        );
  if (cookbookMockup) console.log("   ✅ cookbookMockup uploaded");

  const portraitDivider =
    !FORCE && existing?.portraitDivider
      ? undefined
      : await uploadLocalImage(
          "/images/new/DSC00927.jpg",
          "Erik Haibazo — portrét divider",
        );
  if (portraitDivider) console.log("   ✅ portraitDivider uploaded");

  // ─── Partneři ────────────────────────────────────────────────────────────
  let partners: unknown[] | undefined;
  if (FORCE || !existing?.partners || existing.partners.length === 0) {
    const partnerSpecs: Array<{ name: string; logo: string }> = [
      { name: "Tescoma", logo: "/partners/tescoma.png" },
      { name: "Tefal", logo: "/partners/tefal.svg" },
      { name: "KitchenAid", logo: "/partners/kitchenaid.svg" },
      { name: "Rohlík", logo: "/partners/rohlik.svg" },
      { name: "Košík", logo: "/partners/kosik.svg" },
      { name: "Makro", logo: "/partners/makro.svg" },
    ];
    const uploaded: unknown[] = [];
    for (const p of partnerSpecs) {
      const logo = await uploadLocalImage(p.logo, `${p.name} — logo`);
      if (logo) {
        uploaded.push({ _key: k(), name: p.name, logo });
        console.log(`   ✅ partner ${p.name} uploaded`);
      }
    }
    partners = uploaded;
  } else {
    console.log("   ↩️  partneři už nahraní, přeskakuji.");
  }

  // ─── Video tiles (YouTube thumbnails) ────────────────────────────────────
  let videoTiles: unknown[] | undefined;
  if (FORCE || !existing?.videoTiles || existing.videoTiles.length === 0) {
    const videoSpecs = [
      {
        platform: "youtube",
        url: "https://www.youtube.com/shorts/uqndeKLtcFQ",
        thumb: "https://img.youtube.com/vi/uqndeKLtcFQ/maxresdefault.jpg",
        captionCs: "TOHLE ZKUS!",
        captionEn: "TRY THIS!",
        alt: "YouTube short — Erik Haibazo",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/shorts/lpG_LQHhSMw",
        thumb: "https://img.youtube.com/vi/lpG_LQHhSMw/maxresdefault.jpg",
        captionCs: "NOVÝ SHORT",
        captionEn: "NEW SHORT",
        alt: "YouTube short — Erik Haibazo",
      },
    ];
    const tiles: unknown[] = [];
    for (const v of videoSpecs) {
      const thumbnail = await uploadImageFromUrl(v.thumb, v.alt);
      if (thumbnail) {
        tiles.push({
          _key: k(),
          platform: v.platform,
          url: v.url,
          thumbnail,
          caption: ls(v.captionCs, v.captionEn),
        });
        console.log(`   ✅ video tile uploaded: ${v.url}`);
      }
    }
    videoTiles = tiles;
  } else {
    console.log("   ↩️  video tily už nahrané, přeskakuji.");
  }

  // ─── Updates objekt ──────────────────────────────────────────────────────
  const updates: Record<string, unknown> = {
    heroTitle: ls(
      "ERIK HAIBAZO — vietnamská kuchyně bez chaosu",
      "ERIK HAIBAZO — Vietnamese cooking without chaos",
    ),
    heroSubtitle: lt(
      "Naučím tě vařit vietnamské jídlo, které chutná líp než v restauraci.",
      "I'll teach you to cook Vietnamese food that tastes better than at the restaurant.",
    ),
    heroCTALabel: ls("Prozkoumat recepty", "Explore recipes"),
    heroCTAHref: "/cs#videa",

    videosHeading: ls("NEJNOVĚJŠÍ VIDEO", "LATEST VIDEO"),

    cookbookHeading: ls(
      "MOJE KUCHAŘKA JIŽ BRZY VENKU",
      "MY COOKBOOK COMING SOON",
    ),
    cookbookSubheading: lt(
      "Limitovaná edice receptů, které jsem testoval roky. Přihlaš se a budu ti psát, jakmile bude kuchařka venku.",
      "A limited edition of recipes I've been testing for years. Sign up and I'll let you know the moment the cookbook drops.",
    ),
    cookbookCTALabel: ls("CHCI KUCHAŘKU", "I WANT THE COOKBOOK"),
    cookbookFeatures: [
      {
        _key: k(),
        icon: "🥢",
        label: ls("Autentické recepty", "Authentic recipes"),
      },
      { _key: k(), icon: "📖", label: ls("Krok za krokem", "Step by step") },
      {
        _key: k(),
        icon: "🇻🇳",
        label: ls("Z Vietnamu do tvé kuchyně", "From Vietnam to your kitchen"),
      },
      {
        _key: k(),
        icon: "💛",
        label: ls("Limitovaná edice", "Limited edition"),
      },
    ],

    aboutLongHeading: ls("KDO JSEM?", "WHO AM I?"),
    aboutLongBody: lb(aboutBodyCs, aboutBodyEn),
    aboutLongEmail: "erik.haibazo@gmail.com",

    footerHeading: ls("ZŮSTAŇME V KONTAKTU", "LET'S STAY IN TOUCH"),
    footerEmail: "erik.haibazo@gmail.com",
    footerCopyright: ls(
      `© ${new Date().getFullYear()} Erik Haibazo`,
      `© ${new Date().getFullYear()} Erik Haibazo`,
    ),
    footerSocials: [
      {
        _key: k(),
        platform: "instagram",
        url: "https://www.instagram.com/erik.haibazo/",
      },
      {
        _key: k(),
        platform: "youtube",
        url: "https://www.youtube.com/@Erik_haibazo/shorts",
      },
      {
        _key: k(),
        platform: "tiktok",
        url: "https://www.tiktok.com/@erik.haibazo",
      },
      {
        _key: k(),
        platform: "facebook",
        url: "https://www.facebook.com/p/Erik-Haibazo-61576690652852/",
      },
    ],
  };

  if (heroImage) updates.heroImage = heroImage;
  if (aboutLongPortrait) updates.aboutLongPortrait = aboutLongPortrait;
  if (cookbookMockup) updates.cookbookMockup = cookbookMockup;
  if (portraitDivider) updates.portraitDivider = portraitDivider;
  if (partners) updates.partners = partners;
  if (videoTiles) updates.videoTiles = videoTiles;

  console.log("💾 Patchuji homepage…");

  if (!existing?._id) {
    console.log("   ℹ️  homepage dokument neexistuje, vytvářím…");
    await client.create({ _id: "homepage", _type: "homepage", ...updates });
    console.log("   ✅ vytvořen");
    return;
  }

  const result = await client.patch("homepage").set(updates).commit();
  console.log("   ✅ patched, rev:", result._rev);
  console.log("   Aktualizovaná pole:", Object.keys(updates).join(", "));
}

run().catch((err) => {
  console.error("❌ Update selhal:", err);
  process.exit(1);
});
