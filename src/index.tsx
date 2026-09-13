import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';

import { Routes } from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YearContextProvider } from './contexts/yearContext';

function App({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode >
    <App>
      <YearContextProvider>
        <div className="w-screen h-screen" >
          <Routes />
        </div>
      </YearContextProvider>
    </App>
  </React.StrictMode>
);

