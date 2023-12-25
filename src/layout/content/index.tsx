import './index.scss';

import { Outlet } from 'react-router-dom';

const LayoutContent = () => {
  return (
    <>
      <Outlet />
      {/* <Suspense fallback={<p>Loading...</p>}>
          <Test></Test>
        </Suspense> */}
    </>
  );
};

export default LayoutContent;
