import { RecipeCard } from "@/components/cards/RecipeCard";
import { Section } from "@/components/ui/Section";
import { recipes } from "@/lib/mock/recipes";

export default function RecipesPage() {
  return (
    <Section title="Recepty" description="Kompletni katalog receptu HAIBAZO.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </Section>
  );
}
