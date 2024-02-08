import Login from '@/views/login';

const router: RouteWithMetaObject[] = [
  {
    id: 'NotFound',
    path: '/*',
    element: <Login />,
    meta: {
      title: 'not found',
    },
  },
];

export default router;
