import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Domovská stránka",
  type: "document",
  fields: [
    // ─── Hero sekce ──────────────────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero fotka",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero titulek",
      type: "string",
      description: "Hlavní nadpis v hero sekci",
      validation: (rule) => rule.required(),
      initialValue: "HAIBAZO: moderní recepty bez chaosu",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero podtitulek",
      type: "text",
      rows: 2,
      description: "Krátký popis pod nadpisem",
    }),
    defineField({
      name: "heroCTALabel",
      title: "CTA tlačítko — text",
      type: "string",
      initialValue: "Prozkoumat recepty",
    }),
    defineField({
      name: "heroCTAHref",
      title: "CTA tlačítko — odkaz",
      type: "string",
      description: "Relativní URL (např. /recipes)",
      initialValue: "/recipes",
    }),

    // ─── Featured obsah ───────────────────────────────────────────────────────
    defineField({
      name: "featuredRecipes",
      title: "Doporučené recepty",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recipe" }] }],
      description: "Recepty zobrazené na Homepage (ideálně 6)",
      validation: (rule) => rule.max(9),
    }),
    defineField({
      name: "featuredArticles",
      title: "Doporučené články",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      description: "Články v sekci Magazín na Homepage (ideálně 4)",
      validation: (rule) => rule.max(6),
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Domovská stránka" };
    },
  },
});
