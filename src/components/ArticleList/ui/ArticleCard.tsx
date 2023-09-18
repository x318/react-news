import { forwardRef } from 'react';
import { Card } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

import { Article } from '@/api/newsApi.types';
import './ArticleCard.scss';

export type ArticleCardProps = Article;

const ArticleCard = forwardRef<HTMLDivElement, ArticleCardProps>((props, forwardedRef) => {
  const { title, description, content, image, url, publishedAt, source } = props;

  return (
    <Card
      ref={forwardedRef}
      className="article-list__article-card"
      title={
        <a href={url} target="_blank" rel="noreferrer" className="article-list__article-card_link">
          {title}
          <LinkOutlined />
        </a>
      }
      bordered={false}
    >
      <img className="article-list__article-card_image" src={image} alt={title} />
      <p className="article-list__article-card_description">{description}</p>
      <div className="article-list__article-card_bottom">
        <a href={source.url} className="article-list__article-card_src">
          {source.name}
        </a>
        <div className="article-list__article-card_date">
          {new Date(publishedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: '2-digit' })}
        </div>
      </div>
    </Card>
  );
});

export default ArticleCard;
