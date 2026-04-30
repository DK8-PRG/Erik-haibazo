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
      type: "localeString",
      description: "Hlavní nadpis v hero sekci (CS / EN)",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero podtitulek",
      type: "localeText",
      description: "Krátký popis pod nadpisem (CS / EN)",
    }),
    defineField({
      name: "heroCTALabel",
      title: "CTA tlačítko — text",
      type: "localeString",
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
      type: "localeString",
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
              type: "localeString",
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
      type: "localeString",
    }),
    defineField({
      name: "cookbookSubheading",
      title: "Kuchařka — podtitulek",
      type: "localeText",
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
      type: "localeString",
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
              title: "Ikona",
              type: "string",
              description:
                'Název ikony: "book", "clock", "bowl", "heart-fork". Případně emoji jako fallback.',
            }),
            defineField({
              name: "label",
              title: "Text",
              type: "localeString",
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
      type: "localeString",
    }),
    defineField({
      name: "aboutLongPortrait",
      title: "O mně — portrét",
      type: "imageWithAlt",
    }),
    defineField({
      name: "aboutLongBody",
      title: "O mně — text (rich text, CS / EN)",
      type: "localeBlockContent",
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
      type: "localeString",
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
      type: "localeString",
    }),

    // ─── Partneři / "As Featured In" marquee ────────────────────────────────
    defineField({
      name: "partners",
      title: "Partneři (As Featured In)",
      type: "array",
      description:
        "Loga partnerů zobrazená v rolující se marquee sekci nad footerem. " +
        "Pokud je seznam prázdný, sekce zobrazí přednastavené fallback partnery.",
      of: [
        {
          type: "object",
          name: "partner",
          fields: [
            defineField({
              name: "name",
              title: "Název partnera",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "imageWithAlt",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Odkaz (volitelný)",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
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
