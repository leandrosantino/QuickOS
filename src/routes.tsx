import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './pages/layout'
import { Actions } from './pages/actions/Actions'
import { Machines } from './pages/machines/Machines'
import { Workers } from './pages/workers/Workers'
import { WeekCalendar } from './pages/week-calendar/WeekCalendar'

export function AppRouter() {
  return (
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
  )
}
