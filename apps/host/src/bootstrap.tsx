import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { fetcher } from './libs/axios';
import { SWRConfig } from 'swr';
import AppRoute from './AppRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <SWRConfig value={{ fetcher }}>
        <AppRoute />
      </SWRConfig>
    </ChakraProvider>
  </Provider>
);
