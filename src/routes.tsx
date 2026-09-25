import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Actions } from './pages/actions/Actions'
import { AppLayout } from './pages/layout'
import { Machines } from './pages/machines/Machines'
import { ServiceOrderForm } from './pages/service-order/ServiceOrderForm'
import { WeekCalendar } from './pages/week-calendar/WeekCalendar'
import { WeekDetails } from './pages/week-calendar/WeekDetails'
import { Workers } from './pages/workers/Workers'

export function AppRouter() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Routes>
          <Route element={<AppLayout />} >
            <Route path="/" element={<Navigate to="/week-calendar" replace />} />
            <Route path="/week-calendar">
              <Route index element={<WeekCalendar />} />
              <Route path="week-details">
                <Route index element={<WeekDetails />} />
                <Route path="service-order/:id" element={<ServiceOrderForm />} />
              </Route>
            </Route>
            <Route path="/acoes" element={<Actions />} />
            <Route path="/maquinas" element={<Machines />} />
            <Route path="/manutencistas" element={<Workers />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}
