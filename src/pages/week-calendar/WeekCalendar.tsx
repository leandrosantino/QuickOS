import {
  addDays,
  format,
  getISOWeek,
  getISOWeekYear,
  setISOWeek,
  startOfISOWeek,
} from "date-fns"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "cn"

type WeekCell = {
  week: number
  total: number
  executed: number
  pending: number
}

type WeekStatus = "completed" | "overdue" | "default"

const weeks: WeekCell[] = Array.from({ length: 52 }, (_, index) => {
  const total = index % 8 === 7 ? 0 : ((index * 7) % 13) + 1
  const executed = (index * 3) % (total + 1)

  return {
    week: index + 1,
    total,
    executed,
    pending: total - executed,
  }
})

function weekDateRange(week: number, year: number) {
  const start = startOfISOWeek(setISOWeek(new Date(year, 0, 4), week))
  const end = addDays(start, 6)

  return `${format(start, "dd/MM")} — ${format(end, "dd/MM")}`
}

function getWeekStatus(cell: WeekCell, year: number): WeekStatus {
  if (cell.total === 0) {
    return "default"
  }

  const completion = Math.round((cell.executed / cell.total) * 100)
  const now = new Date()
  const currentWeek = getISOWeek(now)
  const currentWeekYear = getISOWeekYear(now)
  const isPastWeek =
    year < currentWeekYear ||
    (year === currentWeekYear && cell.week < currentWeek)

  if (completion === 100) {
    return "completed"
  }

  if (isPastWeek && cell.executed < cell.total) {
    return "overdue"
  }

  return "default"
}

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

export function WeekCalendar() {
  const [year, setYear] = useState(new Date().getFullYear())

  function openWeek(week: number) {
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-sm border border-foreground/40 bg-primary/80" />
                Concluída
              </Badge>
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-sm border border-foreground/40 bg-warning/80" />
                Atrasada
              </Badge>
              <Badge variant="ghost" className="gap-1.5 bg-transparent">
                <span className="size-2.5 rounded-sm border border-foreground/40 bg-background" />
                Em andamento
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
        {weeks.map((cell) => {
          const hasOrders = cell.total > 0
          const completion = hasOrders
            ? Math.round((cell.executed / cell.total) * 100)
            : 0
          const status = getWeekStatus(cell, year)

          return (
            <button
              key={cell.week}
              type="button"
              onClick={() => openWeek(cell.week)}
              className={cn(
                "flex h-24 cursor-pointer flex-col gap-1 border-r border-b border-foreground/40 p-2 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:outline-none",
                weekCellBackground(status),
              )}
            >
              <div className="flex items-start justify-between">
                <span className="text-md font-medium text-foreground">
                  W{cell.week}
                </span>
                {hasOrders && (
                  <span className={cn(
                    "font-heading text-sm font-semibold text-muted-foreground tabular-nums",
                    weekCellForeground(status)
                  )}
                  >
                    {completion}%
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground/70">
                {weekDateRange(cell.week, year)}
              </span>
              {hasOrders ? (
                <Progress
                  className={cn("mt-auto", weekProgressColor(status))}
                  value={completion}
                />
              ) : (
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
