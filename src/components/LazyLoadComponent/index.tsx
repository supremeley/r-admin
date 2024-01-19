import { Spin } from '@arco-design/web-react';
import { Suspense } from 'react';

const LazyLoadComponent = (Comp: React.LazyExoticComponent<() => JSX.Element>): React.ReactNode => {
  return (
    <Suspense fallback={<Spin />}>
      <Comp />
    </Suspense>
  );
};

export default LazyLoadComponent;
