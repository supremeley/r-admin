import './index.scss';

import { Avatar, Dropdown, Menu, Switch } from '@arco-design/web-react';

import { useAppSelector, useAuth } from '@/hooks';

const LayoutHeader = () => {
  const [{ logout: authLogout }] = useAuth();

  const auth = useAppSelector((state) => state.auth);

  const { userinfo } = auth;

  const dropList = (
    <Menu>
      <Menu.Item key='1'>个人中心</Menu.Item>
      <Menu.Item key='2' onClick={authLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <section className='header p-4 pr-12'>
      <Switch className='mr-4' />
      <Dropdown droplist={dropList} position='bl'>
        <div className='flex items-center cursor-pointer'>
          <Avatar size={40}>
            <img src={userinfo?.avatar} />
          </Avatar>
          <span className='ml-2 text-xl'>{userinfo?.username}</span>
        </div>
      </Dropdown>
    </section>
  );
};

export default LayoutHeader;
