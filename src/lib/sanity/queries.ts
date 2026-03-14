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
