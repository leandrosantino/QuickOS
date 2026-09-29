import { NavLink, Outlet } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const tabs = [
  { to: "/week-calendar", label: "Calendário Semanal" },
  { to: "/acoes", label: "Plano de Preventivas" },
  { to: "/maquinas", label: "Máquinas" },
  { to: "/manutencistas", label: "Manutencistas" },
]

export function AppLayout() {
  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      <header className="flex items-center gap-4 border-b px-4 py-2">
        <span className="font-heading text-lg font-semibold text-blue-900">
          Adler Pelzer Group
        </span>
        <Separator orientation="vertical" />
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  }),
                  isActive && "bg-blue-500/30 hover:bg-blue-500/20"
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
