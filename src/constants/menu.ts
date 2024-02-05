import type { PageItem } from '@/layout/interface';

export const page: PageItem[] = [
  {
    title: '首页',
    name: 'home',
    hasChildren: false,
    path: '/home',
    icon: 'r-logos-vue',
  },
  // {
  //   title: '登录',
  //   hasChildren: false,
  //   path: '/login',
  //   icon: 'r-ph-anchor-simple-thin',
  // },
  {
    title: '用户',
    name: 'user',
    hasChildren: true,
    path: '/user',
    icon: 'r-ph-anchor-simple-thin',
    children: [
      { title: '用户列表', name: 'userList', hasChildren: false, path: '/user/list', icon: 'r-ph-anchor-simple-thin' },
    ],
  },
  {
    title: '评测',
    name: 'evaluation',
    hasChildren: true,
    path: '/evaluation',
    icon: 'r-ph-anchor-simple-thin',
    children: [
      {
        title: '评测列表',
        name: 'evaluationList',
        hasChildren: false,
        path: '/evaluation/list',
        icon: 'r-ph-anchor-simple-thin',
      },
    ],
  },
];
