import './index.scss';

import { Layout as ArcoLayout } from '@arco-design/web-react';

import LayoutContent from './content';
import LayoutHeader from './header';
import LayoutMenu from './menu';

const { Sider, Header, Footer, Content } = ArcoLayout;

const Layout = () => {
  return (
    <ArcoLayout>
      <Sider>
        <LayoutMenu></LayoutMenu>
      </Sider>
      <ArcoLayout>
        <Header>
          <LayoutHeader></LayoutHeader>
        </Header>
        <Content>
          <LayoutContent></LayoutContent>
        </Content>
        <Footer>
          <div className='p-0'>Footer</div>
        </Footer>
      </ArcoLayout>
    </ArcoLayout>
  );
};

export default Layout;
