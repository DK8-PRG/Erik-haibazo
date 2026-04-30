import { defineType, defineField } from "sanity";

// =============================================================================
// newsletterSubscriber — odběratelé pro CookbookCTA newsletter.
// Píše se přes Server Action `subscribeEmail` (server-only write token).
// =============================================================================
export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter — odběratelé",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "subscribedAt",
      title: "Datum přihlášení",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Zdroj",
      type: "string",
      description: 'např. "homepage-cookbook"',
      readOnly: true,
    }),
    defineField({
      name: "locale",
      title: "Jazyk",
      type: "string",
      options: { list: ["cs", "en"], layout: "radio" },
      readOnly: true,
    }),
  ],

  preview: {
    select: { title: "email", subtitle: "subscribedAt", source: "source" },
    prepare({ title, subtitle, source }) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString("cs-CZ", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
      return {
        title: title || "(bez e-mailu)",
        subtitle: [date, source].filter(Boolean).join(" · "),
      };
    },
  },

  orderings: [
    {
      name: "subscribedAtDesc",
      title: "Nejnovější první",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
});
