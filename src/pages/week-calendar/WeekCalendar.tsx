import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

import { useGetWeekCalendar } from "@/api/preventive-os/preventive-os-query"
import type { WeekCalendarData } from "@/api/preventive-os/preventive-os-types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "cn"
import { getISOWeek } from "date-fns"
import { useNavigate } from "react-router-dom"

type WeekStatus = WeekCalendarData['status']


function weekCellBackground(status: WeekStatus) {
  return cn(
    status === "completed" && "bg-primary/15 hover:bg-primary/25",
    status === "overdue" && "bg-warning/15 hover:bg-warning/30",
    status === "default" && "hover:bg-muted"
  )
}

function weekCellForeground(status: WeekStatus) {
  return cn(
    status === "completed" && "text-primary",
    status === "overdue" && "text-warning",

  )
}

function weekProgressColor(status: WeekStatus) {
  return cn(
    status === "overdue" &&
    "[&_[data-slot=progress-track]]:bg-warning/10 [&_[data-slot=progress-indicator]]:bg-warning"
  )
}

function isCurrentWeek(week: number, year: number) {
  const now = new Date()
  const currentWeek = getISOWeek(now)
  const currentYear = now.getFullYear()
  return currentWeek == week && currentYear == year
}

export function WeekCalendar() {
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear())

  const calendar = useGetWeekCalendar(year)

  function openWeek(week: number) {
    navigate('week-details', { state: { week, year } });
    console.log("Abrir semana: W" + week)
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">Calendário</h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Acompanhe as ordens de serviço da semana.
            </p>
            <Separator orientation="vertical" />
            <div className="flex flex-wrap items-center">
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-full bg-destructive" />
                Semana Atual
              </Badge>
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-sm border border-foreground/40 bg-background" />
                Em andamento
              </Badge>
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-sm border border-foreground/40 bg-warning/80" />
                Atrasada
              </Badge>
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-sm border border-foreground/40 bg-primary/80" />
                Concluída
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Ano anterior"
            className={"h-10 w-10"}
            onClick={() => setYear((current) => current - 1)}
          >
            <MinusIcon />
          </Button>
          <span className="border px-4 h-10 min-w-14 flex justify-center items-center font-heading text-lg font-semibold tabular-nums">
            {year}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Próximo ano"
            className={"h-10 w-10"}
            onClick={() => setYear((current) => current + 1)}
          >
            <PlusIcon />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-8 border-t border-l border-foreground/40">
        {calendar.data?.map((cell) => {
          return (
            <button
              key={cell.week}
              type="button"
              onClick={() => openWeek(cell.week)}
              className={cn(
                "flex h-24 cursor-pointer flex-col gap-1 border-r border-b border-foreground/40 p-2 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:outline-none",
                weekCellBackground(cell.status)
              )}
            >
              <div className="flex items-start justify-between">
                <span className={cn(
                  "relative flex justify-center items-center gap-2 text-md font-medium text-foreground",
                  isCurrentWeek(cell.week, year) && "text-destructive font-bold"
                )}>
                  W{cell.week}
                  {isCurrentWeek(cell.week, year) &&
                    <div className="bg-destructive w-2.5 h-2.5 rounded-full" ></div>
                  }
                </span>
                {cell.hasOrders && (
                  <span className={cn(
                    "font-heading text-sm font-semibold text-muted-foreground tabular-nums",
                    weekCellForeground(cell.status)
                  )}
                  >
                    {cell.completion}%
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground/70">
                {cell.start_of_week} à {cell.end_of_week}
              </span>

              {cell.hasOrders ? <>
                <span className="text-xs text-muted-foreground/70">
                  Realizado: {cell.executed}/{cell.total}
                </span>
                <Progress
                  className={cn("mt-auto", weekProgressColor(cell.status))}
                  value={cell.completion}
                />
              </> : (
                <span className="mt-auto text-xs text-muted-foreground/70">
                  Sem preventivas esta semana.
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
