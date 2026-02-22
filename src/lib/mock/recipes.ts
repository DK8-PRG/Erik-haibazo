import { Recipe } from "@/lib/types";

export const recipes: Recipe[] = [
  {
    title: "Rychly Pho Bo za 35 minut",
    slug: "rychly-pho-bo",
    coverImage:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",
    timeMinutes: 35,
    category: "Pho",
    excerpt:
      "Vyvar s jasnou chuti, tenke platky hoveziho a bylinky na zaver."
  },
  {
    title: "Banh Mi s krupavym tofu",
    slug: "banh-mi-tofu",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    timeMinutes: 25,
    category: "Street food",
    excerpt: "Lehky sendvic s piklovanou zeleninou a pikantni majonezou."
  },
  {
    title: "Kokosove curry s lilkem",
    slug: "kokosove-curry-lilek",
    coverImage:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
    timeMinutes: 30,
    category: "Vegan",
    excerpt: "Kremove curry, ktere zvladnes behem jednoho vecera po praci."
  },
  {
    title: "Ryzove nudle s krevetami",
    slug: "ryzove-nudle-krevety",
    coverImage:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    timeMinutes: 20,
    category: "Quick",
    excerpt: "Svezi wok styl s limetou, chilli a koriandrem."
  },
  {
    title: "Krupave jarni zavitky",
    slug: "jarni-zavitky",
    coverImage:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    timeMinutes: 40,
    category: "Street food",
    excerpt: "Domaci zavitky se sladko-kyselym dipem a cerstvymi bylinkami."
  },
  {
    title: "Salat z papaji se sezamem",
    slug: "salat-z-papaji",
    coverImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    timeMinutes: 15,
    category: "Quick",
    excerpt: "Krupavy, svezi a lehce palivy salat pro horke dny."
  }
];

export const getRecipeBySlug = (slug: string) => recipes.find((item) => item.slug === slug);
