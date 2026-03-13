import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./env";

// Use placeholder values during build when env vars are absent;
// actual fetches are guarded in queries.ts.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  // V produkci CDN zrychlí čtení; v dev chceme vždy čerstvá data
  useCdn: process.env.NODE_ENV === "production",
});

// Client s write tokenem pro mutace (seed, import, apod.)
export const writeClient = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
