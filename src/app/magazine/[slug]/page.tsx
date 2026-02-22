import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getArticleBySlug } from "@/lib/mock/articles";

type ArticleDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.publishedAt).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <Section>
      <article className="mx-auto max-w-3xl space-y-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
        </div>
        <p className="text-xs uppercase tracking-wider text-neutral-500">{date}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{article.title}</h1>
        <p className="text-base text-neutral-700">{article.excerpt}</p>
        <div className="space-y-4 text-neutral-700">
          <p>
            Detail clanku je zatim staticky. Struktura je pripravena pro napojeni na CMS obsah vcetne rich textu,
            sekci a doporucenych odkazu.
          </p>
        </div>
      </article>
    </Section>
  );
}
