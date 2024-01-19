import { RouteObject } from 'react-router-dom';

declare global {
  interface RouteMetaObject {
    title: string;
    needLazyLoad: boolean;
    needLogin: boolean;
    keepAlive: boolean;
  }

  type RouteWithMetaObject = RouteObject & {
    element: RouteObject['element'] | React.LazyExoticComponent<() => JSX.Element>;
    meta?: Partial<RouteMetaObject>;
    children?: RouteWithMetaObject[];
  };
}
