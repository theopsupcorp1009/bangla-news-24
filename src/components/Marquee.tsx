import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news");
  const data: NewsResponse = await res.json();
  const headlines: NewsItem[] = data.data;

  return (
    <div className="bg-red-700 text-white py-1 mt-5">
      <div className="max-w-7xl mx-auto flex gap-2 items-center px-4.5 md:px-0 lg:px-0">
        <div className="bg-red-800 py-1">
        <h2 className="px-5 font-bold">সর্বশেষ</h2>
      </div>
      <MarqueeText direction="right" duration={10}>
        {headlines.map((headline: NewsItem) => (
        <Link href={`/news/${headline.id}`} className="hover:underline" key={headline.id}>
          <span>{headline.title}</span>
          <span className="mx-5">•</span>
        </Link>
      ))}
      </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
