import { defineType, defineField } from "sanity";

export const linktreePage = defineType({
  name: "linktreePage",
  title: "Linktree",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nadpis stránky",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podnadpis",
      type: "string",
      description: "Krátký popis pod názvem",
    }),
    defineField({
      name: "profileImage",
      title: "Profilový obrázek / logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundColor",
      title: "Barva pozadí",
      type: "string",
      initialValue: "#FFDF40",
    }),
    defineField({
      name: "textColor",
      title: "Barva textu",
      type: "string",
      initialValue: "#141100",
    }),
    defineField({
      name: "footerText",
      title: "Patička (text)",
      type: "string",
      description: "Např. © 2026 Erik Haibazo ",
    }),
    defineField({
      name: "links",
      title: "Odkazy",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          title: "Odkaz",
          fields: [
            defineField({
              name: "label",
              title: "Text odkazu",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({
                  allowRelative: false,
                  scheme: ["http", "https", "mailto"],
                }),
            }),
            defineField({
              name: "icon",
              title: "Ikona",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Spotify", value: "spotify" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Web", value: "web" },
                  { title: "E-mail", value: "email" },
                ],
              },
            }),
            defineField({
              name: "featured",
              title: "Zvýrazněný (plné pozadí)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Linktree" };
    },
  },
});
