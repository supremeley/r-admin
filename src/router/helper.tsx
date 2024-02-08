import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';
import Layout from '@/layout/index';
import { RootState } from '@/store/index';

// import { useAuthRouter } from './useAuthRouter';

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

export const CombinRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const sys = useSelector((state: RootState) => state.sys);

  // console.log(router);
  const dispatch = useDispatch();

  const authCheck = () => {
    console.log('authCheck');
    if (!auth.token) {
      redirect('/login'); // 替换为你的登录页面路径
    }
    if (!sys.routes.length) {
      setTimeout(() => {
        const routes = [
          {
            id: 'User',
            path: 'user',
            element: <Outlet />,
            meta: {
              title: '用户列表',
            },
            children: [
              {
                id: 'UserList',
                path: 'list',
                element: LazyLoadComponent(lazy(() => import('@/views/user/list/index'))),
              },
            ],
          },
          {
            id: 'Evaluation',
            path: 'evaluation',
            element: <Outlet />,
            meta: {
              title: '评测列表',
            },
            children: [
              {
                id: 'EvaluationList',
                path: 'list',
                element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
              },
            ],
          },
        ];

        dispatch({ type: 'auth/setToken', payload: '123123123' });
        dispatch({ type: 'sys/setRoutes', payload: routes });
      }, 1000);
    } else {
    }
    return 'aa';
  };

  const authProvider = useCallback(() => authCheck(), [sys.routes]);

  const routes = createBrowserRouter([
    ...routerList,
    {
      id: 'Root',
      path: '/',
      loader: () => {
        console.log('loader');
        const res = authProvider();
        return res;
      },
      element: <Outlet />,
      children: [
        {
          element: <Layout />,
          children: [...sys.routes, ...errorList],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};
