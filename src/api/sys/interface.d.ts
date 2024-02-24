export interface Premission {
  route: AuthRoute[];
}

export interface AuthRoute {
  // TODO: id 应该是number
  // id: number;
  id: string;
  name?: string;
  path: string;
  redirect?: string;
  params?: Record<string, string | number>;
  meta?: RouteMetaObject;
  children?: AuthRoute[];
}
