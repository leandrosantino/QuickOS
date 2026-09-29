import { Toaster } from '@/components/ui/toast'
import '@/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './routes'

function Main(){
  const [queryClient] = useState(() => new QueryClient());
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Main/>)
