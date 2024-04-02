// import LazyLoadComponent from '@components/LazyLoadComponent';
import ManagerRecord from '@views/manager/record';
import { Outlet } from 'react-router-dom';

import errorRoutes from '@/router/modules/errorList';
import whiteRoutes from '@/router/modules/whiteList';
import EvaluationDetail from '@/views/evaluation/detail/index';
import EvaluationList from '@/views/evaluation/list/index';
import ExamDetail from '@/views/exam/detail/index';
import ExamList from '@/views/exam/list/index';
import ExamRecord from '@/views/exam/record/index';
import ManagerDetail from '@/views/manager/detail/index';
import ManagerList from '@/views/manager/list/index';
import UserDetail from '@/views/user/detail/index';
import UserList from '@/views/user/list/index';

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
        id: 'UserList',
        path: 'list',
        meta: {
          title: '用户管理',
          icon: 'i-material-symbols:data-table',
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/user/list/index'))),
        element: <UserList />,
      },
      {
        id: 'UserDetail',
        path: 'detail/:id',
        meta: {
          title: '用户详情',
          icon: 'i-material-symbols:data-table',
          hidden: true,
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/user/detail/index'))),
        element: <UserDetail />,
      },
      {
        id: 'UserExamRecord',
        path: 'exam/:id',
        meta: {
          title: '用户评测记录',
          icon: 'i-material-symbols:data-table',
          hidden: true,
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/exam/list/index'))),
        element: <ExamList />,
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
        // element: LazyLoadComponent(lazy(() => import('@views/exam/detail/index'))),
        element: <ExamDetail />,
      },
    ],
  },
  {
    id: 'Evaluation',
    path: 'evaluation',
    element: <Outlet />,
    meta: {
      title: '评测',
      icon: 'i-material-symbols:clinical-notes-outline',
    },
    children: [
      {
        id: 'EvaluationList',
        path: 'list',
        params: { type: 1 },
        meta: {
          title: '评测管理',
          icon: 'i-material-symbols:data-table',
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
        element: <EvaluationList />,
      },
      {
        id: 'CustomEvaluationList',
        path: 'list',
        params: { type: 2 },
        meta: {
          title: '自定义评测',
          icon: 'i-material-symbols:inbox-customize-sharp',
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
        element: <EvaluationList />,
      },
      {
        id: 'EvaluationDetail',
        path: 'detail/:id',
        meta: {
          title: '评测详情',
          hidden: true,
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/evaluation/detail/index'))),
        element: <EvaluationDetail />,
      },
    ],
  },
  {
    id: 'Manager',
    path: 'manager',
    element: <Outlet />,
    meta: {
      title: '管理员',
      icon: 'i-material-symbols:manage-accounts',
    },
    children: [
      {
        id: 'ManagerList',
        path: 'list',
        meta: {
          title: '管理员列表',
          icon: 'i-material-symbols:data-table',
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/manager/detail/index'))),
        element: <ManagerList />,
      },
      {
        id: 'ManagerDetail',
        path: 'detail/:id',
        meta: {
          title: '管理员详情',
          hidden: true,
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/manager/detail/index'))),
        element: <ManagerDetail />,
      },
      {
        id: 'ManagerRecord',
        path: 'record/:id',
        meta: {
          title: '管理员操作记录',
          hidden: true,
        },
        // element: LazyLoadComponent(lazy(() => import('@/views/manager/detail/index'))),
        element: <ManagerRecord />,
      },
    ],
  },
  {
    id: 'Exam',
    path: 'exam',
    meta: {
      title: '用户评测管理',
      hidden: true,
    },
    element: <Outlet />,
    children: [
      {
        id: 'ExamDetail',
        path: 'detail/:id',
        // element: LazyLoadComponent(lazy(() => import('@views/exam/detail/index'))),
        element: <ExamDetail />,
      },
      {
        id: 'ExamRecord',
        path: 'record/:id',
        // element: LazyLoadComponent(lazy(() => import('@views/exam/detail/index'))),
        element: <ExamRecord />,
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
