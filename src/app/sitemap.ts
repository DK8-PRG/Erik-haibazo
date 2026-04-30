import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://erikhaibazo.cz";

// Statické routy v rámci MVP one-pageru. Detail recipes/[slug] a magazine/[slug]
// jsou momentálně mimo MVP scope (viz _docs/09-redesign-proposal.md §10).
const staticPaths = ["", "/about", "/contact", "/magazine", "/recipes"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((lang) =>
    staticPaths.map((p) => ({
      url: `${SITE_URL}/${lang}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1.0 : 0.7,
    })),
  );
}
