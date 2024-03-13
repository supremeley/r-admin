import { useDispatch } from 'react-redux';
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';

// import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import type { AuthRoute } from '@/api/sys/interface';
import { dynamicsRoutes } from '@/constants';
import { useAppSelector } from '@/hooks';
import { setMenu, setRoutes } from '@/store/sys';
import { transfrom2Menu } from '@/utils';

// TODO: import routes from '~react-pages';
import { combinRoutes } from './helper';

export const RouterWithLayout = () => {
  const auth = useAppSelector((state) => state.auth);
  const sys = useAppSelector((state) => state.sys);

  const dispatch = useDispatch();
  // const location = useNavigation();

  const beforeEachLoader = () => {
    console.log('check auth');

    // if (window.location.pathname === '/') {
    //   console.log(window.location.pathname);
    //   return redirect('home');
    // }

    if (!auth.token) {
      return redirect('/login');
    }

    console.log('check routes', sys.routes);

    if (!sys.routes.length) {
      // TODO: 后端注入路由
      setTimeout(() => {
        dispatch(setRoutes(dynamicsRoutes));
        dispatch(setMenu(transfrom2Menu(dynamicsRoutes as AuthRoute[])));
      }, 1000);
    } else {
    }

    // TODO:
    return null;
    // return false;
  };

  // const beforeEachLoaderCache = useCallback(() => {
  //   console.log('beforeEachLoaderCache');
  //   return beforeEachLoader();
  // }, [sys.routes]);

  // const [whiteRoutes, setWhiteRoutes] = useState<RouteWithMetaObject[]>([]);
  // const [rootRoutes, setRootRoutes] = useState<RouteWithMetaObject | null>(null);

  useEffect(() => {
    const { rootRoute } = combinRoutes(sys.routes);
    // setWhiteRoutes(whiteList);
    console.log(rootRoute);
    // setRootRoutes(rootRoute);
  }, [sys.routes]);

  // console.log('sys.routes', sys.routes);

  const { whiteList, rootRoute } = combinRoutes(sys.routes);

  // console.log('rootRoute', rootRoute);
  // console.log('rootRoutes', rootRoutes);
  console.log('whiteList', whiteList);

  const routes = createHashRouter(
    [
      ...whiteList,
      {
        ...rootRoute,
        loader: () => {
          console.log('loader');
          return beforeEachLoader();
        },
        // children: [...rootRoute?.children, ...errorList],
      },
      // ...errorList,
    ],
    // { basename: 'work/' },
  );
  // console.log('routes', routes);
  return <RouterProvider router={routes} />;
};
