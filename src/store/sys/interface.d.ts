export interface MenuItem {
  title: string;
  name: string;
  path?: string;
  icon?: string;
  hidden?: boolean;
  children?: MenuItem[];
}

export interface SySState {
  menu: MenuItem[] | [];
  routes: RouteWithMetaObject[] | [];
  history: RouteWithMetaObject[];
}
