import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout/index';

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

export const combinRoutes = () => {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [...routerList],
    },
    ...errorList,
  ]);
};
