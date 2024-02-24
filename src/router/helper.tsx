import { Outlet } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';

const whiteListModules = import.meta.glob('./modules/!(errorList).tsx');
const errorListModules = import.meta.glob('./modules/errorList.tsx');

export const whiteList: RouteWithMetaObject[] = [];
export const errorList: RouteWithMetaObject[] = [];

for (const path in whiteListModules) {
  const mod = (await whiteListModules[path]()) as { default: RouteWithMetaObject[] };

  whiteList.push(...mod.default);
}

for (const path in errorListModules) {
  const mod = (await errorListModules[path]()) as { default: RouteWithMetaObject[] };

  errorList.push(...mod.default);
}

export const combinRoutes = (dynamicRoutes: RouteWithMetaObject[]) => {
  const rootRoute: RouteWithMetaObject = {
    id: 'Root',
    path: '/',
    // TODO: loader => action => shouldRevalidate
    // loader: () => {
    //   const res = authProvider();
    //   return res;
    // },
    element: <Outlet />,
    children: [
      {
        element: LazyLoadComponent(lazy(() => import('@/layout/index'))),
        children: [...dynamicRoutes],
      },
      ...errorList,
    ],
  };

  return { whiteList, rootRoute, errorList };
};
