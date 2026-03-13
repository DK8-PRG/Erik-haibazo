import { RecipeCard } from "@/components/cards/RecipeCard";
import { Section } from "@/components/ui/Section";
import { recipes } from "@/lib/mock/recipes";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function RecipesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <Section
      title={dict.recipesPage.title}
      description={dict.recipesPage.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} lang={lang} />
        ))}
      </div>
    </Section>
  );
}
