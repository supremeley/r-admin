import './index.scss';

import { Outlet } from 'react-router-dom';

const LayoutContent = () => {
  return (
    <section className='main'>
      <Outlet />
    </section>
  );
};

export default LayoutContent;
