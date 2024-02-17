import NotFound from '@views/notFound';

const router: RouteWithMetaObject[] = [
  {
    id: 'NotFound',
    path: '/*',
    element: <NotFound />,
    meta: {
      title: 'not found',
    },
  },
];

export default router;
