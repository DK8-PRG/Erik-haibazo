import { defineType, defineField } from "sanity";

const brandColorList = [
  { title: "Žlutá", value: "#FFDF40" },
  { title: "Zlatá", value: "#B89900" },
  { title: "Černá", value: "#141100" },
  { title: "Krémová", value: "#FFF5C2" },
  { title: "Bílá", value: "#FFFFFF" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Nastavení webu",
  type: "document",
  fields: [
    // ─── Identita ───────────────────────────────────────────────────────────
    defineField({
      name: "siteName",
      title: "Název webu",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Haibazo",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "Krátký popis pod názvem — zobrazí se v patičce nebo hero sekci",
    }),
    defineField({
      name: "logo",
      title: "Logo (SVG / PNG)",
      type: "file",
      options: { accept: "image/*" },
    }),
    defineField({
      name: "favicon",
      title: "Favicon (ICO / PNG / SVG)",
      type: "file",
      options: { accept: "image/*,.ico" },
    }),
    defineField({
      name: "profileImage",
      title: "Profilový obrázek (SVG / PNG)",
      type: "file",
      options: { accept: "image/*" },
    }),

    // ─── SEO výchozí hodnoty ─────────────────────────────────────────────────
    defineField({
      name: "seoDescription",
      title: "Výchozí SEO popis",
      type: "text",
      rows: 3,
      description:
        "Použije se tam, kde stránka nemá vlastní popis (max. 160 znaků)",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Výchozí OG obrázek (sociální sítě)",
      type: "image",
      description: "Doporučená velikost: 1200 × 630 px",
      options: { hotspot: true },
    }),

    // ─── Brand barvy ─────────────────────────────────────────────────────────
    defineField({
      name: "colors",
      title: "Brand barvy",
      type: "object",
      description:
        "HEX hodnoty (např. #FFDF40) — přepíší výchozí hodnoty Tailwindu na frontendu",
      fields: [
        defineField({
          name: "accent",
          title: "Primární akcent (žlutá)",
          type: "string",
          options: {
            list: brandColorList,
          },
        }),
        defineField({
          name: "accentDark",
          title: "Sekundární akcent (zlatá)",
          type: "string",
          options: {
            list: brandColorList,
          },
        }),
        defineField({
          name: "background",
          title: "Pozadí",
          type: "string",
          options: {
            list: brandColorList,
          },
        }),
        defineField({
          name: "foreground",
          title: "Text",
          type: "string",
          options: {
            list: brandColorList,
          },
        }),
        defineField({
          name: "backgroundAlt",
          title: "Alternativní pozadí (krémová)",
          type: "string",
          options: {
            list: brandColorList,
          },
        }),
      ],
    }),

    // ─── Sociální sítě ───────────────────────────────────────────────────────
    defineField({
      name: "socialLinks",
      title: "Sociální sítě",
      type: "array",
      description: "Zobrazí se v Navbaru, patičce i Linktree",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Spotify", value: "spotify" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Web", value: "web" },
                  { title: "E-mail", value: "email" },
                ],
                layout: "dropdown",
              },
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
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),

    // ─── Patička ─────────────────────────────────────────────────────────────
    defineField({
      name: "footerText",
      title: "Text patičky",
      type: "string",
      description: "Např. copyright nebo krátká věta o webu",
      initialValue: "© 2026 Haibazo. Všechna práva vyhrazena.",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Nastavení webu" };
    },
  },
});
