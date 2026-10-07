interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: "article" | "video" | "link";
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

interface NewsResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  total: number;
  limit: number;
  offset: number;
  data: NewsItem[];
}