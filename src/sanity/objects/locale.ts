import { defineType, defineField } from "sanity";

// =============================================================================
// localeString — lokalizovaný krátký text (1 řádek). Používá se v polích, kde
// se obsah liší pro CS a EN návštěvníky.
//
// V Sanity Studiu se zobrazí jako 2 input boxy (Čeština / Angličtina).
// Na frontendu queries vybírají správnou variantu přes `coalesce(field[$lang], field.cs)`.
// =============================================================================
export const localeString = defineType({
  name: "localeString",
  title: "Lokalizovaný text",
  type: "object",
  fields: [
    defineField({
      name: "cs",
      title: "Čeština",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
  ],
});

// localeText — víceřádkový text (textarea)
export const localeText = defineType({
  name: "localeText",
  title: "Lokalizovaný delší text",
  type: "object",
  fields: [
    defineField({
      name: "cs",
      title: "Čeština",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
    }),
  ],
});

// localeBlockContent — rich text (Portable Text)
export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Lokalizovaný rich text",
  type: "object",
  fields: [
    defineField({
      name: "cs",
      title: "Čeština",
      type: "blockContent",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "blockContent",
    }),
  ],
});
