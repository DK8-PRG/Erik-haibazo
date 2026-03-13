import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Článek",
  type: "document",
  fields: [
    // ─── Základní info ───────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Název článku",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Titulní fotka",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Datum publikace",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),

    // ─── Texty ───────────────────────────────────────────────────────────────
    defineField({
      name: "excerpt",
      title: "Krátký popis (perex)",
      type: "text",
      rows: 3,
      description: "Zobrazí se na kartě článku a v listingu (max. 200 znaků)",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Obsah článku",
      type: "blockContent",
      description: "Plný text článku ve formátu Portable Text",
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      subtitle: "publishedAt",
    },
    prepare({ title, media, subtitle }) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString("cs-CZ")
        : "";
      return { title, media, subtitle: date };
    },
  },
});
