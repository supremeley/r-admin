import './index.scss';

import { Avatar, Dropdown, Menu, Switch } from '@arco-design/web-react';
import { useSelector } from 'react-redux';

// import { saveToken, saveUserinfo } from '@/store/auth';
// import { useLogin } from '@/hooks/useAuth';
import type { RootState } from '@/store';

const dropList = (
  <Menu>
    <Menu.Item key='1'>用户信息</Menu.Item>
    <Menu.Item key='2'>退出登录</Menu.Item>
  </Menu>
);

const LayoutHeader = () => {
  const auth = useSelector((state: RootState) => state.auth);
  // console.log(auth);
  // const login = () => {
  // const [result] = useLogin({ username: '大哥', password: '123' });
  // };

  return (
    <section className='header p-4 pr-12'>
      <Switch className='mr-4' />
      <Dropdown droplist={dropList} position='bl'>
        <Avatar className='hover' size={32}>
          <div className='r-logos-vue text-3xl'></div>
        </Avatar>
        <span className='ml-2 text-xl'>{auth?.userinfo?.username}</span>
      </Dropdown>
    </section>
  );
};

export default LayoutHeader;
