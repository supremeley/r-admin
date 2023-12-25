import './App.scss';

import { ConfigProvider } from '@arco-design/web-react'; // import { BrowserRouter as Router } from 'react-router-dom';
import enUS from '@arco-design/web-react/es/locale/en-US';
import Layout from '@layout/index';
import { RouterWithoutLayout } from '@router/index';
import { store } from '@store/index';
import { Suspense } from 'react';
import { Provider } from 'react-redux';

function App() {
  // const t = store.getState();

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
