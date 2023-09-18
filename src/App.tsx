import { Typography } from 'antd';
import { ArticleList } from '@/components';
import LayoutBase from './layouts/LayoutBase';

function App() {
  return (
    <LayoutBase>
      <Typography.Title className="article-list_title">Search for any news</Typography.Title>
      <ArticleList />
    </LayoutBase>
  );
}

export default App;
