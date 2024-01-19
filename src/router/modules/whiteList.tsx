import LazyLoadComponent from '@components/LazyLoadComponent';
import Home from '@views/home';
// import Login from '@views/login';
import { Navigate } from 'react-router-dom';

const router: RouteWithMetaObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    path: '/home',
    element: <Home />,
    meta: {
      title: '首页',
    },
  },
  {
    path: 'login',
    element: LazyLoadComponent(lazy(() => import('@/views/login'))),
    meta: {
      title: '登录',
      needLazyLoad: true,
    },
    // children: [...staticRoutes],
  },
];

export default router;
