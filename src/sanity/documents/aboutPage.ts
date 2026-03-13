import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "O Erikovi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nadpis stránky",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "O Erikovi",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio text",
      type: "blockContent",
      description:
        "Erikův příběh — podporuje formátování (nadpisy, odstavce, tučné…)",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    prepare() {
      return { title: "O Erikovi" };
    },
  },
});
