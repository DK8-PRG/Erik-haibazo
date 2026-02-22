import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/types";

type MagazineFeaturedSplitProps = {
  featured: Article;
  items: Article[];
};

export function MagazineFeaturedSplit({ featured, items }: MagazineFeaturedSplitProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
        <Link href={`/magazine/${featured.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={featured.coverImage} alt={featured.title} fill className="object-cover transition duration-300 hover:scale-[1.03]" />
          </div>
          <div className="space-y-3 p-5 sm:p-6">
            <span className="inline-flex rounded-full bg-[#FFD23F] px-3 py-1 text-xs font-semibold text-[#111111]">Featured</span>
            <h3 className="text-3xl leading-tight text-[#111111]">{featured.title}</h3>
            <p className="text-sm text-neutral-700 sm:text-base">{featured.excerpt}</p>
          </div>
        </Link>
      </article>

      <div className="space-y-3 sm:space-y-4">
        {items.map((article) => {
          const date = new Date(article.publishedAt).toLocaleDateString("cs-CZ", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });

          return (
            <article key={article.slug} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <Link href={`/magazine/${article.slug}`} className="grid grid-cols-[80px_1fr] gap-3 p-3 sm:grid-cols-[92px_1fr] sm:p-4">
                <div className="relative h-20 overflow-hidden rounded-xl sm:h-24">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">{date}</p>
                  <h4 className="mt-1 line-clamp-2 text-lg leading-snug text-[#111111]">{article.title}</h4>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
