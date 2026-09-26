import '@/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/toast'
import { AppRouter } from './routes'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
    <Toaster />
  </StrictMode>,
)
