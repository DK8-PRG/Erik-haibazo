import { client } from "./client";

// ─── Site Settings (singleton) ───────────────────────────────────────────────
const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  logo { asset -> { url } },
  seoDescription,
  ogImage { asset -> { url } },
  colors {
    "accent": accent.hex,
    "accentDark": accentDark.hex,
    "background": background.hex,
    "backgroundAlt": backgroundAlt.hex,
    "foreground": foreground.hex
  },
  socialLinks[] {
    platform,
    url
  },
  footerText
}`;

export type SiteSocialLink = {
  platform: string;
  url: string;
};

export type SiteColors = {
  accent?: string;
  accentDark?: string;
  background?: string;
  backgroundAlt?: string;
  foreground?: string;
};

export type SiteSettingsData = {
  siteName: string;
  tagline?: string;
  logo?: { asset: { url: string } };
  seoDescription?: string;
  ogImage?: { asset: { url: string } };
  colors?: SiteColors;
  socialLinks?: SiteSocialLink[];
  footerText?: string;
} | null;

export async function getSiteSettings(): Promise<SiteSettingsData> {
  return client.fetch(
    siteSettingsQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 3600 }
          : { revalidate: 0 },
    },
  );
}

// ─── Linktree page (singleton) ───────────────────────────────────────────────
const linktreeQuery = `*[_type == "linktreePage" && _id == "linktreePage"][0]{
  title,
  links[]{
    label,
    url,
    icon,
    featured
  }
}`;

export type LinktreeLink = {
  label: string;
  url: string;
  icon?: string;
  featured?: boolean;
};

export type LinktreeData = {
  title: string;
  links?: LinktreeLink[];
} | null;

export async function getLinktree(): Promise<LinktreeData> {
  return client.fetch(
    linktreeQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}
