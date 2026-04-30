/**
 * Export newsletter subscribers → CSV
 *
 * Použití:
 *   npx tsx scripts/export-subscribers.ts
 *   → vytvoří soubor `subscribers-YYYY-MM-DD.csv` v rootu repa.
 *
 * CSV je kompatibilní s Mailchimp / Brevo / SendGrid (sloupce: email, subscribedAt, source, locale).
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ─── Načtení .env.local ──────────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  try {
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
  } catch {
    console.error("❌ Nepodařilo se načíst .env.local");
    process.exit(1);
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Chybí NEXT_PUBLIC_SANITY_PROJECT_ID nebo SANITY_API_WRITE_TOKEN.",
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

type Subscriber = {
  email: string;
  subscribedAt?: string;
  source?: string;
  locale?: string;
};

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

async function main() {
  console.log("📥 Stahuji odběratele z Sanity…");

  const subscribers = await client.fetch<Subscriber[]>(
    `*[_type == "newsletterSubscriber"] | order(subscribedAt desc) {
      email, subscribedAt, source, locale
    }`,
  );

  if (subscribers.length === 0) {
    console.log("ℹ️  Žádní odběratelé.");
    return;
  }

  const header = "email,subscribedAt,source,locale";
  const rows = subscribers.map((s) =>
    [s.email, s.subscribedAt ?? "", s.source ?? "", s.locale ?? ""]
      .map(escapeCsv)
      .join(","),
  );
  const csv = [header, ...rows].join("\n");

  const date = new Date().toISOString().slice(0, 10);
  const filename = `subscribers-${date}.csv`;
  const outPath = resolve(process.cwd(), filename);
  writeFileSync(outPath, csv, "utf-8");

  console.log(`✅ Exportováno ${subscribers.length} odběratelů → ${filename}`);
}

main().catch((err) => {
  console.error("❌ Chyba:", err);
  process.exit(1);
});
