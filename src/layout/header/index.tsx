import './index.scss';

import { Avatar, Dropdown, Menu, Switch } from '@arco-design/web-react';

const dropList = (
  <Menu>
    <Menu.Item key='1'>Beijing</Menu.Item>
    <Menu.Item key='2'>Shanghai</Menu.Item>
    <Menu.Item key='3'>Guangzhou</Menu.Item>
  </Menu>
);

const LayoutHeader = () => {
  //   const [textA, setText] = useState('test');

  return (
    <section className='header box-border flex flex-justify-end flex-items-center bg-brand-primary p-3'>
      <Switch className='mr-3' />
      <Dropdown droplist={dropList} position='bl'>
        <Avatar className='hover'>
          <div className='r-logos-vue text-3xl'></div>
        </Avatar>
      </Dropdown>
    </section>
  );
};

export default LayoutHeader;
