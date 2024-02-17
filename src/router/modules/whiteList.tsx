// import { Navigate, Outlet } from 'react-router-dom';

// import LazyLoadComponent from '@/components/LazyLoadComponent';
import Login from '@views/login';

// import Home from '@/views/home';

const router: RouteWithMetaObject[] = [
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
