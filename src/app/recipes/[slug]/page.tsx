import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getRecipeBySlug } from "@/lib/mock/recipes";

type RecipeDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipeDetailPage({ params }: RecipeDetailProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <Section>
      <article className="mx-auto max-w-3xl space-y-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
          <Image src={recipe.coverImage} alt={recipe.title} fill className="object-cover" />
        </div>
        <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
          {recipe.category}
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{recipe.title}</h1>
        <p className="text-sm uppercase tracking-wider text-neutral-500">{recipe.timeMinutes} minut</p>
        <p className="text-base text-neutral-700">{recipe.excerpt}</p>
        <div className="space-y-4 text-neutral-700">
          <p>
            Tohle je staticky detail receptu pripraveny pro budouci napojeni na CMS. Struktura stranky uz nyni pocita
            s obsahem typu ingredience, kroky a tipy.
          </p>
        </div>
      </article>
    </Section>
  );
}
