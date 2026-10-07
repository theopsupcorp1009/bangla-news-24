interface Category {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

interface CategoriesResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  data: Category[];
}