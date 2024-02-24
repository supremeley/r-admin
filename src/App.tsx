import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { RouterWithLayout } from '@/router/index';
import { store } from '@/store';
import { injectStore } from '@/utils/http';

injectStore(store);

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <RouterWithLayout></RouterWithLayout>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
