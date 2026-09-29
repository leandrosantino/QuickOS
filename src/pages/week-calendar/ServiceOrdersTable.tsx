import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react"
import { useMemo } from "react"

import type { ServiceOrderType } from "@/api/preventive-os/preventive-os-types"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"

export type ServiceOrderSortKey =
  | "id"
  | "nature"
  | "machine"
  | "concluded"
  | "date"
  | "responsible"
  | "duration"

export type SortDirection = "asc" | "desc"

export type ServiceOrderSort = {
  key: ServiceOrderSortKey
  direction: SortDirection
}

export const DEFAULT_SERVICE_ORDER_SORT: ServiceOrderSort = {
  key: "id",
  direction: "desc",
}

const COLUMNS: { key: ServiceOrderSortKey; label: string }[] = [
  { key: "id", label: "Nº" },
  { key: "nature", label: "Tipo" },
  { key: "machine", label: "Máquina" },
  { key: "concluded", label: "Status" },
  { key: "date", label: "Data" },
  { key: "responsible", label: "Responsável" },
  { key: "duration", label: "Duração" },
]

export function getServiceOrderSortValue(
  order: ServiceOrderType,
  key: ServiceOrderSortKey,
): string | number | boolean | null {
  switch (key) {
    case "id":
      return order.id ?? null
    case "nature":
      return order.nature?.name ?? null
    case "machine":
      return order.machine?.tag ?? null
    case "concluded":
      return order.concluded ?? null
    case "date":
      return order.date ?? null
    case "responsible":
      return order.responsible?.[0]?.name ?? null
    case "duration":
      return order.duration ?? null
  }
}

function formatDate(value?: string | null) {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "—" : format(date, "dd/MM/yyyy")
}

type ServiceOrdersTableProps = {
  orders: ServiceOrderType[]
  isLoading: boolean
  sort: ServiceOrderSort
  selectedIds: Set<number>
  onSelectedIdsChange: (selectedIds: Set<number>) => void
  onSortChange: (key: ServiceOrderSortKey) => void
  onRowClick: (order: ServiceOrderType) => void
}

export function ServiceOrdersTable({
  orders,
  isLoading,
  sort,
  selectedIds,
  onSelectedIdsChange,
  onSortChange,
  onRowClick,
}: ServiceOrdersTableProps) {
  const selectableIds = useMemo(
    () => orders.map((order) => order.id).filter((id): id is number => id != null),
    [orders],
  )

  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.has(id))
  const someSelected = selectableIds.some((id) => selectedIds.has(id))

  function toggleRow(id: number | undefined, checked: boolean) {
    if (id == null) return
    const next = new Set(selectedIds)
    if (checked) next.add(id)
    else next.delete(id)
    onSelectedIdsChange(next)
  }

  function toggleAll(checked: boolean) {
    onSelectedIdsChange(checked ? new Set(selectableIds) : new Set())
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-10 w-10 px-3">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                onCheckedChange={toggleAll}
                aria-label="Selecionar todas as ordens"
              />
            </TableHead>
            {COLUMNS.map((column) => {
              const active = sort.key === column.key
              return (
                <TableHead key={column.key} className="h-10 px-3 text-xs">
                  <button
                    type="button"
                    onClick={() => onSortChange(column.key)}
                    className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-foreground"
                  >
                    {column.label}
                    {active ? (
                      sort.direction === "asc" ? (
                        <ArrowUpIcon className="size-3.5" />
                      ) : (
                        <ArrowDownIcon className="size-3.5" />
                      )
                    ) : (
                      <ArrowUpDownIcon className="size-3.5 text-muted-foreground/50" />
                    )}
                  </button>
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={COLUMNS.length + 1}
                className="h-24 text-center text-muted-foreground"
              >
                Carregando ordens de serviço...
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={COLUMNS.length + 1}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhuma ordem de serviço encontrada para os filtros selecionados.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
              const concluded = Boolean(order.concluded)
              return (
                <TableRow
                  key={order.id ?? order.actionsUniqueKey}
                  onClick={() => onRowClick(order)}
                  className="cursor-pointer border-b border-border/50 even:bg-muted/60 hover:bg-muted"
                >
                  <TableCell className="px-3 py-2" onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      checked={order.id != null && selectedIds.has(order.id)}
                      onCheckedChange={(checked) => toggleRow(order.id, checked)}
                      aria-label={`Selecionar OS ${order.id ?? ""}`}
                    />
                  </TableCell>
                  <TableCell className="px-3 py-2 font-medium tabular-nums">
                    {order.id ?? "—"}
                  </TableCell>
                  <TableCell className="px-3 py-2">{order.nature?.name ?? "—"}</TableCell>
                  <TableCell className="px-3 py-2">{order.machine?.tag ?? "—"}</TableCell>
                  <TableCell className="px-3 py-2">
                    <Badge
                      className={cn(
                        "border-transparent",
                        concluded ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning",
                      )}
                    >
                      {concluded ? "Realizado" : "Pendente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-2 tabular-nums">
                    {concluded ? formatDate(order.date) : "—"}
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    {concluded ? (order.responsible?.[0]?.name ?? "—") : "—"}
                  </TableCell>
                  <TableCell className="px-3 py-2 tabular-nums">
                    {concluded && order.duration != null ? `${order.duration} min` : "—"}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
