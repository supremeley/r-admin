// import LazyLoadComponent from '@components/LazyLoadComponent';
// import React from 'react';
// import HomePage from '@views/home';
// import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const routerModules = import.meta.glob('./modules/*.tsx');

// console.log("routerModules",routerModules);

export const routerList: RouteWithMetaObject[] = [];

for (const path in routerModules) {
  const mod = (await routerModules[path]()) as { default: RouteWithMetaObject[] };

  routerList.push(...mod.default);
}

console.log('routerList', routerList);

export const combinRoutes = (layout: JSX.Element) => {
  const staticRoutes = routerHandler(routerList);
  console.log('staticRoutes', staticRoutes);

  return createBrowserRouter([
    {
      element: layout,
      children: [...staticRoutes],
    },
  ]);
};

export const routerHandler = (routes: RouteWithMetaObject[]): RouteWithMetaObject[] => {
  return routes.map((item) => {
    const children = item.children?.length ? routerHandler(item.children) : undefined;
    // console.log('item', item);
    // if (item.element) {
    //   console.log(item.element);
    //   console.log(lazy(() => import('@/views/home/index')));
    // }

    // if (children) {
    //   return {
    //     ...item,
    //     children,
    //     element: <Suspense fallback={<p>loading...</p>}>123</Suspense>,
    //     // <Suspense fallback={<p>loading...</p>}>{item.element}</Suspense>
    //     // item.element ?? LazyLoadComponent(React.lazy(() => import('@/views/home/index'))),
    //     // item.element ?? LazyLoadComponent(item.element),
    //   };
    // }

    return {
      ...item,
      // name: item.id,
      children,
      // element: item.meta?.needLazyLoad ? LazyLoadComponent(item.element) : item.element,
    };
  }) as RouteWithMetaObject[];
};
