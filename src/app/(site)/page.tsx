import { AboutFollowSection } from "@/components/blocks/AboutFollowSection";
import { Hero } from "@/components/blocks/Hero";
import { MagazineFeaturedSplit } from "@/components/blocks/MagazineFeaturedSplit";
import { PartnerLogosRow } from "@/components/blocks/PartnerLogosRow";
import { RecipeCard } from "@/components/cards/RecipeCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { TagPills } from "@/components/ui/TagPills";
import { articles } from "@/lib/mock/articles";
import { recipes } from "@/lib/mock/recipes";

export default function HomePage() {
  const featuredArticle = articles[0];
  const magazineItems = articles.slice(1);
  const recipePreview = recipes.slice(0, 6);

  return (
    <>
      <Hero />
      <PartnerLogosRow />

      <Section
        className="bg-[#F3F3F3]"
        title="HAIBAZO MAGAZÍN"
        description="Nejnovejsi clanek a trend reporty ze sveta jidla."
      >
        <MagazineFeaturedSplit
          featured={featuredArticle}
          items={magazineItems}
        />
      </Section>

      <Section
        className="bg-white"
        title="Recepty"
        description="Rychle, vyrazne a snadno opakovatelne recepty."
      >
        <div className="mb-6">
          <TagPills />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipePreview.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/recipes">Zobrazit vsechny recepty</Button>
        </div>
      </Section>

      <AboutFollowSection />
    </>
  );
}
