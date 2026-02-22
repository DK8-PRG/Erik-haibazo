import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const date = new Date(article.publishedAt).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-sm">
      <Link href={`/magazine/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs uppercase tracking-wider text-neutral-500">{date}</p>
          <h3 className="text-xl leading-snug text-[#111111]">{article.title}</h3>
          <p className="text-sm text-neutral-700">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
