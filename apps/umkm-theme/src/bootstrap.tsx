import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { fetcher } from './libs/axios';
import { SWRConfig } from 'swr';
import Pages from './pages';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider>
    <SWRConfig value={{ fetcher }}>
      <Pages />
    </SWRConfig>
  </ChakraProvider>
);
