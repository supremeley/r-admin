import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import Layout from '@layout/index';
import { RouterWithoutLayout } from '@router/index';
import { store } from '@store/index';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterWithoutLayout>
          <Layout></Layout>
        </RouterWithoutLayout>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
