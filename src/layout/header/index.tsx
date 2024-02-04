import './index.scss';

import { Avatar, Dropdown, Menu, Switch } from '@arco-design/web-react';
import { useSelector } from 'react-redux';

// import { saveToken, saveUserinfo } from '@/store/auth';
// import { useLogin } from '@/hooks/useAuth';
import type { RootState } from '@/store';

const dropList = (
  <Menu>
    <Menu.Item key='1'>Beijing</Menu.Item>
    <Menu.Item key='2'>Shanghai</Menu.Item>
    <Menu.Item key='3'>Guangzhou</Menu.Item>
  </Menu>
);

const LayoutHeader = () => {
  const auth = useSelector((state: RootState) => state.auth);
  // console.log(auth);
  // const login = () => {
  // const [result] = useLogin({ username: '大哥', password: '123' });
  // };

  return (
    <section className='header box-border flex flex-justify-end flex-items-center bg-brand-primary p-3'>
      <Switch className='mr-3' />
      <Dropdown droplist={dropList} position='bl'>
        <Avatar className='hover'>
          <div className='r-logos-vue text-3xl'></div>
        </Avatar>
        {auth?.userinfo?.username}
      </Dropdown>
      {/* <Button onClick={login}></Button> */}
    </section>
  );
};

export default LayoutHeader;
