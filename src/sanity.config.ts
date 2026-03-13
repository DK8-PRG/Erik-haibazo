"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import { csCZLocale } from "@sanity/locale-cs-cz";
import { schemaTypes } from "@/sanity/index";
import { projectId, dataset } from "@/lib/sanity/env";

// Singletons — dokumenty, které existují vždy jen v jedné kopii
const singletonTypes = new Set([
  "siteSettings",
  "linktreePage",
  "homepage",
  "aboutPage",
]);

// Skrýt typy, které nejsou přímé dokumenty (objekty)
const hiddenTypes = new Set(["blockContent", "imageWithAlt", "seo"]);

function structure(S: StructureBuilder) {
  return S.list()
    .title("Navigace")
    .items([
      // Obsah
      S.listItem()
        .title("Domovská stránka")
        .icon(() => "🏠")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("O Erikovi")
        .icon(() => "👤")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Linktree (odkaz stránka)")
        .icon(() => "🔗")
        .child(
          S.document().schemaType("linktreePage").documentId("linktreePage"),
        ),
      S.divider(),
      // Kolekce
      S.listItem()
        .title("Recepty")
        .icon(() => "🍜")
        .child(S.documentTypeList("recipe").title("Recepty")),
      S.listItem()
        .title("Kategorie")
        .icon(() => "🏷️")
        .child(S.documentTypeList("category").title("Kategorie")),
      S.listItem()
        .title("Články")
        .icon(() => "📰")
        .child(S.documentTypeList("article").title("Články")),
      S.divider(),
      // Nastavení (dole)
      S.listItem()
        .title("Nastavení webu")
        .icon(() => "⚙️")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
}

export default defineConfig({
  name: "haibazo-studio",
  title: "Haibazo Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), colorInput(), csCZLocale()],
  schema: {
    types: schemaTypes,
    // Skryj singleton a object typy z "New document" menu
    templates: (templates) =>
      templates.filter(
        (t) =>
          !singletonTypes.has(t.schemaType) && !hiddenTypes.has(t.schemaType),
      ),
  },
});
