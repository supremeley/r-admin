import { useDispatch, useSelector } from 'react-redux';
import { Outlet, redirect } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';
import type { RootState } from '@/store/index';

export const useAuthRouter = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const sys = useSelector((state: RootState) => state.sys);

  const dispatch = useDispatch();

  console.log('useAuthRouter', auth);

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

  return '/home';
};
