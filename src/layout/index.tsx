import './index.scss';

import { Layout as ArcoLayout } from '@arco-design/web-react';

import LayoutContent from './content';
import LayoutHeader from './header';
import LayoutMenu from './menu';

const { Sider, Header, Footer, Content } = ArcoLayout;

const Layout = () => {
  const [collapse, setCollapse] = useState(false);

  const switchCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <ArcoLayout className='layout'>
      <ArcoLayout>
        <Sider width={280} collapsed={collapse} className='layout-aside'>
          <LayoutMenu collapse={collapse} onSwitchCollapse={switchCollapse}></LayoutMenu>
        </Sider>
        <ArcoLayout>
          <Header className='layout-header'>
            <LayoutHeader></LayoutHeader>
          </Header>
          <Content className='layout-montent'>
            <LayoutContent></LayoutContent>
          </Content>
        </ArcoLayout>
      </ArcoLayout>
      <Footer className='layout-footer'>
        <section className='footer'>Footer</section>
      </Footer>
    </ArcoLayout>
  );
};

export default Layout;
