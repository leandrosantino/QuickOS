import { useMemo } from "react"

import type { ServiceOrderType } from "@/api/preventive-os/preventive-os-types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ActionRow = {
  id: number | string
  description: string
  excution: string
  nextExecution: string
}

type ServiceOrderActionsTableProps = {
  order: ServiceOrderType
}

export function ServiceOrderActionsTable({ order }: ServiceOrderActionsTableProps) {
  const actions = useMemo<ActionRow[]>(() => {
    // OS já executada: as ações vêm dos registros de execução.

    if (order.concluded) {
      return (order.actionsTaken ?? []).map((taken) => ({
        id: taken.action.id ?? taken.actionId,
        description: taken.action.description,
        excution: taken.action.excution,
        nextExecution: order.actions?.find((iten) =>
          iten.id == taken.actionId
        )?.nextExecution || ""
      }))
    }

    // OS pendente: as ações são as planejadas.
    return (order.actions ?? []).map((action) => ({
      id: action.id ?? "—",
      description: action.description,
      excution: action.excution,
      nextExecution: action.nextExecution
    }))
  }, [order])

  return (
    <div className="max-h-[40vh] overflow-y-auto rounded-2xl border border-border/60">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-10 w-24 px-3 text-xs">Nº</TableHead>
            <TableHead className="h-10 px-3 text-xs">Descrição</TableHead>
            <TableHead className="h-10 px-3 text-xs">Execução</TableHead>
            {order.concluded && <TableHead className="h-10 px-3 text-xs">Proxima Execução</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={3}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhuma ação registrada para esta ordem de serviço.
              </TableCell>
            </TableRow>
          ) : (
            actions.map((action, index) => (
              <TableRow
                key={`${action.id}-${index}`}
                className="border-b border-border/50 even:bg-muted/60 hover:bg-transparent"
              >
                <TableCell className="px-3 py-2 align-top font-medium tabular-nums">
                  {action.id}
                </TableCell>
                <TableCell className="whitespace-pre-wrap break-words px-3 py-2 align-top">
                  {action.description}
                </TableCell>
                <TableCell className="whitespace-pre-wrap break-words px-3 py-2 align-top">
                  {action.excution}
                </TableCell>
                {order.concluded && <TableCell className="px-3 py-2 align-top">
                  {action.nextExecution}
                </TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
