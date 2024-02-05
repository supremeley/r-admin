import { Navigate, Outlet } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';
import Home from '@/views/home';

const router: RouteWithMetaObject[] = [
  {
    id: 'Root',
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    id: 'Home',
    path: '/home',
    element: <Home />,
    meta: {
      title: '首页',
    },
  },
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

export default router;
