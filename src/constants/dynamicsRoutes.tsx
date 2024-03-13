import LazyLoadComponent from '@components/LazyLoadComponent';
import { Outlet } from 'react-router-dom';

import errorRoutes from '@/router/modules/errorList';
import whiteRoutes from '@/router/modules/whiteList';

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
      icon: 'i-material-symbols:person',
    },
    children: [
      {
        // id: 3,
        id: 'UserList',
        path: 'list',
        meta: {
          title: '用户管理',
          icon: 'i-material-symbols:data-table',
        },
        element: LazyLoadComponent(lazy(() => import('@/views/user/list/index'))),
      },
      {
        // id: 7,
        id: 'UserDetail',
        path: 'detail/:id',
        meta: {
          title: '用户详情',
          icon: 'i-material-symbols:data-table',
          hidden: true,
        },
        element: LazyLoadComponent(lazy(() => import('@/views/user/detail/index'))),
      },
      {
        // id: 4,
        id: 'UserExamRecord',
        path: 'exam/:id',
        meta: {
          title: '用户评测记录',
          icon: 'i-material-symbols:data-table',
          hidden: true,
        },
        element: LazyLoadComponent(lazy(() => import('@/views/exam/list/index'))),
      },
      {
        // id: 4,
        id: 'UserExamDetail',
        path: 'exam/detail/:id',
        meta: {
          title: '用户评测详情',
          icon: 'i-material-symbols:data-table',
          hidden: true,
        },
        element: LazyLoadComponent(lazy(() => import('@views/exam/detail/index'))),
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
      icon: 'i-material-symbols:clinical-notes-outline',
    },
    children: [
      {
        // id: 5,
        id: 'EvaluationList',
        path: 'list',
        params: { type: 1 },
        meta: {
          title: '评测管理',
          icon: 'i-material-symbols:data-table',
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
          icon: 'i-material-symbols:inbox-customize-sharp',
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
      icon: 'i-material-symbols:manage-accounts',
    },
    children: [
      {
        // id: 9,
        id: 'ManagerList',
        path: 'list',
        meta: {
          title: '管理员列表',
          icon: 'i-material-symbols:data-table',
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
  {
    // id: 7,
    id: 'Exam',
    path: 'exam',
    meta: {
      title: '用户评测管理',
      hidden: true,
    },
    element: <Outlet />,
    children: [
      {
        // id: 5,
        id: 'ExamDetail',
        path: 'detail/:id',
        // meta: {
        //   title: '用户评测详情',
        // },
        element: LazyLoadComponent(lazy(() => import('@views/exam/detail/index'))),
      },
    ],
  },
];

export const mockRoutes = [
  ...whiteRoutes,
  {
    id: 'Root',
    path: '/',
    element: <Outlet />,
    children: dynamicsRoutes,
  },
  ...errorRoutes,
];
