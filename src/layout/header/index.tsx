import './index.scss';

import { Avatar, Dropdown, Menu, Switch } from '@arco-design/web-react';
import { useSelector } from 'react-redux';

// import { saveToken, saveUserinfo } from '@/store/auth';
// import { useLogin } from '@/hooks/useAuth';
import type { RootState } from '@/store';

const dropList = (
  <Menu>
    <Menu.Item key='1'>个人中心</Menu.Item>
    <Menu.Item key='2'>退出登录</Menu.Item>
  </Menu>
);

const LayoutHeader = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { userinfo } = auth;

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
