import qs from 'qs';

import type { AuthRoute } from '@/api/sys/interface';
import type { MenuItem } from '@/store/sys/interface';

export const transfrom2Menu = (routes: AuthRoute[], path = ''): MenuItem[] => {
  if (!routes?.length) return [];

  return routes.reduce((list, route) => {
    if (route.meta?.hidden) return list;

    let url = path + '/' + route.path;

    if (route.params) {
      url = url + '?' + qs.stringify(route.params);
    }

    const menuItem: MenuItem = {
      path: url,
      name: route.name ?? route.id,
      title: route.meta?.title ?? route.name ?? route.id,
      icon: route.meta?.icon,
    };

    if (route.children?.length) {
      const children = transfrom2Menu(route.children, url);
      menuItem.children = children;
    }

    list.push(menuItem);

    return list;
  }, [] as MenuItem[]);
};
