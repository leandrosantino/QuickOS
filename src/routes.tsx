import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Actions } from './pages/actions/Actions'
import { AppLayout } from './pages/layout'
import { Machines } from './pages/machines/Machines'
import { WeekCalendar } from './pages/week-calendar/WeekCalendar'
import { Workers } from './pages/workers/Workers'

export function AppRouter() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Routes>
          <Route element={<AppLayout />} >
            <Route path="/" element={<WeekCalendar />} />
            <Route path="/acoes" element={<Actions />} />
            <Route path="/maquinas" element={<Machines />} />
            <Route path="/manutencistas" element={<Workers />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}
