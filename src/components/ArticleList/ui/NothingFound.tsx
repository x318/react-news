import { Empty } from 'antd';

import './NothingFound.scss';

function NothingFound() {
  return (
    <div className="article-list__nothing-found">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing found" />
    </div>
  );
}

export default NothingFound;
