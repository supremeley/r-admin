import type { PageItem } from '@/layout/interface';

export const page: PageItem[] = [
  // {
  //   title: '首页',
  //   name: 'home',
  //   path: '/home',
  //   icon: 'r-logos-vue',
  // },
  {
    title: '用户',
    name: 'user',
    hasChildren: true,
    path: '/user',
    icon: 'r-ph-anchor-simple-thin',
    children: [{ title: '用户列表', name: 'userList', path: '/user/list', icon: 'r-ph-anchor-simple-thin' }],
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
        path: '/evaluation/list',
        icon: 'r-ph-anchor-simple-thin',
      },
    ],
  },
  {
    title: '管理员',
    name: 'manager',
    hasChildren: true,
    path: '/manager',
    icon: 'r-ph-anchor-simple-thin',
    children: [
      {
        title: '管理员列表',
        name: 'managerList',
        path: '/manager/list',
        icon: 'r-ph-anchor-simple-thin',
      },
    ],
  },
];
