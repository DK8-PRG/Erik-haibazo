import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";

type FeaturedArticleCardProps = {
  article: Article;
};

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:shadow-sm">
      <Link href={`/magazine/${article.slug}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/8]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-3 p-5 sm:p-8">
          <span className="inline-flex rounded-full bg-[#FFD23F] px-3 py-1 text-xs font-semibold text-[#111111]">Featured</span>
          <h3 className="max-w-3xl text-3xl leading-tight sm:text-4xl">{article.title}</h3>
          <p className="max-w-3xl text-sm text-neutral-700 sm:text-base">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
