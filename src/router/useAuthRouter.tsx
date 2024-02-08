import { useDispatch, useSelector } from 'react-redux';
import { Outlet, RouterProvider, useMatches, useNavigate } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';
import { RootState } from '@/store/index';

export const useAuthRouter = () => {
  // const [routes, setRoutes] = useState<RouteWithMetaObject[]>([]);
  // const auth = useSelector((state: RootState) => state.auth);
  // const match = useMatches();
  const dispatch = useDispatch();
  // console.log(match, 'match');
  // useEffect(() => {}, []);
  // const navigate = useNavigate();

  // useEffect(() => {
  console.log('addroute');
  // if (!auth.token) {
  //   navigate('/login'); // 替换为你的登录页面路径
  // } else {
  setTimeout(() => {
    const routes = [
      {
        id: 'User',
        path: 'user',
        element: <Outlet />,
        meta: {
          title: '用户列表',
        },
        children: [
          {
            id: 'UserList',
            path: 'list',
            element: LazyLoadComponent(lazy(() => import('@/views/user/list/index'))),
          },
        ],
      },
      {
        id: 'Evaluation',
        path: 'evaluation',
        element: <Outlet />,
        meta: {
          title: '评测列表',
        },
        children: [
          {
            id: 'EvaluationList',
            path: 'list',
            element: LazyLoadComponent(lazy(() => import('@/views/evaluation/list/index'))),
          },
        ],
      },
    ];

    dispatch({ type: 'sys/setRoutes', payload: routes });
  }, 1000);
  // }
  // }, []);

  return '/home';
};
