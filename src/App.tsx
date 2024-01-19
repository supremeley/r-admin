import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import Layout from '@layout/index';
import { RouterWithoutLayout } from '@router/index';
import { store } from '@store/index';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={enUS}>
        <RouterWithoutLayout>
          <Layout></Layout>
        </RouterWithoutLayout>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
