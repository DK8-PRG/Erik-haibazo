import { defineType, defineField, defineArrayMember } from "sanity";

export const recipe = defineType({
  name: "recipe",
  title: "Recept",
  type: "document",
  fields: [
    // ─── Základní info ───────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Název receptu",
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
      name: "category",
      title: "Kategorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),

    // ─── Metadata ────────────────────────────────────────────────────────────
    defineField({
      name: "timeMinutes",
      title: "Čas přípravy (minuty)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "difficulty",
      title: "Obtížnost",
      type: "string",
      options: {
        list: [
          { title: "Snadný", value: "easy" },
          { title: "Střední", value: "medium" },
          { title: "Náročný", value: "hard" },
        ],
        layout: "radio",
      },
      initialValue: "easy",
    }),

    // ─── Texty ───────────────────────────────────────────────────────────────
    defineField({
      name: "excerpt",
      title: "Krátký popis (perex)",
      type: "text",
      rows: 3,
      description: "Zobrazí se na kartě receptu a v listingu (max. 200 znaků)",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      type: "text",
      rows: 5,
      description: "Delší úvod na stránce detailu",
    }),

    // ─── Obsah ───────────────────────────────────────────────────────────────
    defineField({
      name: "ingredients",
      title: "Ingredience",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Každý řádek = jedna ingredience (např. 200g rýže)",
    }),
    defineField({
      name: "instructions",
      title: "Postup",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
      description: "Každý krok = jeden odstavec postupu",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube / TikTok)",
      type: "url",
      description: "Volitelný odkaz na video recept",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
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
      subtitle: "category.name",
    },
  },
});
