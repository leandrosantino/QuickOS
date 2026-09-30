import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Actions } from './pages/actions/Actions'
import { ActionsForm } from './pages/actions-form/ActionsForm'
import { AppLayout } from './pages/layout'
import { Machines } from './pages/machines/Machines'
import { ServiceOrderForm } from './pages/service-order/ServiceOrderForm'
import { WeekCalendar } from './pages/week-calendar/WeekCalendar'
import { WeekDetails } from './pages/week-calendar/WeekDetails'
import { Workers } from './pages/workers/Workers'

export function AppRouter() {
  return (
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
          <Route path="/acoes">
            <Route index element={<Actions />} />
            <Route path="form" element={<ActionsForm />} />
            <Route path="form/:id" element={<ActionsForm />} />
          </Route>
          <Route path="/maquinas" element={<Machines />} />
          <Route path="/manutencistas" element={<Workers />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
