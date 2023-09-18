import { Fragment, useCallback, useRef } from 'react';
import { Input, Spin } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useInfiniteQuery } from '@tanstack/react-query';

import newsApi from '@/api/newsApi';
import { SearchArticlesResponse } from '@/api/newsApi.types';
import useUrlState from '@/hooks/useSearchParams';
import ArticleCard from './ui/ArticleCard';
import NothingFound from './ui/NothingFound';
import Error from './ui/Error';
import './ArticleList.scss';

const getNextPageParam = (lastPage: SearchArticlesResponse, pages: SearchArticlesResponse[]) => {
  if (!lastPage || 'errors' in lastPage) {
    return 1;
  }

  const totalPages = Math.ceil(lastPage.totalArticles / (pages.length * 10));
  if (totalPages === pages.length) {
    return null;
  }

  return pages.length + 1;
};

function ArticleList() {
  const [debouncedSearch, search, setSearch] = useUrlState('', 'search', 300);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['news', ...debouncedSearch],
    queryFn: ({ pageParam, signal }) => newsApi.searchNews(debouncedSearch, signal, pageParam),
    getNextPageParam,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const intObserver = useRef<IntersectionObserver>(null);
  const intersectionCallback = useCallback(
    (item: HTMLDivElement) => {
      if (isFetching) {
        return;
      }

      if (intObserver.current) {
        intObserver.current.disconnect();
      }

      intObserver.current = new IntersectionObserver((t) => {
        if (t[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (item) {
        intObserver.current.observe(item);
      }
    },
    [isFetching, fetchNextPage, hasNextPage],
  );

  const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handeClear = () => {
    setSearch('');
  };

  return (
    <div className="article-list">
      <div className="article-list_inner">
        <Input
          prefix={<SearchOutlined />}
          suffix={search && <CloseOutlined onClick={handeClear} />}
          size="large"
          placeholder="Search news..."
          value={search}
          onChange={handeChange}
        />
        <Spin tip="Loading" size="large" spinning={isFetching}>
          <div className="article-list_content">
            {data?.pages.map((group, pageIdx) =>
              group?.errors ? (
                <Error key="error" errors={group.errors} />
              ) : !group?.articles?.length ? (
                <NothingFound key="not-found" />
              ) : (
                <Fragment key={pageIdx}>
                  {group?.articles?.map((article, idx) => (
                    <ArticleCard
                      key={idx}
                      ref={
                        data.pages.length - 1 === pageIdx && group.articles.length - 1 === idx
                          ? intersectionCallback
                          : null
                      }
                      {...article}
                    />
                  ))}
                </Fragment>
              ),
            )}
          </div>
        </Spin>
      </div>
      {isFetchingNextPage && (
        <div className="article-list_load-more">
          <p>Loading more...</p>
        </div>
      )}
    </div>
  );
}

export default ArticleList;
