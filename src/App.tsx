import './App.scss';

import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import Layout from '@layout/index';
import { RouterWithoutLayout } from '@router/index';
import { store } from '@store/index';
import { Suspense } from 'react';
import { Provider } from 'react-redux';

function App() {
  // const t: ImportMetaEnv = {
  //   VITE_APP_TITLE: '123',
  //   VITE_APP_PORT: 123,
  //   VITE_APP_OPEN_BROWSER: '123',
  // };
  // const t = store.getState('123');

  return (
    <Provider store={store}>
      <ConfigProvider locale={enUS}>
        <Suspense fallback={<p>loading...</p>}>
          <RouterWithoutLayout>
            <Layout></Layout>
          </RouterWithoutLayout>
        </Suspense>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
