import { ArticleCard } from "@/components/cards/ArticleCard";
import { Section } from "@/components/ui/Section";
import { getArticles } from "@/lib/sanity/queries";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function MagazinePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const articles = await getArticles();

  return (
    <Section
      title={dict.magazinePage.title}
      description={dict.magazinePage.description}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} lang={lang} />
        ))}
      </div>
    </Section>
  );
}
