import { MehOutlined } from '@ant-design/icons';

import './Error.scss';

interface ErrorProps {
  errors: string[];
}

function Error({ errors }: ErrorProps) {
  return (
    <div className="article-list__error">
      <MehOutlined className="article-list__error_icon" />
      <p>{errors.join('. ')}</p>
    </div>
  );
}

export default Error;
