import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Obrázek s popiskem",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternativní text",
      type: "string",
      description: "Popis obrázku pro přístupnost a SEO",
      validation: (rule) => rule.required(),
    }),
  ],
});
