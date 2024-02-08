import { useSelector } from 'react-redux';
import { Outlet, RouterProvider, useMatches, useNavigate } from 'react-router-dom';

// import LazyLoadComponent from '@/components/LazyLoadComponent';
import { RootState } from '@/store/index';

// import routes from '~react-pages';
import { combinRoutes } from './helper';
// import { useAuthRouter } from './useAuthRouter';

export const RouterWithLayout = () => {
  // const [routes, setRoutes] = useState<RouteWithMetaObject[]>([]);
  const sys = useSelector((state: RootState) => state.sys);

  // useAuthRouter();

  // const match = useMatches();
  // console.log(match, 'match');

  // useEffect(() => {}, []);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('addroute');
  //   // if (!auth.token) {
  //   //   navigate('/login'); // 替换为你的登录页面路径
  //   // } else {
  //   setTimeout(() => {
  //     setRoutes([
  //       {
  //         id: 'User',
  //         path: 'user',
  //         element: <Outlet />,
  //         meta: {
  //           title: '用户列表',
  //         },
  //         children: [
  //           {
  //             id: 'UserList',
  //             path: 'list',
  //             element: LazyLoadComponent(lazy(() => import('@/views/user/list/index'))),
  //           },
  //         ],
  //       },
  //       {
  //         id: 'Evaluation',
  //         path: 'evaluation',
  //         element: <Outlet />,
  //         meta: {
  //           title: '评测列表',
  //         },
  //         children: [
  //           {
  //             id: 'EvaluationList',
  //             path: 'list',
  //             element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
  //           },
  //         ],
  //       },
  //     ]);
  //   }, 1000);
  //   // }
  // }, []);

  return <RouterProvider router={combinRoutes(sys.routes)} />;
};
