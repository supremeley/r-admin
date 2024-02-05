import Login from '@/views/login';

const router: RouteWithMetaObject[] = [
  {
    id: 'Login',
    path: 'login',
    element: <Login />,
    meta: {
      title: '登录',
      needLazyLoad: true,
    },
  },
];

export default router;
