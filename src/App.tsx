import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import Layout from '@layout/index';
import { RouterWithoutLayout } from '@router/index';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from '@/store/index';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <RouterWithoutLayout>
            <Layout></Layout>
          </RouterWithoutLayout>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
