import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // V produkci CDN zrychlí čtení; v dev chceme vždy čerstvá data
  useCdn: process.env.NODE_ENV === "production",
});
