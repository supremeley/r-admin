import LazyLoadComponent from '@components/LazyLoadComponent';
import Home from '@views/home';
// import Login from '@views/login';
import { Navigate } from 'react-router-dom';

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
    path: '/user',
    element: LazyLoadComponent(lazy(() => import('@/views/user'))),
    meta: {
      title: '用户列表',
    },
  },
  {
    id: 'Login',
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
