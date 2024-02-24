// import LazyLoadComponent from '@/components/LazyLoadComponent';
import Login from '@views/login';
import { Navigate } from 'react-router-dom';

// import Home from '@/views/home';

const router: RouteWithMetaObject[] = [
  {
    // id: 1,
    id: 'Home',
    path: '/home',
    element: <Navigate to='/user/list' />,
    meta: {
      title: '首页',
      icon: 'r-ph-anchor-simple-thin',
      hidden: true,
    },
  },
  {
    id: 'Login',
    path: 'login',
    element: <Login />,
    meta: {
      title: '登录',
    },
  },
];

export default router;
