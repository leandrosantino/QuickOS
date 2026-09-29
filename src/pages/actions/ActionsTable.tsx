import type { ActionsInfoTypeWithActonsTaken } from "@/api/preventive-action/preventive-action-types"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"

const COLUMNS = [
  { key: "machine", label: "Máquina" },
  { key: "nature", label: "Tipo" },
  { key: "description", label: "Descrição" },
  { key: "excution", label: "Execução" },
  { key: "frequency", label: "Periodicidade" },
  { key: "nextExecution", label: "Próxima execução" },
] as const

type ActionsTableProps = {
  actions: ActionsInfoTypeWithActonsTaken[]
  isLoading: boolean
  onRowClick?: (action: ActionsInfoTypeWithActonsTaken) => void
}

export function ActionsTable({ actions, isLoading, onRowClick }: ActionsTableProps) {
  return (
    <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {COLUMNS.map((column) => (
              <TableHead key={column.key} className="h-10 px-3 text-xs">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={COLUMNS.length}
                className="h-24 text-center text-muted-foreground"
              >
                Carregando ações preventivas...
              </TableCell>
            </TableRow>
          ) : actions.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={COLUMNS.length}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhuma ação preventiva encontrada para os filtros selecionados.
              </TableCell>
            </TableRow>
          ) : (
            actions.map((action) => (
              <TableRow
                key={action.id}
                onClick={() => onRowClick?.(action)}
                className={cn(
                  "cursor-pointer border-b border-border/50 even:bg-muted/60 hover:bg-muted",
                  action.ignore && "text-muted-foreground",
                )}
              >
                <TableCell className="px-3 py-2 font-medium">
                  {action.machine?.tag ?? "—"}
                </TableCell>
                <TableCell className="px-3 py-2">
                  <Badge variant="secondary">{action.nature?.name ?? "—"}</Badge>
                </TableCell>
                <TableCell className="max-w-80 truncate px-3 py-2">
                  {action.description}
                </TableCell>
                <TableCell className="max-w-60 truncate px-3 py-2">{action.excution}</TableCell>
                <TableCell className="px-3 py-2 tabular-nums">
                  {action.frequency} {action.frequency === 1 ? "semana" : "semanas"}
                </TableCell>
                <TableCell className="px-3 py-2 tabular-nums">{action.nextExecution}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
