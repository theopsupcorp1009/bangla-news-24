import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import { NewsCategoryResponse, SectionArticle } from "@/types/Sections";
import { notFound } from "next/navigation";
import React from "react";

type CategoryNewsProps = {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const CategoryNews = async ({
  params,
  searchParams,
}: CategoryNewsProps) => {
  const { categoryId } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(Number(page) || 1, 1);

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  if (!res.ok) {
    notFound();
  }

  const data: NewsCategoryResponse = await res.json();

  if (!data.success || !data.data) {
    notFound();
  }

  const news: SectionArticle[] = data.data;

const newsPerPage = 12;

const totalPages = Math.ceil(news.length / newsPerPage);

const startIndex = (currentPage - 1) * newsPerPage;
const endIndex = startIndex + newsPerPage;

const currentNews = news.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-0 lg:p-0">
      <h1 className="font-bold text-xl py-2 border-b-2 border-red-800">
        {data.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {currentNews.map((n) => (
          <NewsCard key={n.id} article={n} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryNews;