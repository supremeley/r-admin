import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { RouterWithLayout } from '@/router/index';
import { store } from '@/store/index';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <RouterWithLayout></RouterWithLayout>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
