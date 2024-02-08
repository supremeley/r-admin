// import { useSelector } from 'react-redux';

// // import { RouterProvider } from 'react-router-dom';
// import { RootState } from '@/store/index';

// import routes from '~react-pages';
import { CombinRoutes } from './helper';

export const RouterWithLayout = () => {
  // const sys = useSelector((state: RootState) => state.sys);

  // return <RouterProvider router={combinRoutes(sys.routes)} />;
  return <CombinRoutes />;
};
