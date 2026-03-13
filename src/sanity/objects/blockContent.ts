import { defineType, defineArrayMember } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normální text", value: "normal" },
        { title: "Nadpis H2", value: "h2" },
        { title: "Nadpis H3", value: "h3" },
        { title: "Citace", value: "blockquote" },
      ],
      lists: [
        { title: "Odrážky", value: "bullet" },
        { title: "Číslování", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Tučné", value: "strong" },
          { title: "Kurzíva", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Odkaz",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto"] }),
              },
              {
                name: "blank",
                type: "boolean",
                title: "Otevřít v novém okně",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternativní text",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Popisek obrázku",
        },
      ],
    }),
  ],
});
