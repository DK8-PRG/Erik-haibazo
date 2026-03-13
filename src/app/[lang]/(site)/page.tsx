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
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const featuredArticle = articles[0];
  const magazineItems = articles.slice(1);
  const recipePreview = recipes.slice(0, 6);

  return (
    <>
      <Hero dict={dict.hero} lang={lang} />
      <PartnerLogosRow dict={dict.partners} />

      <Section
        className="bg-[#F3F3F3]"
        title={dict.magazineSection.title}
        description={dict.magazineSection.description}
      >
        <MagazineFeaturedSplit
          featured={featuredArticle}
          items={magazineItems}
          featuredLabel={dict.magazineSection.featured}
          lang={lang}
        />
      </Section>

      <Section
        className="bg-white"
        title={dict.recipesSection.title}
        description={dict.recipesSection.description}
      >
        <div className="mb-6">
          <TagPills />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipePreview.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} lang={lang} />
          ))}
        </div>
        <div className="mt-8">
          <Button href={`/${lang}/recipes`}>
            {dict.recipesSection.showAll}
          </Button>
        </div>
      </Section>

      <AboutFollowSection dict={dict.aboutFollow} lang={lang} />
    </>
  );
}
