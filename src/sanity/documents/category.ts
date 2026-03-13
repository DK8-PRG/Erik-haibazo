import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Kategorie",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Název",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
