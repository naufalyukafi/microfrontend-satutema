import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { fetcher } from './libs/axios';
import { SWRConfig } from 'swr';
import Website from './pages/website';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider>
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <Website />
      </BrowserRouter>
    </SWRConfig>
  </ChakraProvider>
);
