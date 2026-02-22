import { Article } from "@/lib/types";

export const articles: Article[] = [
  {
    title: "Jak postavit domaci pantry pro asijskou kuchyni",
    slug: "domaci-pantry",
    coverImage:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2026-01-20",
    excerpt:
      "Zakladni omacky, pasty a koreni, ktere pokryji 80 % mych receptu."
  },
  {
    title: "Street food trend report: co varit doma",
    slug: "street-food-trendy",
    coverImage:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2026-01-09",
    excerpt:
      "Nejzajimavejsi chute z trhu, ktere davaji smysl i v domaci kuchyni."
  },
  {
    title: "Meal prep: 5 obedu do krabicky za hodinu",
    slug: "meal-prep-krabicky",
    coverImage:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2025-12-15",
    excerpt: "Prakticky system, jak varit mene casto a jist lepe cely tyden."
  },
  {
    title: "5 chyb, ktere nici domaci ramen",
    slug: "chyby-domaci-ramen",
    coverImage:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2025-11-28",
    excerpt: "Od textury nudli po vrstveni umami. Tohle jsou nejcastejsi preslapy."
  },
  {
    title: "Fermentace doma: kimchi bez slozitosti",
    slug: "fermentace-kimchi-doma",
    coverImage:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2025-11-10",
    excerpt: "Prakticky postup, jak mit stabilni vysledek i v domacich podminkach."
  },
  {
    title: "Jak vrstvit chut v rychlych omackach",
    slug: "vrstveni-chuti-omacky",
    coverImage:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=80",
    publishedAt: "2025-10-30",
    excerpt: "Kyselost, sladkost, umami a heat: jednoducha mapa pro kazdodenni vareni."
  }
];

export const getArticleBySlug = (slug: string) =>
  articles.find((item) => item.slug === slug);
