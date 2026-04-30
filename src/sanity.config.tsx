"use client";

import React from "react";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { csCZLocale } from "@sanity/locale-cs-cz";
import {
  HomeIcon,
  UserIcon,
  LinkIcon,
  BookIcon,
  TagIcon,
  CogIcon,
  UlistIcon,
  EnvelopeIcon,
} from "@sanity/icons";
import { schemaTypes } from "@/sanity/index";
import { projectId, dataset } from "@/lib/sanity/env";

const HaibazoLogo = () => (
  <span
    style={{
      fontFamily:
        "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 800,
      fontSize: "16px",
      letterSpacing: "0.18em",
      color: "#0B0B0D",
      textTransform: "uppercase",
    }}
  >
    HAIBAZO
  </span>
);

// Singletons — dokumenty, které existují vždy jen v jedné kopii
const singletonTypes = new Set([
  "siteSettings",
  "linktreePage",
  "homepage",
  "aboutPage",
]);

// Skrýt typy, které nejsou přímé dokumenty (objekty)
const hiddenTypes = new Set([
  "blockContent",
  "imageWithAlt",
  "seo",
  "localeString",
  "localeText",
  "localeBlockContent",
]);

function structure(S: StructureBuilder) {
  return S.list()
    .title("Navigace")
    .items([
      // Obsah
      S.listItem()
        .title("Domovská stránka")
        .icon(HomeIcon)
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("O Erikovi")
        .icon(UserIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Linktree (odkaz stránka)")
        .icon(LinkIcon)
        .child(
          S.document().schemaType("linktreePage").documentId("linktreePage"),
        ),
      S.divider(),
      // Kolekce
      S.listItem()
        .title("Recepty")
        .icon(UlistIcon)
        .child(S.documentTypeList("recipe").title("Recepty")),
      S.listItem()
        .title("Kategorie")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Kategorie")),
      S.listItem()
        .title("Články")
        .icon(BookIcon)
        .child(S.documentTypeList("article").title("Články")),
      S.divider(),
      // Newsletter — odběratelé
      S.listItem()
        .title("Newsletter — odběratelé")
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList("newsletterSubscriber")
            .title("Newsletter — odběratelé")
            .defaultOrdering([{ field: "subscribedAt", direction: "desc" }]),
        ),
      S.divider(),
      // Nastavení (dole)
      S.listItem()
        .title("Nastavení webu")
        .icon(CogIcon)
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
  icon: HaibazoLogo,
  studio: {
    components: {
      logo: HaibazoLogo,
    },
  },
  plugins: [structureTool({ structure }), csCZLocale()],
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
