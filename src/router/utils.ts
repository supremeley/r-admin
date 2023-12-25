import { createBrowserRouter, RouteObject } from 'react-router-dom';

export const combinRoutes = (layout: JSX.Element, routes: RouteObject[]) =>
  createBrowserRouter([
    {
      element: layout,
      children: [...routes],
    },
  ]);
