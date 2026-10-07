import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import { NewsSection, NewsSectionsResponse, SectionArticle } from "@/types/Sections";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data: NewsSectionsResponse = await res.json();
  const sections: NewsSection[] = data.data;
  const mainNews: SectionArticle[] = sections[0].articles;
  const otherSections: NewsSection[] = sections.slice(1);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto p-3 sm:p-2 md:p-0 lg:p-0">
        <div className="lg:col-span-2">
          <MainNews news={mainNews}/>
          <div className="grid gap-5 mt-5">
            {
            otherSections.map((section: NewsSection)=><div key={section.curationId}>
              <h1 className="font-bold py-2 border-b-2 border-red-800">{section.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                {
                section.articles.map((article: SectionArticle)=><NewsCard key={article.id} article={article} />)
                }
              </div>
            </div>)
          }
          </div>
        </div>

        <div className="col-span-1 mt-4">
          <MostRead/>
        </div>
      </div>
    </div>
  );
}
