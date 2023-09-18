export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface SearchArticlesParams {
  apikey: string;
  lang: string;
  country: string;
  max?: string;
  page?: string;
}

export interface SearchArticlesResponse {
  totalArticles: number;
  articles: Article[];
  errors?: string[];
}
