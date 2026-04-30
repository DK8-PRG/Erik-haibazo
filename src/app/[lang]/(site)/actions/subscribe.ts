"use server";

import { createClient } from "next-sanity";
import { projectId, dataset } from "@/lib/sanity/env";

// =============================================================================
// Server Action — uloží email do Sanity dokumentu `newsletterSubscriber`.
//
// BEZPEČNOST:
//   - SANITY_API_WRITE_TOKEN je čteno pouze na serveru.
//   - Klient nikdy neuvidí token (Server Actions běží na serveru).
//   - Validace: regex (e-mail) + duplicate check.
// =============================================================================
const writeClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        token: process.env.SANITY_API_WRITE_TOKEN,
        useCdn: false,
      })
    : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult =
  | { ok: true; alreadyExists?: boolean }
  | { ok: false; error: "invalid_email" | "config_missing" | "server_error" };

export async function subscribeEmail(
  formData: FormData,
): Promise<SubscribeResult> {
  if (!writeClient) return { ok: false, error: "config_missing" };

  // Honeypot — pokud je vyplněno, je to bot. Tváříme se jako úspěch.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) return { ok: true };

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const locale = String(formData.get("locale") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) return { ok: false, error: "invalid_email" };

  try {
    // Anti-duplicate check
    const existing = await writeClient.fetch<string | null>(
      `*[_type == "newsletterSubscriber" && email == $email][0]._id`,
      { email },
    );
    if (existing) return { ok: true, alreadyExists: true };

    await writeClient.create({
      _type: "newsletterSubscriber",
      email,
      subscribedAt: new Date().toISOString(),
      source: "homepage-cookbook",
      locale: locale === "en" ? "en" : "cs",
    });

    return { ok: true };
  } catch (err) {
    console.error("[subscribeEmail] failed:", err);
    return { ok: false, error: "server_error" };
  }
}
