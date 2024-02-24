import LazyLoadComponent from '@components/LazyLoadComponent';
import { Outlet } from 'react-router-dom';

export const dynamicsRoutes: RouteWithMetaObject[] = [
  // {
  //   // id: 1,
  //   id: 'Home',
  //   path: 'home',
  //   element: <Navigate to='/user/list' />,
  //   meta: {
  //     title: '首页',
  //     icon: 'r-ph-anchor-simple-thin',
  //     hidden: true,
  //   },
  // },
  {
    // id: 2,
    id: 'User',
    path: 'user',
    element: <Outlet />,
    meta: {
      title: '用户',
      icon: 'r-ph-anchor-simple-thin',
    },
    children: [
      {
        // id: 3,
        id: 'UserList',
        path: 'list',
        meta: {
          title: '用户管理',
          icon: 'r-ph-anchor-simple-thin',
        },
        element: LazyLoadComponent(lazy(() => import('@/views/user/list/index'))),
      },
    ],
  },
  {
    // id: 4,
    id: 'Evaluation',
    path: 'evaluation',
    element: <Outlet />,
    meta: {
      title: '评测',
      icon: 'r-ph-anchor-simple-thin',
    },
    children: [
      {
        // id: 5,
        id: 'EvaluationList',
        path: 'list',
        params: { type: 1 },
        meta: {
          title: '评测管理',
          icon: 'r-ph-anchor-simple-thin',
        },
        element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
      },
      {
        // id: 6,
        id: 'CustomEvaluationList',
        path: 'list',
        params: { type: 2 },
        meta: {
          title: '自定义评测',
          icon: 'r-ph-anchor-simple-thin',
        },
        element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
      },
      {
        // id: 7,
        id: 'EvaluationDetail',
        path: 'detail/:id',
        meta: {
          title: '评测详情',
          hidden: true,
        },
        element: LazyLoadComponent(lazy(() => import('@/views/evaluation/detail/index'))),
      },
    ],
  },
  {
    // id: 8,
    id: 'Manager',
    path: 'manager',
    element: <Outlet />,
    meta: {
      title: '管理员',
      icon: 'r-ph-anchor-simple-thin',
    },
    children: [
      {
        // id: 9,
        id: 'ManagerList',
        path: 'list',
        meta: {
          title: '管理员列表',
          icon: 'r-ph-anchor-simple-thin',
        },
        element: LazyLoadComponent(lazy(() => import('@/views/manager/list/index'))),
      },
      {
        // id: 10,
        id: 'ManagerDetail',
        path: 'detail/:id',
        meta: {
          title: '管理员详情',
          hidden: true,
        },
        element: LazyLoadComponent(lazy(() => import('@/views/manager/detail/index'))),
      },
    ],
  },
];
