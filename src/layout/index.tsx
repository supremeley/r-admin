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
      <Header className='layout-header'>
        <LayoutHeader></LayoutHeader>
      </Header>
      <ArcoLayout>
        <Sider width={240} collapsed={collapse} className='layout-aside'>
          <LayoutMenu collapse={collapse} onSwitchCollapse={switchCollapse}></LayoutMenu>
        </Sider>
        <Content className='layout-content'>
          <LayoutContent></LayoutContent>
          <Footer className='layout-footer'>
            <section className='footer'>Footer</section>
          </Footer>
        </Content>
      </ArcoLayout>
    </ArcoLayout>
  );
};

export default Layout;
