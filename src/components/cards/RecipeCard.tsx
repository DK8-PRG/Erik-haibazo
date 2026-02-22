import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/lib/types";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-sm">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.coverImage}
            alt={recipe.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-[#FFD23F] px-2.5 py-1 text-xs font-semibold text-[#111111]">
            {recipe.category}
          </span>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="text-xl leading-snug text-[#111111]">{recipe.title}</h3>
          <p className="text-sm text-neutral-700">{recipe.excerpt}</p>
          <p className="text-xs uppercase tracking-wider text-neutral-500">{recipe.timeMinutes} min</p>
        </div>
      </Link>
    </article>
  );
}
