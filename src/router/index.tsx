import { RouterProvider } from 'react-router-dom';

import routes from '~react-pages';

import { combinRoutes } from './utils';

export const RouterWithoutLayout = ({ children: layout }: { children: JSX.Element }) => {
  return <RouterProvider router={combinRoutes(layout, routes)} />;
};
