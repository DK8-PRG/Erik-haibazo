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

    // ─── Sekce #videa — YouTube / sociální tily ──────────────────────────────
    defineField({
      name: "videosHeading",
      title: "Videa — nadpis",
      type: "string",
      initialValue: "NEJNOVĚJŠÍ VIDEO",
    }),
    defineField({
      name: "videoTiles",
      title: "Video tily",
      type: "array",
      description:
        "1 tile = full-width karta. 2+ tily = grid. Klik otevře URL v novém tabu.",
      of: [
        {
          type: "object",
          name: "videoTile",
          fields: [
            defineField({
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  { title: "YouTube", value: "youtube" },
                  { title: "Instagram", value: "instagram" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Facebook", value: "facebook" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
              initialValue: "youtube",
            }),
            defineField({
              name: "url",
              title: "URL videa",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "thumbnail",
              title: "Náhled",
              type: "imageWithAlt",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Popisek (volitelný)",
              type: "string",
              description: 'např. "TOHLE ZKUS!" nebo "SLADKOKYSELÁ OMÁČKA"',
            }),
          ],
          preview: {
            select: {
              title: "caption",
              subtitle: "platform",
              media: "thumbnail",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Video tile",
                subtitle: subtitle ? String(subtitle).toUpperCase() : "",
                media,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    // ─── Sekce #kucharka — Cookbook CTA + newsletter ──────────────────
    defineField({
      name: "cookbookHeading",
      title: "Kuchařka — nadpis",
      type: "string",
      initialValue: "MOJE KUCHAŘKA (JIŽ BRZY VENKU)",
    }),
    defineField({
      name: "cookbookSubheading",
      title: "Kuchařka — podtitulek",
      type: "text",
      rows: 3,
      description:
        "Krátký popis pod nadpisem (proč se přihlásit, co uživatel dostane).",
    }),
    defineField({
      name: "cookbookMockup",
      title: "Mockup knihy",
      type: "imageWithAlt",
    }),
    defineField({
      name: "cookbookCTALabel",
      title: "Tlačítko — text",
      type: "string",
      initialValue: "CHCI KUCHAŘKU",
    }),
    defineField({
      name: "cookbookFeatures",
      title: "Body / featury (4× pod formulářem)",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            defineField({
              name: "icon",
              title: "Ikona (emoji nebo lucide název)",
              type: "string",
              description: 'např. "🔥" nebo "chef-hat"',
            }),
            defineField({
              name: "label",
              title: "Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),

    // ─── Portrait divider (full-width foto mezi #kucharka a #o-mne) ─────────
    defineField({
      name: "portraitDivider",
      title: "Portrait divider — foto",
      type: "imageWithAlt",
      description:
        "Volitelný full-width portrét mezi sekcí Kuchařka a O mně. Když není nastavený, divider se nezobrazí.",
    }),

    // ─── Sekce #o-mne — AboutLong storytelling ──────────────────────────────
    defineField({
      name: "aboutLongHeading",
      title: "O mně — nadpis",
      type: "string",
      initialValue: "KDO JSEM?",
    }),
    defineField({
      name: "aboutLongPortrait",
      title: "O mně — portrét",
      type: "imageWithAlt",
    }),
    defineField({
      name: "aboutLongBody",
      title: "O mně — text (rich text)",
      type: "blockContent",
    }),
    defineField({
      name: "aboutLongEmail",
      title: "O mně — kontaktní e-mail (volitelný)",
      type: "string",
      description: "Pokud vyplníš, zobrazí se klikací mailto: pod textem.",
    }),

    // ─── Footer / sekce #kontakt ────────────────────────────────────────────
    defineField({
      name: "footerHeading",
      title: "Footer — nadpis (sekce #kontakt)",
      type: "string",
      initialValue: "ZŮSTAŇME V KONTAKTU",
    }),
    defineField({
      name: "footerEmail",
      title: "Footer — e-mail",
      type: "string",
      initialValue: "erik.haibazo@gmail.com",
    }),
    defineField({
      name: "footerSocials",
      title: "Footer — sociální sítě",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Facebook", value: "facebook" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer — copyright text",
      type: "string",
      initialValue: "© 2026 Erik Haibazo",
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
