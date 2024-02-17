// import Home from '@views/home';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, Outlet, redirect, RouterProvider } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';
import type { RootState } from '@/store/index';

// import routes from '~react-pages';
import { combinRoutes } from './helper';

export const RouterWithLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const sys = useSelector((state: RootState) => state.sys);

  const dispatch = useDispatch();

  const authCheck = () => {
    console.log('authCheck', auth.token);

    if (!auth.token) {
      return redirect('login');
    }

    if (!sys.routes.length) {
      setTimeout(() => {
        const routes = [
          {
            id: 'Home',
            path: 'home',
            element: <Navigate to='/user/list' />,
            meta: {
              title: '首页',
              hidden: true,
            },
          },
          {
            id: 'User',
            path: 'user',
            element: <Outlet />,
            meta: {
              title: '用户管理',
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
              title: '评测管理',
            },
            children: [
              {
                id: 'EvaluationList',
                path: 'list',
                element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
              },
              {
                id: 'EvaluationDetail',
                path: 'detail/:id',
                element: LazyLoadComponent(lazy(() => import('@/views/evaluation/detail/index'))),
              },
            ],
          },
          {
            id: 'Manager',
            path: 'manager',
            element: <Outlet />,
            meta: {
              title: '管理员管理',
            },
            children: [
              {
                id: 'ManagerList',
                path: 'list',
                element: LazyLoadComponent(lazy(() => import('@/views/manager/list/index'))),
              },
              {
                id: 'ManagerDetail',
                path: 'detail/:id',
                element: LazyLoadComponent(lazy(() => import('@/views/manager/detail/index'))),
              },
            ],
          },
        ];

        // dispatch({ type: 'auth/setToken', payload: '123123123' });
        dispatch({ type: 'sys/setRoutes', payload: routes });
      }, 1000);
    } else {
    }

    // TODO:
    return null;
    // return redirect("/login");
  };

  const authProvider = useCallback(() => {
    console.log('authProvider');
    return authCheck();
  }, [sys.routes]);

  const { whiteList, rootRoute } = combinRoutes(sys.routes);

  const routes = createBrowserRouter([
    ...whiteList,
    {
      ...rootRoute,
      loader: () => {
        console.log('loader');
        return authProvider();
      },
      // children: [...rootRoute?.children, ...errorList],
    },
    // ...errorList,
  ]);

  return <RouterProvider router={routes} />;
};
