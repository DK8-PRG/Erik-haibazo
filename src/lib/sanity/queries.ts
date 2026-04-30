import { client } from "./client";
import { projectId, dataset } from "./env";

// ─── Site Settings (singleton) ───────────────────────────────────────────────
const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  logo { asset -> { url } },
  seoDescription,
  ogImage { asset -> { url } },
  colors {
    accent,
    accentDark,
    background,
    backgroundAlt,
    foreground
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
  if (!projectId || !dataset) return null;
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
const linktreeQuery = `*[_type == "linktreePage"][0]{
  title,
  subtitle,
  profileImage { asset -> { url } },
  backgroundColor,
  textColor,
  footerText,
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
  subtitle?: string;
  profileImage?: { asset: { url: string } };
  backgroundColor?: string;
  textColor?: string;
  footerText?: string;
  links?: LinktreeLink[];
} | null;

export async function getLinktree(): Promise<LinktreeData> {
  if (!projectId || !dataset) return null;
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

// ─── Recipes ─────────────────────────────────────────────────────────────────
import type { Recipe, Article } from "@/lib/types";
import type { PortableTextBlock } from "@portabletext/types";

const recipesQuery = `*[_type == "recipe"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  timeMinutes,
  "category": category->title,
  excerpt
}`;

const recipeBySlugQuery = `*[_type == "recipe" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  timeMinutes,
  "category": category->title,
  excerpt
}`;

export async function getRecipes(): Promise<Recipe[]> {
  if (!projectId || !dataset) return [];
  return client.fetch(
    recipesQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  if (!projectId || !dataset) return null;
  return client.fetch(
    recipeBySlugQuery,
    { slug },
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

// ─── Articles ────────────────────────────────────────────────────────────────
const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  publishedAt,
  excerpt
}`;

const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  publishedAt,
  excerpt
}`;

export async function getArticles(): Promise<Article[]> {
  if (!projectId || !dataset) return [];
  return client.fetch(
    articlesQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!projectId || !dataset) return null;
  return client.fetch(
    articleBySlugQuery,
    { slug },
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

// ─── Homepage — videa (#videa sekce) ─────────────────────────────────────────
const homepageVideosQuery = `*[_type == "homepage"][0]{
  videosHeading,
  "tiles": videoTiles[]{
    platform,
    url,
    caption,
    "thumbnail": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt
  }
}`;

export type VideoPlatform = "youtube" | "instagram" | "tiktok" | "facebook";

export type VideoTile = {
  platform: VideoPlatform;
  url: string;
  thumbnail: string;
  thumbnailAlt?: string;
  caption?: string;
};

export type HomepageVideosData = {
  videosHeading?: string;
  tiles?: VideoTile[];
} | null;

export async function getHomepageVideos(): Promise<HomepageVideosData> {
  if (!projectId || !dataset) return null;
  return client.fetch(
    homepageVideosQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

// ─── Homepage — kuchařka (#kucharka sekce) ───────────────────────────────────
const homepageCookbookQuery = `*[_type == "homepage"][0]{
  cookbookHeading,
  cookbookSubheading,
  "cookbookMockup": cookbookMockup.asset->url,
  "cookbookMockupAlt": cookbookMockup.alt,
  cookbookCTALabel,
  cookbookFeatures[]{ icon, label }
}`;

export type CookbookFeature = {
  icon?: string;
  label: string;
};

export type HomepageCookbookData = {
  cookbookHeading?: string;
  cookbookSubheading?: string;
  cookbookMockup?: string;
  cookbookMockupAlt?: string;
  cookbookCTALabel?: string;
  cookbookFeatures?: CookbookFeature[];
} | null;

export async function getHomepageCookbook(): Promise<HomepageCookbookData> {
  if (!projectId || !dataset) return null;
  return client.fetch(
    homepageCookbookQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

// ─── Homepage — about long (#o-mne sekce) + portrait divider ─────────────────
const homepageAboutLongQuery = `*[_type == "homepage"][0]{
  "portraitDivider": portraitDivider.asset->url,
  "portraitDividerAlt": portraitDivider.alt,
  aboutLongHeading,
  "aboutLongPortrait": aboutLongPortrait.asset->url,
  "aboutLongPortraitAlt": aboutLongPortrait.alt,
  aboutLongBody,
  aboutLongEmail
}`;

export type HomepageAboutLongData = {
  portraitDivider?: string;
  portraitDividerAlt?: string;
  aboutLongHeading?: string;
  aboutLongPortrait?: string;
  aboutLongPortraitAlt?: string;
  aboutLongBody?: PortableTextBlock[];
  aboutLongEmail?: string;
} | null;

export async function getHomepageAboutLong(): Promise<HomepageAboutLongData> {
  if (!projectId || !dataset) return null;
  return client.fetch(
    homepageAboutLongQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}

// ─── Homepage — footer / sekce #kontakt ──────────────────────────────────────
const homepageFooterQuery = `*[_type == "homepage"][0]{
  footerHeading,
  footerEmail,
  footerCopyright,
  footerSocials[]{ platform, url }
}`;

export type HomepageFooterSocial = {
  platform: VideoPlatform;
  url: string;
};

export type HomepageFooterData = {
  footerHeading?: string;
  footerEmail?: string;
  footerCopyright?: string;
  footerSocials?: HomepageFooterSocial[];
} | null;

export async function getHomepageFooter(): Promise<HomepageFooterData> {
  if (!projectId || !dataset) return null;
  return client.fetch(
    homepageFooterQuery,
    {},
    {
      next:
        process.env.NODE_ENV === "production"
          ? { revalidate: 60 }
          : { revalidate: 0 },
    },
  );
}
