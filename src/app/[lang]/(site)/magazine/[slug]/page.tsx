import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getArticleBySlug } from "@/lib/mock/articles";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const dateLocaleMap: Record<string, string> = { cs: "cs-CZ", en: "en-US" };

type ArticleDetailProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailProps) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.publishedAt).toLocaleDateString(
    dateLocaleMap[lang] ?? "cs-CZ",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <Section>
      <article className="mx-auto max-w-3xl space-y-6">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          {date}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="text-base text-neutral-700">{article.excerpt}</p>
        <div className="space-y-4 text-neutral-700">
          <p>{dict.articleDetail.placeholder}</p>
        </div>
      </article>
    </Section>
  );
}
