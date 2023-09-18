import cx from 'classnames';

interface LayoutBaseProps {
  children: React.ReactNode;
  className?: string;
}

function LayoutBase({ children, className }: LayoutBaseProps) {
  return (
    <div className={cx('page', className)}>
      <main className="page__main">
        <div className="page-width">
          <div className="page__content">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default LayoutBase;
