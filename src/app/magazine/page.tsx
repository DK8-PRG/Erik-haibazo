import { ArticleCard } from "@/components/cards/ArticleCard";
import { Section } from "@/components/ui/Section";
import { articles } from "@/lib/mock/articles";

export default function MagazinePage() {
  return (
    <Section title="Magazin" description="Clanky o technikach, trendech a kuchynskych workflow.">
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </Section>
  );
}
