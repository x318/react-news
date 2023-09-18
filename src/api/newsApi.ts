import { SearchArticlesParams, SearchArticlesResponse } from './newsApi.types';

const apiUrl = 'https://gnews.io/api/v4/search';

const apiParams: SearchArticlesParams = {
  apikey: import.meta.env.VITE_NEWS_API_TOKEN,
  lang: 'en',
  country: 'us',
  max: '10',
};

const searchNews = async (search: string, signal: AbortSignal, page = 1) => {
  if (!search) {
    return null;
  }

  const params = new URLSearchParams({ ...apiParams, q: search, page: page.toString() });
  const response = await fetch(`${apiUrl}?${params.toString()}`, { signal });

  const result = await response.json();
  return result as SearchArticlesResponse;
};

export default { searchNews };
