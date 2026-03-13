import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO titulek",
      type: "string",
      description: "Titulek pro vyhledávače a sdílení (max. 60 znaků)",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "description",
      title: "SEO popis",
      type: "text",
      rows: 3,
      description: "Popis pro vyhledávače (max. 160 znaků)",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "OG obrázek (sociální sítě)",
      type: "image",
      description: "Doporučená velikost: 1200 × 630 px",
      options: { hotspot: true },
    }),
  ],
});
