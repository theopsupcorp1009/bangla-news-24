import { SectionArticle } from "@/types/Sections";
import Link from "next/link";
import React from "react";

interface MainNewsPropsType {
  news: SectionArticle[];
}

const MainNews = ({ news }: MainNewsPropsType) => {
  if (!news || news.length === 0) return null;

  const [heroArticle, ...sideArticles] = news;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-md border border-gray-200">
      {heroArticle && (
        <Link
          href={`/news/${heroArticle.id}`}
          rel="noopener noreferrer"
          className="group flex flex-col justify-between"
        >
          <div>
            <div className="overflow-hidden rounded-sm mb-3">
              <img
                src={heroArticle.imageUrl}
                alt={heroArticle.imageAlt || heroArticle.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-red-600 text-xs font-semibold block mb-1">
              {heroArticle.category}
            </span>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
              {heroArticle.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
              {heroArticle.description}
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {heroArticle.firstPublished
              ? new Date(heroArticle.firstPublished).toLocaleString("bn-BD", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : ""}
          </span>
        </Link>
      )}

      <hr className="md:hidden lg:hidden border-b border-gray-100" />

      {/* Side Articles List */}
      <div className="flex flex-col gap-3 divide-y divide-gray-100">
        {sideArticles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.id}`}
            rel="noopener noreferrer"
            className="border border-gray-200 shadow-sm p-3 space rounded-xl"
          >
            <h2 className="text-red-600 text-xs font-semibold block mb-2">
              {article.category}
            </h2>
            <p className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
              {article.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
