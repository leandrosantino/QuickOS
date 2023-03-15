import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';

import { Routes } from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { api } from './utils/trpc';

//sdhth
function App({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [apiClient] = useState(() =>
    api.createClient({ //sss
      links: [
        httpBatchLink({
          url: 'http://localhost:9999/trpc',
        }),
      ],
    }),
  );
  return (
    <api.Provider client={apiClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode >
    <App>
      <div className="w-screen h-screen bg-gray-200" >
        <Routes />
      </div>
    </App>
  </React.StrictMode>
);

