import { useLocation } from "react-router-dom";

import { BackToCalendarButton } from "./BackToCalendarButton";

export function WeekDetails() {
const location = useLocation();
  // Acessa o objeto enviado via state
  const week = location.state?.week as number
  const year = location.state?.year as number
  
  return (
    <div className="flex flex-col gap-4 p-6">
      <BackToCalendarButton />
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">
            W{week} - Preventivas Planejadas
        </h1>
        <p className="text-sm text-muted-foreground">
            Gerencie as ordens de serviço preventivas para a semana {week}  de {year}.
        </p>
      </header>
    </div>
  )
}
