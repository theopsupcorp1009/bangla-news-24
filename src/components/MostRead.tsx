import Link from "next/link";
import React from "react";

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news = data.data;

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200/80 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
        সর্বাধিক পঠিত
      </h3>
      <div className="space-y-4">
        {news.map((item: any, index: number) => (
          <Link
            key={item.id || index}
            href={`/news/${item.id}`}
            rel="noopener noreferrer"
            className="group flex items-start gap-3.5"
          >
            <span className="text-lg font-bold text-red-600 min-w-[20px] shrink-0 pt-0.5">
              {index + 1}
            </span>
            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
              {item.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
