import { linktreePage } from "./documents/linktreePage";
import { siteSettings } from "./documents/siteSettings";
import { homepage } from "./documents/homepage";
import { aboutPage } from "./documents/aboutPage";
import { category } from "./documents/category";
import { recipe } from "./documents/recipe";
import { article } from "./documents/article";
import { blockContent } from "./objects/blockContent";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";

export const schemaTypes = [
  // Objects (sdílené typy)
  blockContent,
  imageWithAlt,
  seo,
  // Documents — singletons
  siteSettings,
  linktreePage,
  homepage,
  aboutPage,
  // Documents — content
  category,
  recipe,
  article,
];
