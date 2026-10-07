// types/news.ts

export interface SectionArticle {
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

export interface NewsSection {
  title: string;
  curationId: string;
  curationType: "tipo-curation" | "vivo-stream";
  link: string | null;
  count: number;
  articles: SectionArticle[];
}

export interface NewsSectionsResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  data: NewsSection[];
}

export interface NewsCategoryResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  slug: string;
  topicId: string;
  title: string;
  page: number;
  pageCount: number;
  data: SectionArticle[];
}

// Flexible block because the API body can contain
// different kinds of blocks.
export interface ArticleBlock {
  type?: string;
  text?: string;
  title?: string;
  caption?: string;
  alt?: string;
  url?: string;
  imageUrl?: string;
  src?: string;
  href?: string;
  [key: string]: unknown;
}

export interface ArticleDescription {
  blocks: ArticleBlock[];
}

export interface ArticleDetails {
  id: string;
  title: string;

  description: ArticleDescription | null;

  link: string;

  imageUrl: string;
  imageAlt: string;

  category: string;
  type: "article" | "video" | "link";
  isLive: boolean;

  firstPublished: string | null;
  lastPublished: string | null;

  source: string;
  sourceUrl: string;

  text: string;

  body: ArticleBlock[];

  byline: unknown[];
  tags: string[];
  topics: unknown[];

  wordCount: number;
}

export interface ArticleResponse {
  success: boolean;
  cachedAt: string;
  data: ArticleDetails;
}