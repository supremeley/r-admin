export interface Menu {
  name: string;
  title: string;
  path: string;
}

export interface SySState {
  menu: Menu[] | [];
  history: Menu[] | [];
  routes: RouteWithMetaObject[] | [];
}
