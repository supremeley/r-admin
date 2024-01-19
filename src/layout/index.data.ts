export const page: PageItem[] = [
  {
    title: 'home',
    hasChildren: false,
    path: '/home',
    icon: 'r-logos-vue',
  },
  {
    title: 'login',
    hasChildren: false,
    path: '/login',
    icon: 'r-ph-anchor-simple-thin',
  },
  {
    title: 'login1',
    hasChildren: true,
    icon: 'r-ph-anchor-simple-thin',
    path: '/login-1',
    children: [
      {
        title: 'home2',
        hasChildren: true,
        path: '/home-2',
        icon: 'r-ph-anchor-simple-thin',
        children: [
          {
            title: 'login3',
            hasChildren: true,
            icon: 'r-ph-anchor-simple-thin',
            path: '/login-3',
            children: [
              {
                title: 'home4',
                hasChildren: false,
                path: '/home-4',
                icon: 'r-ph-anchor-simple-thin',
              },
              {
                title: 'login4',
                hasChildren: false,
                path: '/login-4',
                icon: 'r-ph-anchor-simple-thin',
              },
            ],
          },
        ],
      },
      {
        title: 'login2',
        hasChildren: false,
        path: '/login-2',
        icon: 'r-ph-anchor-simple-thin',
      },
    ],
  },
];

export interface PageItem {
  title: string;
  path?: string;
  hasChildren?: boolean;
  icon?: string;
  children?: PageItem[];
}
