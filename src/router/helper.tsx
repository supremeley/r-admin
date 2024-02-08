import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/index';

import { useAuthRouter } from './useAuthRouter';

const whiteListModules = import.meta.glob('./modules/!(errorList).tsx');
const errorListModules = import.meta.glob('./modules/errorList.tsx');

export const routerList: RouteWithMetaObject[] = [];
export const errorList: RouteWithMetaObject[] = [];

for (const path in whiteListModules) {
  const mod = (await whiteListModules[path]()) as { default: RouteWithMetaObject[] };

  routerList.push(...mod.default);
}

for (const path in errorListModules) {
  const mod = (await errorListModules[path]()) as { default: RouteWithMetaObject[] };

  errorList.push(...mod.default);
}

export const combinRoutes = (router: RouteWithMetaObject[]) => {
  return createBrowserRouter([
    {
      id: 'Root',
      path: '/',
      loader: () => {
        console.log('loader');
        return false;
        // return useAuthRouter();
      },
      element: <div>root</div>,
      children: [
        {
          element: <Layout />,
          children: [...routerList, ...router],
        },
        ...errorList,
      ],
    },
  ]);
};
