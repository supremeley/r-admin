import { RouterProvider } from 'react-router-dom';

// import routes from '~react-pages';
import { combinRoutes } from './helper';

export const RouterWithLayout = () => {
  return <RouterProvider router={combinRoutes()} />;
};
