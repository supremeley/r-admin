import { Spin } from '@arco-design/web-react';
import { Suspense } from 'react';

const LazyLoadComponent = (Comp: React.LazyExoticComponent<() => JSX.Element>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <div className='w-full h-full flex-center'>
          <Spin block size={72} className='' />
        </div>
      }
    >
      <Comp />
    </Suspense>
  );
};

export default LazyLoadComponent;
