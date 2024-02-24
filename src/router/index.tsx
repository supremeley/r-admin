import { useDispatch } from 'react-redux';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

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

  const beforeEachLoader = () => {
    console.log('check auth');

    if (!auth.token) {
      return redirect('login');
    }

    console.log('check routes');

    if (!sys.routes.length) {
      // TODO: 后端注入路由
      // setTimeout(() => {
      dispatch(setRoutes(dynamicsRoutes));
      dispatch(setMenu(transfrom2Menu(dynamicsRoutes as AuthRoute[])));
      // }, 1000);
    } else {
    }

    // TODO:
    // return null;
    return false;
  };

  const beforeEachLoaderCache = useCallback(() => {
    console.log('beforeEachLoaderCache');
    return beforeEachLoader();
  }, [sys.routes]);

  const { whiteList, rootRoute } = combinRoutes(sys.routes);

  const routes = createBrowserRouter([
    ...whiteList,
    {
      // loader: () => {
      //   console.log('loader');
      //   return beforeEachLoaderCache();
      // },
    },
    {
      ...rootRoute,
      loader: () => {
        console.log('loader');
        return beforeEachLoaderCache();
      },
      // children: [...rootRoute?.children, ...errorList],
    },
    // ...errorList,
  ]);

  return <RouterProvider router={routes} />;
};
