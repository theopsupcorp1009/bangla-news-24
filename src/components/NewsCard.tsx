import Link from "next/link";
import Image from "next/image";
import { SectionArticle } from "@/types/Sections";

interface NewsCardPropsType {
  article: SectionArticle;
}

const NewsCard = ({ article }: NewsCardPropsType) => {
  return (
    <div className="border border-gray-200 shadow-sm rounded-2xl p-3">
      <Link
        href={`/news/${article.id}`}
        rel="noopener noreferrer"
        className="group flex flex-col justify-between"
      >
        <div>
          <div className="overflow-hidden rounded-sm mb-3">
            <img
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              className="w-full h-auto object-fit group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="text-red-600 text-xs font-semibold block mb-1">
            {article.category}
          </span>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
            {article.description}
          </p>
        </div>
        <span className="text-xs text-gray-400">
          {article.firstPublished
            ? new Date(article.firstPublished).toLocaleString("bn-BD", {
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
    </div>
  );
};

export default NewsCard;
